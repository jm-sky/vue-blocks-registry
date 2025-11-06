### Setup --all: analiza i plan implementacji

#### Cel
- Zapewnienie komendy jednego kroku: `vue-blocks-registry setup <project> --all`, która po utworzeniu projektu automatycznie:
  - wykonuje scaffolding plików bazowych,
  - instaluje pełny moduł uwierzytelniania (`authFull`),
  - dokłada routing stron (landing, auth, dashboard, profil, ustawienia, logi),
  - konfiguruje route-guardy oraz podstawowe layouty (Authenticated Layout z menu bocznym),
  - generuje gotowy do startu szkielet aplikacji z minimalnym nakładem ręcznych kroków.

#### Kontekst obecny
- Komenda `setup` już obsługuje flagę `--scaffold` i uruchamia `scaffold --all --overwrite --yes` w nowym projekcie:

```1:21:cli/src/commands/setup.ts
export const setup = new Command()
  .name('setup')
  .description('Create a new Vue 3 project with shadcn-vue and vue-blocks-registry')
  .argument('[project-name]', 'Name of the project directory')
  .option('-y, --yes', 'Use default configuration', false)
  .option('-s, --scaffold', 'Run scaffold after setup to generate foundational files', false)
```

```233:248:cli/src/commands/setup.ts
// Step 7: Run scaffold if requested
if (options.scaffold) {
  logger.break()
  logger.info('Running scaffold to generate foundational files...\n')
  try {
    const packageManager = detectPackageManager(projectPath)
    await executeDlx(
      packageManager,
      'vue-blocks-registry',
      ['scaffold', '--all', '--overwrite', '--yes'],
      { cwd: projectPath, stdio: 'inherit' }
    )
  } catch { /* ... */ }
}
```

- Komenda `scaffold` generuje m.in. `router/index.ts`, `router/routes.ts`, `App.vue`, `main.ts` i HomePage:

```68:78:cli/src/commands/scaffold.ts
{ name: 'router/index.ts', /* ... */ targetPath: 'src/router/index.ts' },
{ name: 'router/routes.ts', /* ... */ targetPath: 'src/router/routes.ts' },
{ name: 'pages/HomePage.vue', /* ... */ targetPath: 'src/pages/HomePage.vue' },
```

- Komenda `add` instaluje komponenty/bundles z rejestru, w tym `authFull`:

```15:26:cli/src/commands/add.ts
export const add = new Command()
  .name('add')
  .description('Add a component, feature, or bundle to your project')
  .argument('[components...]', 'Name of the components to add')
  /* ... */
  .addHelpText('after', `\nExamples:\n  $ pnpm dlx vue-blocks-registry add button\n  $ pnpm dlx vue-blocks-registry add button input form\n  $ pnpm dlx vue-blocks-registry add --yes --overwrite authFull\n  $ pnpm dlx vue-blocks-registry add dark-mode layouts`)
```

#### Zakres funkcjonalny `--all`
1. Projekt + scaffolding (jak dla `--scaffold`).
2. Dołożenie bundla `authFull` (strony logowania/rejestracji/resetu itp. + store/serwisy).
3. Rozszerzenie `src/router/routes.ts` o import i rozlanie `...authRoutes` z modułu auth.
4. Dodanie stron aplikacji (z podziałem na moduły):
   - Landing page (już zapewniany przez `HomePage.vue` — ewentualnie rename/alias),
   - Dashboard (dla zalogowanych) w `AuthenticatedLayout` z sidebar menu,
   - Moduł `user`: profile view, profile edit (dane użytkownika, avatar itp.),
   - Moduł `settings`: settings page (preferencje UI, konto itp.),
   - Moduł `auth` (część `authFull`): change password page,
   - Moduł `logs` (lub `audit`): logs browser (tabela danych do przeglądania logów z API).
5. Route-guardy: guest-only i auth-only, wpięte w router guards lub per-route meta.

