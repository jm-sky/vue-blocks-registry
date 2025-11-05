# Plan Separacji DEMO - Opcja A + B

## Cel
Pełna separacja fizyczna (struktura folderów) i logiczna (route paths) pomiędzy:
- **Dokumentacją/Showcase** - `/demo/*`
- **Aplikacją Demo** - `/demo/app/*`

---

## Obecna Struktura

```
src/
├── pages/
│   ├── demo/                    # Dokumentacja showcase
│   │   ├── layouts/
│   │   ├── components/
│   │   ├── examples/
│   │   ├── Overview.vue
│   │   ├── Components.vue
│   │   └── ...
│   ├── auth/                    # Aplikacja demo - auth
│   │   ├── LoginPage.vue
│   │   ├── TwoFactorSetupPage.vue
│   │   └── ...
│   ├── dashboard/               # Aplikacja demo - dashboard
│   ├── settings/                # Aplikacja demo - settings
│   ├── user/                    # Aplikacja demo - user
│   ├── tenant/                  # Aplikacja demo - tenant
│   ├── AuthParent.vue
│   └── NotFoundPage.vue
```

**Routes obecnie:**
- `/demo/*` - Dokumentacja
- `/auth/*` - Login/register demo app
- `/dashboard` - Dashboard demo app
- `/settings` - Settings demo app
- `/profile` - Profile demo app

---

## Docelowa Struktura (Opcja A + B)

```
src/
├── demo/
│   ├── docs/                    # Dokumentacja/showcase (było: pages/demo/)
│   │   ├── layouts/
│   │   │   └── MainLayout.vue
│   │   ├── components/
│   │   │   ├── ButtonShowcase.vue
│   │   │   ├── LinkShowcase.vue
│   │   │   └── ...
│   │   ├── examples/
│   │   │   ├── Dashboard.vue
│   │   │   ├── Auth.vue
│   │   │   └── ...
│   │   ├── Overview.vue
│   │   ├── Introduction.vue
│   │   ├── Components.vue
│   │   ├── Examples.vue
│   │   └── I18nDemo.vue
│   │
│   └── app/                     # Aplikacja demo (było: pages/auth, pages/dashboard, etc.)
│       ├── auth/
│       │   ├── LoginPage.vue
│       │   ├── LoginOfficialPage.vue
│       │   ├── TwoFactorSetupPage.vue
│       │   ├── TwoFactorVerifyPage.vue
│       │   ├── partials/
│       │   │   └── AuthLinks.vue
│       │   └── AuthParent.vue
│       ├── dashboard/
│       │   └── DashboardPage.vue
│       ├── settings/
│       │   └── SettingsPage.vue
│       ├── user/
│       │   ├── UserProfilePage.vue
│       │   ├── UserProfileEditPage.vue
│       │   └── UserChangePasswordPage.vue
│       └── tenant/
│           └── SelectTenantPage.vue
│
├── pages/                       # Tylko strony specjalne
│   └── NotFoundPage.vue
│
├── components/                  # Wspólne komponenty (bez zmian)
├── router/                      # Router (duże zmiany)
├── i18n/                        # i18n (bez zmian)
└── ...
```

**Routes docelowe:**
- `/demo` - Dokumentacja (Overview)
- `/demo/introduction` - Intro docs
- `/demo/components` - Komponenty showcase
- `/demo/examples` - Przykłady docs
- **`/demo/app/auth/login`** - Login demo app
- **`/demo/app/auth/2fa/setup`** - 2FA setup demo
- **`/demo/app/dashboard`** - Dashboard demo
- **`/demo/app/settings`** - Settings demo
- **`/demo/app/profile`** - Profile demo

---

## Szczegółowy Plan Migracji

### Krok 1: Przygotowanie - Backup i branch

```bash
# Commit obecny stan
git add .
git commit -m "chore: before demo separation"

# Opcjonalnie: nowy branch
git checkout -b refactor/demo-separation
```

---

### Krok 2: Tworzenie Nowej Struktury Folderów

