# Plan Zgromadzenia Fajnych Komponentów Vue

## Przegląd
Ten dokument zawiera plan zbierania i organizacji komponentów Vue z istniejących projektów w celu utworzenia centralnego rejestru komponentów.

## Projekty do Analizy

### 1. `~/projects/private/dev-made-it`
**Status:** Wstępna analiza zakończona (przyda się kolejna)  
**Typ:** Strona firmowa / Portfolio  
**Technologie:** Nuxt 3, Vue 3, Tailwind CSS

#### Zidentyfikowane Komponenty:
- **UI Components:**
  - `Button.vue` - Zaawansowany komponent przycisku z wariantami (variant, size, vibe)  
     **Mamy zaimplementowane `vibe` w naszym button.** `[DONE]`
  - `HoverLink.vue` - Link z animacją hover i efektami przejścia
  - `DarkModeButton.vue` - Przełącznik trybu ciemnego z animacjami Transition  
     **Chcemy mieć te piękne transition.**

- **Layout Components:**
  - `Navbar.vue` - Nawigacja główna
  - `FooterSection.vue` - Stopka strony
  - `BaseSection.vue` - Podstawowy kontener sekcji

- **Card Components:**
  - `BaseCard.vue` - Podstawowy komponent karty
  - `AboutCard.vue` - Karta informacyjna
  - `ContactCard.vue` - Karta kontaktowa

- **Specialized Components:**
  - `GradientMaskedContent.vue` - Komponent z gradientem
  - `ScrollToTop.vue` - Przycisk przewijania do góry
  - `CompanyLogo.vue` - Logo firmy
  - `CompanyName.vue` - Nazwa firmy

#### Priorytet: WYSOKI
**Powód:** Komponenty z animacjami, nowoczesnym designem i dobrymi praktykami UX

---

### 2. `~/projects/azure-ocr-service`
**Status:** Wstępna analiza zakończona  
**Typ:** Aplikacja biznesowa / Dashboard  
**Technologie:** Vue 3, TypeScript, Tailwind CSS, TanStack Table

#### Zidentyfikowane Komponenty:
- **DataTable System (PRIORYTET):**
  - `OperationsDataTable.vue` - Tabela operacji z paginacją i sortowaniem
  - `ErrorsDataTable.vue` - Tabela błędów z zaawansowanymi funkcjami
  - `Table.vue` - Podstawowy komponent tabeli
  - `TableHeader.vue`, `TableBody.vue`, `TableRow.vue`, `TableCell.vue` - Komponenty tabeli
  - `TableEmpty.vue` - Stan pustej tabeli
  - `TableFetchError.vue` - Stan błędu ładowania

- **Statistics Components:**
  - `StatisticsView.vue` - Główny widok statystyk
  - `StatisticsSummaryCards.vue` - Karty podsumowujące
  - `StatisticsDailyTrendChart.vue` - Wykres trendów
  - `StatisticsProcessingStatus.vue` - Status przetwarzania
  - `StatisticsDuplicateAnalysis.vue` - Analiza duplikatów
  - `StatisticsActionSummary.vue` - Podsumowanie akcji

- **UI Components:**
  - Kompletny system UI (Button, Card, Select, Dropdown, Dialog, Toast, etc.)
  - `LoadingIcon.vue` - Komponent ładowania
  - `PageCard.vue` - Kontener strony
  - `PageListHeader.vue` - Nagłówek listy

- **Layout Components:**
  - `AuthenticatedLayout.vue` - Layout dla zalogowanych użytkowników
  - `GuestLayout.vue` - Layout dla gości
  - `TopBar.vue` - Górny pasek
  - `MainNav.vue` - Główna nawigacja

#### Priorytet: BARDZO WYSOKI
**Powód:** Zaawansowane komponenty DataTable z obsługą slotów, kompletny system UI, komponenty statystyk

---

### 3. `~/projects/jira-sprawy-connect-app`
**Status:** Wstępna analiza zakończona  
**Typ:** Aplikacja integracyjna / Dashboard  
**Technologie:** Vue 3, TypeScript, Tailwind CSS

#### Zidentyfikowane Komponenty:
- **DataTable Components:**
  - `OperationsDataTable.vue` - Tabela operacji (podobna do azure-ocr-service)
  - `ErrorsDataTable.vue` - Tabela błędów z akcjami
  - `ErrorsDataTableRowActions.vue` - Akcje wierszy tabeli błędów