#### Zmiany w CLI
- `setup` (rozszerzenie opcji):
  - `--auth-full`: po setup uruchomi `add authFull` (z `--yes --overwrite`).
  - `--all`: skrót łączący `--scaffold`, `--auth-full` i „bootstrap aplikacji” (routing, layouty, dashboard, profile, settings, logs, guards).
  - Wsparcie `--pm <npm|pnpm|yarn>` (opcjonalne nadpisanie autodetekcji) — nice-to-have.

- Implementacja `--all` w `setup` (kolejność):
  1) create vue + tailwind + i18n (obecnie istnieje),
  2) scaffold `--all --overwrite --yes`,
  3) init `components.json` jeśli brak (`init --yes`),
  4) `add authFull --yes --overwrite` (z obsługą zależności),
  5) `add layouts` jeśli potrzebne do AuthenticatedLayout (lub dedykowany bundle `layoutAuthenticated`),
  6) wygenerowanie plików dodatkowych (dashboard, profile, settings, logs),
  7) modyfikacja `src/router/routes.ts` (dołożenie `...authRoutes` oraz tras aplikacyjnych),
  8) dodanie guardów (helpery + meta + global beforeEach),
  9) format/lint.

#### Wymagane elementy rejestru (nowe/ew. istniejące)
- `registry/modules/auth` (już jest dla `authFull`).
- Nowe (propozycja):
  - `registry/layouts/AuthenticatedLayout.vue` (+ Sidebar, AppHeader, Menu items),
  - `registry/layouts/AuthenticatedLayout.vue` (+ Sidebar, AppHeader, Menu items),
  - `registry/app/pages/DashboardPage.vue`,
  - `registry/modules/user/` (pages: `ProfileViewPage.vue`, `ProfileEditPage.vue`; services/types/validation wg standardu modułów),
  - `registry/modules/settings/` (page: `SettingsPage.vue`; feature + page),
  - `registry/modules/logs-management/` (page: `LogsBrowserPage.vue`, component: `LogsTable.vue`, `logsService.ts` z paginacją/filtrami/sortowaniem),
  - `registry/shared/router/guards.ts` (composables: `useRequireAuth`, `useRequireGuest` lub global guard setup),
  - `registry/shared/router/routes-helpers.ts` (opcjonalnie: ułatwia łączenie tras modułów).

Każdy element powinien używać importów `@registry/*` zgodnie z zasadami z `CLAUDE.md` i mieć minimalne zależności. Bundle’y powinny definiować `registryDependencies` (np. `authFull` → `layouts` jeśli używa wspólnych layoutów).

#### Routing: plan
- `src/router/routes.ts` (generowany przez scaffold) rozszerzamy o:
  - import `authRoutes` z modułu `auth`,
  - import `userRoutes` z modułu `user`,
  - import `settingsRoutes` z modułu `settings`,
  - import `logsRoutes` z modułu `logs`,
  - trasę landing: `/` → `HomePage` (lub LandingPage, jeśli dodamy dedykowaną stronę),
  - trasę `dashboard` (meta: `requiresAuth: true`, layout: `AuthenticatedLayout`).

Schemat (przykładowo):
```
const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { requiresGuest: false } },
  ...authRoutes,        // login/register/reset/change-password
  ...userRoutes,        // profile, profile/edit
  ...settingsRoutes,    // settings
  ...logsRoutes,        // logs
  {
    path: '/',
    component: AuthenticatedLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'dashboard', component: DashboardPage },
    ],
  },
]
```

#### Route-guardy
- Dodajemy composables/guards:
  - `requiresAuth` (jeśli brak usera → redirect do loginu z `redirectTo`),
  - `requiresGuest` (jeśli zalogowany → redirect do `/dashboard`).
- Integracja: globalny `router.beforeEach` w `router/index.ts` lub per-route `beforeEnter`. Preferowane meta + jeden global guard, który respektuje `meta.requiresAuth` / `meta.requiresGuest`.
- Guardy powinny używać `auth` store/serwisów z `authFull`.