**2.1. Utworzyć foldery:**
```bash
mkdir -p src/demo/docs
mkdir -p src/demo/app/auth/partials
mkdir -p src/demo/app/dashboard
mkdir -p src/demo/app/settings
mkdir -p src/demo/app/user
mkdir -p src/demo/app/tenant
```

**2.2. Przenieść pliki dokumentacji:**
```bash
# Dokumentacja (pages/demo/* → demo/docs/*)
mv src/pages/demo/layouts src/demo/docs/
mv src/pages/demo/components src/demo/docs/
mv src/pages/demo/examples src/demo/docs/
mv src/pages/demo/*.vue src/demo/docs/
```

**2.3. Przenieść pliki aplikacji demo:**
```bash
# Auth (pages/auth/* → demo/app/auth/*)
mv src/pages/auth/*.vue src/demo/app/auth/
mv src/pages/auth/partials src/demo/app/auth/

# AuthParent też do auth
mv src/pages/AuthParent.vue src/demo/app/auth/

# Dashboard
mv src/pages/dashboard/*.vue src/demo/app/dashboard/

# Settings
mv src/pages/settings/*.vue src/demo/app/settings/

# User
mv src/pages/user/*.vue src/demo/app/user/

# Tenant
mv src/pages/tenant/*.vue src/demo/app/tenant/
```

**2.4. Zostaw w pages/ tylko:**
```
src/pages/
└── NotFoundPage.vue
```

---

### Krok 3: Aktualizacja route-names.ts

**Plik:** `src/router/route-names.ts`

**3.1. Zmienić RouteNames (bez zmian - nazwy pozostają):**
```typescript
// Nazwy route nie ulegają zmianie
export const RouteNames = {
  HOME: 'Home',
  DEMO: 'Demo',
  // ... (bez zmian)
  AUTH_LOGIN: 'Login',
  AUTH_TWO_FACTOR_SETUP: 'TwoFactorSetup',
  // ... (bez zmian)
}
```

**3.2. Zmienić RoutePaths (dodać prefix `/demo/app`):**
```typescript
export const RoutePaths = {
  HOME: '/',

  // Dokumentacja (bez zmian)
  DEMO: '/demo',
  DEMO_OVERVIEW: '/demo',
  DEMO_INTRODUCTION: '/demo/introduction',
  DEMO_COMPONENTS: '/demo/components',
  DEMO_COMPONENTS_BUTTON: '/demo/components/button',
  DEMO_COMPONENTS_LINKS: '/demo/components/links',
  DEMO_COMPONENTS_LAYOUT: '/demo/components/layout',
  DEMO_COMPONENTS_DATA_TABLE: '/demo/components/data-table',
  DEMO_COMPONENTS_CODE_BLOCK: '/demo/components/code-block',
  DEMO_EXAMPLES: '/demo/examples',
  DEMO_EXAMPLES_DASHBOARD: '/demo/examples/dashboard',
  DEMO_EXAMPLES_AUTH: '/demo/examples/auth',
  DEMO_EXAMPLES_I18N: '/demo/examples/i18n',
  DEMO_EXAMPLES_SETTINGS: '/demo/examples/settings',
  DEMO_EXAMPLES_USER: '/demo/examples/user',
  DEMO_EXAMPLES_LOGS: '/demo/examples/logs',
  DEMO_EXAMPLES_TENANT: '/demo/examples/tenant',

  // Aplikacja Demo (ZMIENIONE - dodany prefix /demo/app)
  AUTH: '/demo/app/auth',
  AUTH_LOGIN: '/demo/app/auth/login',
  AUTH_LOGIN_OFFICIAL: '/demo/app/auth/login/official',
  AUTH_REGISTER: '/demo/app/auth/register',
  AUTH_FORGOT_PASSWORD: '/demo/app/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/demo/app/auth/reset-password',
  AUTH_CHANGE_PASSWORD: '/demo/app/auth/change-password',
  AUTH_TWO_FACTOR_SETUP: '/demo/app/auth/2fa/setup',
  AUTH_TWO_FACTOR_VERIFY: '/demo/app/auth/2fa/verify',

  SELECT_TENANT: '/demo/app/select-tenant',
  DASHBOARD: '/demo/app/dashboard',
  USER_PROFILE: '/demo/app/profile',
  USER_PROFILE_EDIT: '/demo/app/profile/edit',
  SETTINGS: '/demo/app/settings',
} as const
```

