# Vue 3 + TypeScript + Pinia + TanStack Query — Struktura projektu (Finalna z TypeGuard)

```
src/
├─ app/
│  ├─ router/
│  │  ├─ index.ts                # główny router, importuje routes z modułów
│  │  ├─ routes.auth.ts          # trasy modułu auth
│  │  └─ routes.pages.ts         # trasy modułu pages/corePages
│  ├─ store/
│  │  └─ index.ts                # globalny store Pinia
│  ├─ layouts/
│  │  ├─ AuthenticatedLayout.vue # layout dla zalogowanych użytkowników
│  │  └─ DefaultLayout.vue       # layout dla publicznych stron
│  ├─ App.vue
│  └─ main.ts
│  
├─ modules/
│   ├─ auth/
│   │  ├─ components/             # UI komponenty auth
│   │  │  ├─ LoginForm.vue
│   │  │  ├─ RegisterForm.vue
│   │  │  └─ LogoutButton.vue
│   │  ├─ pages/                  # strony auth
│   │  │  ├─ LoginPage.vue
│   │  │  ├─ RegisterPage.vue
│   │  │  ├─ ForgotPasswordPage.vue
│   │  │  ├─ ResetPasswordPage.vue
│   │  │  └─ ChangePasswordPage.vue
│   │  ├─ store/
│   │  │  └─ useAuthStore.ts       # Pinia store: token w localStorage, user ref, computed isAuthenticated
│   │  ├─ services/
│   │  │  └─ authService.ts        # komunikacja z API: login, logout, register, reset, change password
│   │  ├─ queries/                 # TanStack Query composables
│   │  │  ├─ useLoginQuery.ts
│   │  │  ├─ useRegisterMutation.ts
│   │  │  ├─ useForgotPasswordMutation.ts
│   │  │  ├─ useResetPasswordMutation.ts
│   │  │  └─ useChangePasswordMutation.ts
│   │  ├─ validation/             # Zod schematy walidacji
│   │  │  ├─ login.schema.ts
│   │  │  ├─ register.schema.ts
│   │  │  ├─ forgotPassword.schema.ts
│   │  │  ├─ resetPassword.schema.ts
│   │  │  ├─ changePassword.schema.ts
│   │  │  └─ changePassword.schema.ts
│   │  ├─ composables/            # helpers
│   │  │  ├─ useAuth.ts
│   │  │  └─ useLogout.ts
│   │  ├─ types/
│   │  │  └─ user.ts
│   │  └─ index.ts                # eksport publiczny modułu
│   │
│   └─ pages/                     # moduł globalnych stron / core pages
│      ├─ pages/
│      │  ├─ LandingPage.vue
│      │  ├─ PrivacyTermsPage.vue
│      │  └─ DashboardPage.vue
│      └─ index.ts
│  
└─ shared/
    ├─ config/
    │  └─ config.ts               # wspólny obiekt config + JWT_STORE_KEY
    ├─ ui/                        # generyczne komponenty UI (Button, Input itd.)
    ├─ composables/               # generyczne composables (useDebounce, usePagination)
    ├─ services/
    │  ├─ apiClient.ts             # wspólny klient Axios
    │  └─ auth.interceptor.ts      # interceptor dodający JWT_STORE_KEY
    ├─ hooks/
    ├─ types/
    │  └─ global.d.ts
    ├─ validation/
    │  └─ zodHelpers.ts            # helpery Zod (email, phone, NIP itd.)
    └─ utils/
       └─ typeGuards.ts            # type guard isValidationError
```

## Plik `config.ts` (shared/config)

```ts
// shared/config/config.ts

export const config = {
  app: {
    id: import.meta.env.VITE_APP_ID ?? 'defaultApp',
    name: import.meta.env.VITE_APP_NAME ?? 'MyApp',
    description: import.meta.env.VITE_APP_DESCRIPTION ?? 'Auth module',
  }
}

// osobna zmienna do użycia w localStorage / store
export const JWT_STORE_KEY = `${config.app.id}:token`
```

## TypeGuard dla błędów walidacji

```ts
// shared/utils/typeGuards.ts
import { HttpStatusCode } from 'axios'

export interface ValidationErrorResponse {
  errors: Record<string, string[]>
}

export type ValidationError = AxiosError<ValidationErrorResponse> // Czy to poprawnie?

export function isValidationError(err: any): err is ValidationError {
  return err?.response?.status === HttpStatusCode.UnprocessableEntity && !!err.response.data?.errors
}
```

## Przykład użycia `try/catch` z TypeGuard i VeeValidate

```ts
import { isValidationError } from '@/shared/utils/typeGuards'
import type { FormErrors } from 'vee-validate'
import { authService } from '@/modules/auth/services/authService'

async function login(data: { email: string; password: string }, setErrors: (errors: FormErrors) => void) {
  try {
    await authService.login(data)
    // np. redirect po udanym logowaniu
  } catch (err: any) {
    if (isValidationError(err)) {
      // ustawienie błędów w VeeValidate
      setErrors(err.response.data.errors)
    } else {
      // inne błędy np. sieciowe
      toast.error('Unexpected error occured in login process')
      console.error(err)
    }
  }
}
```

### Kluczowe punkty całego projektu:

- **Moduł auth** zawiera tylko elementy związane z autentykacją: komponenty, pages, store, queries, validation, composables.  
- **TanStack Query** w katalogu `queries/` obsługuje fetchy i mutacje API.  
- **authService.ts** korzysta ze wspólnego klienta Axios (`shared/services/apiClient.ts`) z automatycznie zastosowanym interceptorem.  
- **Shared config** jest dostępny dla wszystkich modułów i zawiera obiekt `config` oraz stałą `JWT_STORE_KEY`.  
- **Moduł pages/corePages** przechowuje strony niezwiązane stricte z auth: Landing, Privacy Terms, Dashboard.  
- **UI** bazuje na shadcn-vue + Tailwind.  
- **Zod schematy** służą do walidacji formularzy i integracji z VeeValidate.  
- **Pinia store** w auth przechowuje token w `localStorage`, usera jako `ref` i posiada computed `isAuthenticated`.  
- **TypeGuard `isValidationError`** pozwala w prosty sposób obsługiwać błędy walidacji w każdym `try/catch`.  
- Cała struktura modułowa pozwala na łatwe importowanie auth i innych modułów do projektów oraz spójne zarządzanie konfiguracją i tokenem.