- **Dashboard Components:**
  - `DashboardPage.vue` - Główna strona dashboardu
  - `ErrorsCard.vue` - Karta błędów
  - `RecentOperationsCard.vue` - Karta ostatnich operacji
  - `ServicesStatusCard.vue` - Karta statusu usług
  - `SystemHealthCard.vue` - Karta zdrowia systemu

- **System Health Components:**
  - `ErrorStatsCard.vue` - Karta statystyk błędów
  - `ErrorStatsErrorCounts.vue` - Liczniki błędów
  - `DatabaseHealthCard.vue` - Karta zdrowia bazy danych
  - `KafkaHealthCard.vue` - Karta zdrowia Kafka

- **UI Components:**
  - Kompletny system UI (Button, Card, Select, Alert, Badge, etc.)
  - `Loader.vue` - Komponent ładowania
  - `UnauthorizedDialog.vue` - Dialog autoryzacji

- **Layout Components:**
  - `AuthenticatedLayout.vue` - Layout dla zalogowanych
  - `GuestLayout.vue` - Layout dla gości
  - `TopBar.vue` - Górny pasek
  - `LogoText.vue` - Logo tekstowe

#### Priorytet: ŚREDNI
**Powód:** Podobne komponenty do azure-ocr-service, ale z dodatkowymi funkcjami dashboardu

---

## Plan Implementacji

> **UWAGA**: Trzeba to omówić.

### Faza 1: Komponenty Podstawowe ✅ ZAKOŃCZONA
1. ✅ **DarkModeButton** - Z `dev-made-it`
   - Smooth transitions (asymetryczne 300ms/200ms)
   - Vue 3 Transition z slide + fade
   - lucide-vue-next icons (Moon/Sun)

2. ✅ **HoverLink** - Z `dev-made-it`
   - Glass-morphism hover effect
   - Pill-shaped design
   - Dark mode support

3. ✅ **ScrollToTop** - Z `dev-made-it`
   - Fixed position button
   - Scroll detection (threshold: 300px)
   - Smooth scroll behavior

### Faza 2: Layout Improvements ✅ ZAKOŃCZONA
1. ✅ **Renaming & Reorganizacja**
   - DefaultLayout → PublicLayout
   - AuthLayout → GuestLayoutCentered
   - Zaktualizowano wszystkie importy

2. ✅ **Nowe Layouty**
   - GuestLayoutCenteredGlass (glass-morphism + background image)
   - GuestLayoutTwoColumns (split-screen z branding panel)

3. ✅ **Layout Utility Components**
   - MainNav (horizontal navigation z icons)
   - UserNav (user dropdown z avatar)
   - PageCard (content wrapper)
   - PageListHeader (header z count badge)
   - PageListWrapper (kombinacja Card + Header)

4. ✅ **AuthenticatedLayout Upgrade**
   - Integracja z MainNav i UserNav
   - Professional top bar
   - Dark mode toggle

5. ✅ **Demo Page**
   - Layout.vue z showcase wszystkich komponentów
   - ScrollToTop w DemoParent
   - Zaktualizowane statystyki

### Faza 3: DataTable Bundle (🟡 W TRAKCIE - 20% complete)

**Status:** Rozpoczęte, szczegółowa dokumentacja w `registry/components/data-table/README.md`

**✅ Zakończone:**
1. ✅ Dodano base table components z shadcn-vue (9 komponentów)
2. ✅ Dodano @tanstack/vue-table dependency
3. ✅ Utworzono przykładowe dane i typy (Payment interface)
4. ✅ Utworzono podstawowe column definitions
5. ✅ Utworzono DataTableBasic.vue (podstawowy komponent z TanStack)
6. ✅ Dodano checkbox i dropdown-menu components
7. ✅ Dodano table do registry.json
8. ✅ Utworzono README.md z pełną dokumentacją dalszych kroków

**⏳ TODO (wg oficjalnej dokumentacji shadcn-vue):**
1. ⏳ Dodać valueUpdater() do utils.ts
2. ⏳ Implementować sorting (getSortedRowModel)
3. ⏳ Implementować filtering (getFilteredRowModel)
4. ⏳ Implementować pagination (getPaginationRowModel)
5. ⏳ Implementować row selection (z checkboxami)
6. ⏳ Implementować column visibility toggle
7. ⏳ Stworzyć finalny DataTable.vue (wszystkie features w jednym komponencie)
8. ⏳ Dodać checkbox i dropdown-menu do registry.json
9. ⏳ Stworzyć demo page z wszystkimi przykładami