**Zmiany:**
- Wszystkie routes aplikacji demo dostają prefix `/demo/app`
- Routes dokumentacji pozostają bez zmian (`/demo/*`)

---

### Krok 4: Aktualizacja routes.ts

**Plik:** `src/router/routes.ts`

**4.1. Zmienić importy (nowe ścieżki):**
```typescript
// PRZED:
import AuthLinks from '@/pages/auth/partials/AuthLinks.vue'

// PO:
import AuthLinks from '@/demo/app/auth/partials/AuthLinks.vue'
```

**4.2. Zmienić routes - Dokumentacja (component paths):**
```typescript
{
  path: RoutePaths.DEMO,
  name: RouteNames.DEMO,
  component: () => import('@/demo/docs/layouts/MainLayout.vue'), // ZMIENIONE
  children: [
    {
      path: '',
      name: RouteNames.DEMO_OVERVIEW,
      component: () => import('@/demo/docs/Overview.vue'), // ZMIENIONE
    },
    {
      path: 'introduction',
      name: RouteNames.DEMO_INTRODUCTION,
      component: () => import('@/demo/docs/Introduction.vue'), // ZMIENIONE
    },
    {
      path: 'components',
      name: RouteNames.DEMO_COMPONENTS,
      component: () => import('@/demo/docs/Components.vue'), // ZMIENIONE
    },
    {
      path: 'components/button',
      name: RouteNames.DEMO_COMPONENTS_BUTTON,
      component: () => import('@/demo/docs/components/ButtonShowcase.vue'), // ZMIENIONE
    },
    // ... pozostałe routes dokumentacji
    {
      path: RoutePaths.DEMO_EXAMPLES_DASHBOARD,
      name: RouteNames.DEMO_EXAMPLES_DASHBOARD,
      component: () => import('@/demo/docs/examples/Dashboard.vue'), // ZMIENIONE
    },
    // ... etc
  ],
},
```

