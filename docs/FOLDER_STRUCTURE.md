#  Folder structure

Nasze registry wspiera taką strukturę katalogów docelowych projektów:

```
src/
├─ composables/
│  └─ useLogout.ts
├─ components/
│  ├─ ui/                       # Standardowa lokalizacja komponentów shadcn-vue
│  │  ├─ button/
│  │  │  ├─ index.ts
│  │  │  ├─ Button.vue
│  │  │  └─ button.css
│  │  ├─ input/
│  │  └─ ...
│  ├─ form/
│  └─ dialog/
├─ layouts/
│  ├─ authenticatedLayout.vue
│  └─ guestLayout.vue
├─ lib/
│  ├─ apiClient.vue             # Axios instance with interceptors
│  └─ utils.ts                  # Standard shadcn-vue file with `cn` helper
├─ pages/
│  ├─ auth/                     # Standardowa lokalizacja komponentów shadcn-vue
│  │  ├─ LoginPage.vue
│  │  └─ ResetPasswordPage.vue
│  └─ common/
│     └─ PrivacyTerms.vue
├─ services/
│  └─ authService.ts            # Service class to communicate with API endpoints using apiClient
├─ stores/                      # Pinia stores
│  └─ authStore.ts              # i.e. stores JWT (as useLocalStorage), user (as ref)
├─ types/
│  └─ auth.type.ts              # Interfaces & types, i.e. User interface
└─ config.ts                    # Centralized config file that exports config const
```

Example `config.ts`
```typescript
export const config = {
    app: {
        id: import.meta.end.APP_ID ?? 'saas-app',
        name: import.meta.end.APP_NAME ?? 'SaaS App',
    }
}

export const JWT_STORAGE_KEY = `${config.app.id}:token`
```