**📋 Model działania:**
- Client-side: Sorting, filtering, pagination na froncie
- Server-side: Opcjonalnie via props (total, page, pageSize) + events
- Slot system: Custom cell rendering per column (jak w azure-ocr-service)

**📚 Resources:**
- Dokumentacja: `registry/components/data-table/README.md`
- Oficjalny tutorial: https://www.shadcn-vue.com/docs/components/data-table.html
- Referencyjna implementacja: azure-ocr-service `/src/components/DataTable.vue`
1. **Statistics Components** - Z `azure-ocr-service`
   - StatisticsSummaryCards
   - StatisticsDailyTrendChart
   - StatisticsProcessingStatus

2. **Dashboard Components** - Z `jira-sprawy-connect-app`
   - SystemHealthCard
   - ErrorStatsCard
   - ServicesStatusCard

3. **System UI (Kompletny)** - Z `azure-ocr-service`
   - Select, Dropdown, Dialog, Toast
   - Form components
   - Badge, Alert, Switch

### Faza 4: Optymalizacja i Dokumentacja (Tydzień 7-8)
1. **Unifikacja API** - Ujednolicenie interfejsów komponentów
2. **TypeScript Support** - Pełne typowanie
3. **Dokumentacja** - Storybook lub podobne
4. **Testy** - Unit testy dla kluczowych komponentów

## Szczegółowe Wymagania dla DataTable

### Funkcjonalności Wymagane:
- ✅ Paginacja (TanStack Table)
- ✅ Sortowanie (TanStack Table)
- ✅ Filtrowanie (TanStack Table)
- ✅ Row selection (TanStack Table)
- ✅ Slot system per komórka
- ✅ Konfigurowalne kolumny
- ✅ Loading states
- ✅ Error states
- ✅ Empty states
- ✅ Responsive design

### Przykład Użycia (Docelowy):
```vue
<DataTable :data="users" :columns="userColumns">
  <template #name="{ data }">
    <div class="font-semibold">{{ data.name }}</div>
  </template>
  <template #email="{ data }">
    <a :href="`mailto:${data.email}`">{{ data.email }}</a>
  </template>
  <template #actions="{ data }">
    <Button @click="editUser(data.id)">Edit</Button>
  </template>
</DataTable>
```

## Proponowana struktura Katalogów (docelowa, nie w naszym registry)

```
src/components/
├── ui/                    # Podstawowe komponenty UI
│   ├── button/
│   ├── card/
│   ├── table/
│   ├── select/
│   └── ...
├── data/                  # Komponenty danych
│   ├── DataTable/
│   ├── Statistics/
│   └── Dashboard/
├── layout/                # Komponenty layoutu
│   ├── AuthenticatedLayout/
│   ├── GuestLayout/
│   └── ...
├── animation/             # Komponenty z animacjami
│   ├── HoverLink/
│   ├── DarkModeButton/
│   └── ...
└── specialized/           # Komponenty specjalistyczne
    ├── Statistics/
    ├── Health/
    └── ...
```

## Metryki Sukcesu

1. **Ilość Komponentów:** 5+ komponentów
2. **Pokrycie Funkcjonalności:** 90%+ funkcji z oryginalnych projektów
3. **TypeScript Support:** 100% komponentów
4. **Dokumentacja:** Kompletna dokumentacja API
5. **Testy:** 80%+ pokrycie testami
6. **Performance:** Brak regresji wydajności

## Następne Kroki

1. ✅ Analiza istniejących projektów
2. ✅ Stworzenie planu implementacji
3. ✅ Rozpoczęcie implementacji Fazy 1 (DarkModeButton, HoverLink, ScrollToTop)
4. ✅ Implementacja Fazy 2 (Layouty + utility components)
5. ✅ Setup środowiska deweloperskiego
6. ✅ Demo page z nowymi komponentami
7. ⏳ Implementacja Fazy 3 (DataTable z TanStack Table)
8. ⏳ Konfiguracja Storybook dla dokumentacji (opcjonalne)

---

**Data utworzenia:** 2024-12-19  
**Ostatnia aktualizacja:** 2024-12-19  
**Autor:** AI Assistant