**4.3. Zmienić routes - Aplikacja Demo (paths + component paths):**
```typescript
{
  path: RoutePaths.AUTH, // teraz '/demo/app/auth'
  name: RouteNames.AUTH,
  component: () => import('@/demo/app/auth/AuthParent.vue'), // ZMIENIONE
  meta: {
    message: 'Demo credentials: "demo@example.com" with password: "password123"',
    layoutActionsComponent: AuthLinks,
  },
  children: [
    {
      path: RoutePaths.AUTH_LOGIN, // teraz '/demo/app/auth/login'
      name: RouteNames.AUTH_LOGIN,
      component: () => import('@/demo/app/auth/LoginPage.vue'), // ZMIENIONE
    },
    {
      path: RoutePaths.AUTH_LOGIN_OFFICIAL,
      name: RouteNames.AUTH_LOGIN_OFFICIAL,
      component: () => import('@/demo/app/auth/LoginOfficialPage.vue'), // ZMIENIONE
    },
    {
      path: RoutePaths.AUTH_REGISTER,
      name: RouteNames.AUTH_REGISTER,
      component: () => import('@registry/modules/auth/pages/RegisterPage.vue'),
      // Registry components - BEZ ZMIAN
    },
    {
      path: RoutePaths.AUTH_FORGOT_PASSWORD,
      name: RouteNames.AUTH_FORGOT_PASSWORD,
      component: () => import('@registry/modules/auth/pages/ForgotPasswordPage.vue'),
    },
    {
      path: RoutePaths.AUTH_RESET_PASSWORD,
      name: RouteNames.AUTH_RESET_PASSWORD,
      component: () => import('@registry/modules/auth/pages/ResetPasswordPage.vue'),
    },
    {
      path: RoutePaths.AUTH_TWO_FACTOR_SETUP,
      name: RouteNames.AUTH_TWO_FACTOR_SETUP,
      component: () => import('@/demo/app/auth/TwoFactorSetupPage.vue'), // ZMIENIONE
      meta: { requiresAuth: true },
    },
    {
      path: RoutePaths.AUTH_TWO_FACTOR_VERIFY,
      name: RouteNames.AUTH_TWO_FACTOR_VERIFY,
      component: () => import('@/demo/app/auth/TwoFactorVerifyPage.vue'), // ZMIENIONE
      meta: { requiresAuth: true },
    },
  ],
},
{
  path: RoutePaths.SELECT_TENANT, // teraz '/demo/app/select-tenant'
  name: RouteNames.SELECT_TENANT,
  component: () => import('@/demo/app/tenant/SelectTenantPage.vue'), // ZMIENIONE
  meta: { requiresAuth: true },
},
{
  path: RoutePaths.DASHBOARD, // teraz '/demo/app/dashboard'
  name: RouteNames.DASHBOARD,
  component: () => import('@/demo/app/dashboard/DashboardPage.vue'), // ZMIENIONE
  meta: {
    requiresAuth: true,
    requiresTenant: true,
  },
},
{
  path: RoutePaths.USER_PROFILE, // teraz '/demo/app/profile'
  name: RouteNames.USER_PROFILE,
  component: () => import('@/demo/app/user/UserProfilePage.vue'), // ZMIENIONE
},
{
  path: RoutePaths.USER_PROFILE_EDIT, // teraz '/demo/app/profile/edit'
  name: RouteNames.USER_PROFILE_EDIT,
  component: () => import('@/demo/app/user/UserProfileEditPage.vue'), // ZMIENIONE
},
{
  path: RoutePaths.AUTH_CHANGE_PASSWORD,
  name: RouteNames.AUTH_CHANGE_PASSWORD,
  component: () => import('@/demo/app/user/UserChangePasswordPage.vue'), // ZMIENIONE
},
{
  path: RoutePaths.SETTINGS, // teraz '/demo/app/settings'
  name: RouteNames.SETTINGS,
  component: () => import('@/demo/app/settings/SettingsPage.vue'), // ZMIENIONE
},
{
  path: '/:pathMatch(.*)*',
  name: RouteNames.NOT_FOUND,
  component: () => import('@/pages/NotFoundPage.vue'), // POZOSTAJE w pages/
},
```

---

### Krok 5: Aktualizacja Redirectów i Linków w Komponentach

**Pliki do sprawdzenia i aktualizacji:**

**5.1. Demo docs - linki do app demo:**
- `src/demo/docs/examples/Auth.vue` - linki do `/auth/login` → `/demo/app/auth/login`
- `src/demo/docs/examples/Dashboard.vue` - linki do `/dashboard` → `/demo/app/dashboard`
- `src/demo/docs/examples/Settings.vue` - linki do `/settings` → `/demo/app/settings`
- `src/demo/docs/examples/User.vue` - linki do `/profile` → `/demo/app/profile`
- `src/demo/docs/examples/TenantSelect.vue` - linki do `/select-tenant` → `/demo/app/select-tenant`

**Metoda aktualizacji:**
```vue
<!-- PRZED -->
<RouterLink to="/auth/login">Login</RouterLink>

<!-- PO (preferowany - type-safe) -->
<RouterLink :to="{ name: RouteNames.AUTH_LOGIN }">Login</RouterLink>

<!-- LUB -->
<RouterLink to="/demo/app/auth/login">Login</RouterLink>
```

**5.2. App demo - redirecty po akcjach:**

**LoginPage.vue** (`src/demo/app/auth/LoginPage.vue`):
```typescript
// PRZED:
await router.push('/dashboard')

// PO:
await router.push({ name: RouteNames.DASHBOARD })
// lub
await router.push('/demo/app/dashboard')
```

**TwoFactorSetupPage.vue** (`registry/modules/auth/pages/TwoFactorSetupPage.vue`):
```typescript
// PRZED:
router.push('/settings')

// PO:
router.push({ name: 'Settings' }) // jeśli używają named routes
// lub trzeba przekazać route name jako prop/config
```

**TwoFactorVerifyPage.vue** (`registry/modules/auth/pages/TwoFactorVerifyPage.vue`):
```typescript
// PRZED:
router.push('/dashboard')

// PO:
router.push({ name: 'Dashboard' })
```