#### Strony i layouty
- AuthenticatedLayout: podstawowy layout z topbar + sidebar menu (Dashboard, Profile, Settings, Logs, Logout).
- Dashboard: prosty ekran powitalny (karty/statystyki placeholdery).
- Profile: widok profilu i edycja (formularz; walidacja Zod/VeeValidate jeśli w zasięgu bundla, inaczej prostsza wersja; zapis do API lub mock service).
- Settings: moduł z 1-2 ustawieniami (np. preferencje UI), zapis do localStorage lub API hook.
- Logs browser: tabela (paginacja, sortowanie, filtr tekstowy, data range — minimum: paginacja + filtr tekstowy) z klientem API (Axios) i `@tanstack/vue-query`.

#### Zmiany w scaffold templates
- `router/routes.ts.template`: dorzucenie placeholdera na dołączanie modułowych tras oraz komentarza z sygnaturą wstawiania (żeby CLI mógł deterministycznie modyfikować plik).
- `router/index.ts.template`: globalny guard respektujący meta.
- `App.vue.template`: jeśli nie ma, zapewnić slot pod layouty oraz Toaster (już jest instalacja `sonner`).

#### Interfejs CLI i UX
- `setup --all` powinno:
  - ukryć większość promptów (`--yes` domyślnie wymuszone w działaniach wewnątrz),
  - wyświetlać czytelny log kroków (setup → scaffold → init → add authFull → add layouts → generate pages → link routes → add guards → lint),
  - w razie kolizji plików: z racji `--all` działać z `--overwrite` oraz wyświetlić listę podmienionych plików.

#### Edge cases
- Brak `components.json` po scaffoldzie → automatyczne `init --yes`.
- Konflikty aliasów ścieżek → upewnić się, że `@/*` jest w `tsconfig.json` (już robione w `setup`).
- Ponowne odpalenie w istniejącym projekcie → nie dotyczy `setup`, ale warto umożliwić podobne „all-in” w osobnej komendzie np. `bootstrap` dla istniejącego projektu (poza zakresem na teraz).

#### Wysokopoziomowa implementacja (zadania)
1) CLI: rozszerzyć `setup` o flagi `--auth-full`, `--all` i obsługę przepływu.
2) Registry: dodać layout `AuthenticatedLayout` + strony `Dashboard`, `Profile (view/edit)`, `Settings`, `LogsBrowser` (+ `LogsTable`, `logsService`).
3) Scaffold templates: dodać hook/miejsce na modułowe trasy i global guard; ustandaryzować miejsce wstrzyknięcia.
4) CLI helper do modyfikacji `src/router/routes.ts` (deterministyczny insert importów i wpisów tras); ewentualnie generator pliku jeśli brak.
5) Guardy: dodać `registry/shared/router/guards.ts`; wpiąć w `router/index.ts` (jeśli nie narusza istniejących założeń).
6) Test ręczny w `tmp-test-project-v2`: pełne przejście komendy, start `pnpm dev`, smoke test nawigacji i auth.

#### Kryteria akceptacji
- `pnpm dlx vue-blocks-registry setup my-app --all` tworzy działający projekt, który:
  - ma skonfigurowany router z authRoutes + trasami aplikacji,
  - posiada layout z menu dla zalogowanych,
  - umożliwia logowanie/rejestrację/reset hasła (z `authFull`),
  - po zalogowaniu pokazuje dashboard i nawigację do profile/settings/logs,
  - wymusza auth na trasach chronionych, oraz przerzuca zalogowanych z tras guest-only.

#### Ryzyka
- Zależności bundli (np. layouty) i spójność importów `@registry/*` — trzeba pilnować `registryDependencies` i transformacji importów.
- Stabilność modyfikacji plików (deterministyczne edycje `routes.ts`) — wymaga jasnych kotwic-komentarzy w template.
- Zakres `authFull` względem `change password` — jeśli brak, dodać route/page w ramach auth modułu.

#### Dalsze rozszerzenia (po MVP)
- Flaga `--no-logs`/`--no-settings` dla selektywnego bootstrapu,
- Komenda `bootstrap` dla istniejących projektów (bez tworzenia nowego),
- Integracja z realnym backendem przez plik `config.ts` (endpointy),
- Preset menu (z i18n kluczami) w jednym miejscu `app/config/navigation.ts`.


