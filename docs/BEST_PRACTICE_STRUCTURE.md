# Vue 3 + TypeScript + Pinia — Best Practices (2025)

## Struktura katalogów

```
src/
  app/
    router/
      index.ts
    store/
      index.ts
    config/
      axios.ts
      env.ts
    layouts/
      DefaultLayout.vue
    App.vue
    main.ts

  modules/
    invoices/
      components/
        InvoiceList.vue
        InvoiceForm.vue
      pages/
        InvoiceIndexPage.vue
        InvoiceDetailsPage.vue
      store/
        useInvoicesStore.ts
      services/
        invoices.api.ts
        invoices.repository.ts
      validation/
        invoice.schema.ts
      types/
        invoice.dto.ts
        invoice.model.ts
      index.ts

    projects/
      ...

    common/
      components/
        BaseButton.vue
        DataTable.vue
      composables/
        usePagination.ts
        useDebounce.ts
      utils/
        formatDate.ts
        money.ts
      types/
        api.ts
        common.ts
      constants/
        regex.ts
        statuses.ts

  shared/
    ui/
    composables/
    services/
      httpClient.ts
      auth.interceptor.ts
    hooks/
    types/
      global.d.ts
    validation/
      zodHelpers.ts
```

## Podział odpowiedzialności w module

| Warstwa | Przykład | Opis |
|----------|-----------|------|
| `services/` | `invoices.api.ts`, `repository.ts` | logika komunikacji z API |
| `store/` | `useInvoicesStore.ts` | Pinia store |
| `validation/` | `invoice.schema.ts` | Zod schematy |
| `types/` | `invoice.dto.ts`, `invoice.model.ts` | Typy DTO i modele |
| `components/` | `InvoiceList.vue` | UI domenowy |
| `pages/` | `InvoiceIndexPage.vue` | Strony domeny |
| `index.ts` | eksport publiczny | interfejs modułu |

## Zasady ogólne

- Struktura feature-based / domain-driven  
- Każdy moduł izolowany, eksportuje własne API  
- Walidacje Zod trzymane lokalnie w module  
- Typy DTO oddzielone od modeli biznesowych  
- Store Pinia per domena  
- Komponenty domenowe lokalnie w module  
- Warstwa `shared/` tylko dla generycznych narzędzi i UI  
- Router agreguje routes z modułów  
- Testy jednostkowe per moduł (`__tests__/`)

## Narzędzia

- Volar + TypeScript strict mode  
- Unplugin-auto-import  
- Unplugin-vue-components  
- Vite aliases (`@/modules/...`)  
- ESLint + Prettier + import sorting  
- Zod + zodios / valibot  
- Vitest / Cypress

## TL;DR

| Kategoria | Zalecenie |
|------------|------------|
| Struktura | Feature-based / domain-driven |
| Granice | Moduły izolowane |
| Walidacja | Zod per domena |
| Typy | Oddziel DTO od modelu |
| Store | Pinia per domena |
| Komponenty | Lokalnie w module |
| Shared layer | tylko generyczne narzędzia |
| Router | routes z modułów |
| Testy | per domena |