**SecuritySettingsCard.vue** (`registry/modules/settings/components/SecuritySettingsCard.vue`):
```typescript
// PRZED:
router.push('/auth/2fa/setup')

// PO:
router.push({ name: 'TwoFactorSetup' })
```

**UWAGA:** Registry components używają hardcoded paths - trzeba je zmienić na named routes lub przekazywać route names jako props!

---

### Krok 6: Aktualizacja Guards

**Plik:** `src/router/index.ts` - **BEZ ZMIAN**

Guardy działają na route meta, nie na paths, więc nie wymagają zmian:
```typescript
protectRoutes(router)              // sprawdza meta.requiresAuth
protectRoutesWithTwoFactor(router) // sprawdza JWT payload
protectTenantRoutes(router)        // sprawdza meta.requiresTenant
```

**Ale:** sprawdzić czy w guardach nie ma hardcoded redirectów do paths.

**authGuard.ts** - sprawdzić redirecty:
```typescript
// PRZED:
next({ name: AuthRouteNames.login, query: { redirectTo: to.fullPath } })

// To jest OK bo używa named route
```

**twoFactorGuard.ts** - sprawdzić paths:
```typescript
// PRZED:
const TWO_FACTOR_VERIFY_ROUTE = '/auth/2fa/verify'
const TWO_FACTOR_SETUP_ROUTE = '/auth/2fa/setup'

// PO:
const TWO_FACTOR_VERIFY_ROUTE = '/demo/app/auth/2fa/verify'
const TWO_FACTOR_SETUP_ROUTE = '/demo/app/auth/2fa/setup'
```

---

### Krok 7: Aktualizacja Registry Components (Hardcoded Paths)

**Problem:** Registry components mają hardcoded paths w redirectach.

**Pliki do aktualizacji:**

**7.1. TwoFactorSetupPage.vue**
```typescript
// registry/modules/auth/pages/TwoFactorSetupPage.vue
// Linia 130-132

// PRZED:
<Button variant="outline" @click="router.push('/settings')">

// PO - opcja 1 (prop):
const props = defineProps<{
  backRoute?: string
}>()

<Button variant="outline" @click="router.push(props.backRoute || '/settings')">

// PO - opcja 2 (config):
import { AuthRoutePaths } from '@registry/modules/auth/config/routes'
<Button variant="outline" @click="router.push(AuthRoutePaths.settings || '/settings')">
```

**7.2. SecuritySettingsCard.vue**
```typescript
// registry/modules/settings/components/SecuritySettingsCard.vue
// Linia ~40

// PRZED:
router.push('/auth/2fa/setup')

// PO:
import { AuthRouteNames } from '@registry/modules/auth/config/routes'
router.push({ name: AuthRouteNames.TwoFactorSetup })
```

**7.3. Aktualizacja auth config routes**
```typescript
// registry/modules/auth/config/routes.ts

// Dodać export dla settings route (jeśli nie ma):
export const AuthRouteNames = {
  // ... existing
  twoFactorSetup: 'TwoFactorSetup',
  twoFactorVerify: 'TwoFactorVerify',
  settings: 'Settings', // DODAĆ
  dashboard: 'Dashboard', // DODAĆ
}
```

---

### Krok 8: Aktualizacja Home Redirect

**Plik:** `src/router/routes.ts`

```typescript
// PRZED:
{
  path: RoutePaths.HOME, // '/'
  name: RouteNames.HOME,
  redirect: RoutePaths.DEMO, // '/demo'
},

// PO (bez zmian - redirect pozostaje /demo):
{
  path: RoutePaths.HOME,
  name: RouteNames.HOME,
  redirect: RoutePaths.DEMO, // '/demo' - OK
},
```

---

### Krok 9: Aktualizacja Importów w Plikach Demo

**Pliki, które importują inne pliki demo - trzeba zaktualizować ścieżki:**

**Przykład:** `src/demo/docs/Examples.vue`
```typescript
// PRZED:
import SomeComponent from '@/pages/demo/components/SomeComponent.vue'

// PO:
import SomeComponent from '@/demo/docs/components/SomeComponent.vue'
```

**Sprawdzić wszystkie importy w:**
- `src/demo/docs/**/*.vue`
- `src/demo/app/**/*.vue`

**Użyć search & replace:**
```bash
# W katalogu src/demo/docs/
@/pages/demo/ → @/demo/docs/

# W katalogu src/demo/app/
@/pages/auth/ → @/demo/app/auth/
@/pages/dashboard/ → @/demo/app/dashboard/
@/pages/settings/ → @/demo/app/settings/
@/pages/user/ → @/demo/app/user/
@/pages/tenant/ → @/demo/app/tenant/
```

---

### Krok 10: Usunięcie Starych Folderów

**Po weryfikacji że wszystko działa:**
```bash
rm -rf src/pages/demo
rm -rf src/pages/auth
rm -rf src/pages/dashboard
rm -rf src/pages/settings
rm -rf src/pages/user
rm -rf src/pages/tenant
rm src/pages/AuthParent.vue

# Zostanie tylko:
# src/pages/NotFoundPage.vue
```

---

## Checklist Migracji

### Przygotowanie
- [ ] Commit obecnego stanu
- [ ] Opcjonalnie: nowy branch `refactor/demo-separation`
- [ ] Backup lokalny (copy całego folderu)

### Struktura Folderów
- [ ] Utworzyć `src/demo/docs/`
- [ ] Utworzyć `src/demo/app/auth/`
- [ ] Utworzyć `src/demo/app/dashboard/`
- [ ] Utworzyć `src/demo/app/settings/`
- [ ] Utworzyć `src/demo/app/user/`
- [ ] Utworzyć `src/demo/app/tenant/`
- [ ] Przenieść pliki dokumentacji do `demo/docs/`
- [ ] Przenieść pliki app do `demo/app/*/`

### Router
- [ ] Zaktualizować `RoutePaths` w `route-names.ts` (dodać `/demo/app`)
- [ ] Zaktualizować importy w `routes.ts`
- [ ] Zaktualizować component paths w `routes.ts` - dokumentacja
- [ ] Zaktualizować component paths w `routes.ts` - app demo
- [ ] Sprawdzić guards - czy nie ma hardcoded paths

### Guards
- [ ] Sprawdzić `authGuard.ts` - redirecty
- [ ] Zaktualizować `twoFactorGuard.ts` - paths do `/demo/app/auth/2fa/*`
- [ ] Sprawdzić `tenantGuard.ts` - redirecty

### Registry Components (Hardcoded Paths)
- [ ] `TwoFactorSetupPage.vue` - back button route
- [ ] `TwoFactorVerifyPage.vue` - success redirect
- [ ] `SecuritySettingsCard.vue` - link do setup
- [ ] Zaktualizować `auth/config/routes.ts` - dodać named exports

### Linki w Demo Docs
- [ ] `examples/Auth.vue` - linki do auth
- [ ] `examples/Dashboard.vue` - linki do dashboard
- [ ] `examples/Settings.vue` - linki do settings
- [ ] `examples/User.vue` - linki do profile
- [ ] `examples/TenantSelect.vue` - linki do tenant select

### Linki w Demo App
- [ ] `LoginPage.vue` - redirect po login
- [ ] `RegisterPage.vue` - redirect po register
- [ ] Inne redirecty w app demo

### Importy
- [ ] Search & replace w `demo/docs/`: `@/pages/demo/` → `@/demo/docs/`
- [ ] Search & replace w `demo/app/`: `@/pages/auth/` → `@/demo/app/auth/`
- [ ] Search & replace w `demo/app/`: `@/pages/dashboard/` → `@/demo/app/dashboard/`
- [ ] Search & replace w `demo/app/`: `@/pages/settings/` → `@/demo/app/settings/`
- [ ] Search & replace w `demo/app/`: `@/pages/user/` → `@/demo/app/user/`
- [ ] Search & replace w `demo/app/`: `@/pages/tenant/` → `@/demo/app/tenant/`

### Testowanie
- [ ] `pnpm run type-check` - brak błędów TypeScript
- [ ] `pnpm run lint` - brak błędów ESLint
- [ ] `pnpm run dev` - aplikacja startuje
- [ ] Dokumentacja działa: `/demo`, `/demo/components`, `/demo/examples`
- [ ] Auth działa: `/demo/app/auth/login`
- [ ] Dashboard działa: `/demo/app/dashboard`
- [ ] Settings działa: `/demo/app/settings`
- [ ] Profile działa: `/demo/app/profile`
- [ ] 2FA działa: `/demo/app/auth/2fa/setup`
- [ ] Guards działają (redirect na login, 2FA verify, tenant select)
- [ ] Wszystkie linki w demo docs prowadzą do właściwych miejsc
- [ ] Wszystkie redirecty w app działają

### Cleanup
- [ ] Usunąć stare foldery w `pages/`
- [ ] Commit zmian
- [ ] Test finalny
- [ ] Merge do main/develop

---

## Ryzyka i Mitygacja

### Ryzyko 1: Missed Imports
**Problem:** Jakiś plik nadal importuje ze starej lokalizacji.
**Mitygacja:**
- TypeScript/ESLint złapie większość
- Użyć grep do znalezienia: `grep -r "@/pages/auth" src/`

### Ryzyko 2: Hardcoded Paths w Registry
**Problem:** Registry components mają hardcoded `/auth/*`, `/settings`.
**Mitygacja:**
- Zmienić na named routes
- Lub dodać config/props dla custom paths

### Ryzyko 3: Guards Redirecty
**Problem:** Guards redirectują do `/auth/login` zamiast `/demo/app/auth/login`.
**Mitygacja:**
- Używać named routes w guardach
- Jeśli są paths - zaktualizować w twoFactorGuard

### Ryzyko 4: External Links
**Problem:** Linki z zewnątrz mogą wskazywać na stare paths.
**Mitygacja:**
- Dodać redirecty dla backward compatibility (opcjonalnie):
```typescript
// Redirecty dla starych linków
{ path: '/auth/login', redirect: '/demo/app/auth/login' },
{ path: '/dashboard', redirect: '/demo/app/dashboard' },
{ path: '/settings', redirect: '/demo/app/settings' },
```

---

## Szacowany Czas

- **Przygotowanie + struktura folderów:** 10 min
- **Aktualizacja route-names.ts i routes.ts:** 20 min
- **Aktualizacja guards:** 10 min
- **Aktualizacja linków i redirectów:** 20 min
- **Aktualizacja registry components:** 15 min
- **Search & replace importów:** 10 min
- **Testing:** 30 min
- **Cleanup:** 5 min

**TOTAL:** ~2 godziny

---

## Alternatywa: Stopniowa Migracja

Jeśli pełna migracja jest zbyt ryzykowna, można zrobić stopniowo:

### Faza 1: Tylko Struktura Folderów (Opcja A)
- Przenieść pliki do `demo/docs/` i `demo/app/`
- Zaktualizować importy w `routes.ts`
- **NIE zmieniać** route paths (zostawić `/auth/*`, `/dashboard`)

### Faza 2: Route Paths (Opcja B)
- Po przetestowaniu Fazy 1
- Zmienić `RoutePaths` na `/demo/app/*`
- Zaktualizować linki i redirecty

**Zaleta:** Mniejsze ryzyko, łatwiejszy rollback.
**Wada:** Dwa etapy, więcej commitów.

---

## Decyzja

**Rekomendacja:** Pełna migracja (Opcja A + B) w jednym kroku.

**Uzasadnienie:**
- Czysta separacja od razu
- Łatwiej testować wszystko razem
- Jeden commit/PR
- Mniej "intermediate state" confusion

**Jeśli coś pójdzie nie tak:** Revert commit i wróć do planu stopniowego.

---

## Pytania przed rozpoczęciem

1. **Czy robimy to teraz czy później?**
2. **Czy potrzebne są redirecty dla backward compatibility?** (`/auth/login` → `/demo/app/auth/login`)
3. **Czy registry components powinny używać named routes czy props dla custom paths?**
4. **Czy mam wykonać migrację automatycznie czy wolisz ręcznie?**

---

**Gotowy do migracji!** 🚀
