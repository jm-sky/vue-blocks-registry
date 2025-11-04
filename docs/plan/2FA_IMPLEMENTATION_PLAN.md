# Plan Implementacji 2FA (Two-Factor Authentication)

## Przegląd

Plan implementacji funkcji 2FA dla vue-blocks-registry, obejmujący:
- **TOTP (Time-based One-Time Password)** - autentykacja przez aplikacje typu Google Authenticator
- **WebAuthn Passkeys** - autentykacja przez klucze bezpieczeństwa (możliwość wielu kluczy z nazwami)

## Analiza Wzorców Istniejących Modułów

### Struktura Modułu Auth (wzorzec do naśladowania)

```
registry/modules/auth/
├── components/         # Komponenty UI (LoginForm, RegisterForm, etc.)
├── composables/       # Composables (useAuth, useLogout)
├── config/            # Konfiguracja (routes, auth.config, queryClient)
├── guards/            # Router guards (authGuard)
├── i18n/              # Tłumaczenia (en.ts, pl.ts)
├── pages/             # Strony (LoginPage, RegisterPage, etc.)
├── services/          # Serwisy API (authService.ts, mockAuthService.ts)
├── store/             # Pinia store (useAuthStore)
├── types/             # Typy TypeScript (user.type.ts, auth.type.ts)
├── utils/             # Utils (queryUtils.ts)
└── validation/        # Schematy Zod (login.schema.ts, etc.)
```

### Struktura Modułu Settings (wzorzec integracji)

```
registry/modules/settings/
├── pages/             # SettingsPage.vue
├── routes.ts          # Definicje tras
├── i18n/              # Tłumaczenia
├── services/          # settingsService.ts, mockSettingsService.ts
├── composables/       # useSettings.ts
├── types/             # settings.type.ts
└── validation/        # settings.schema.ts
```

### Kluczowe Wzorce

1. **Service Pattern**: Interfejs `IAuthService` + implementacja `AuthService` + `MockAuthService` dla demo
2. **Store Pattern**: Pinia store z localStorage persistence
3. **Guard Pattern**: Router guard sprawdzający autentykację
4. **i18n Pattern**: Modułowe tłumaczenia w `i18n/locales/{en,pl}.ts`
5. **Validation Pattern**: Zod schematy dla formularzy
6. **Routes Pattern**: `routes.ts` z `RoutePaths` i `RouteNames`
7. **Registry Items**: Rozdzielenie na `registry:lib`, `registry:ui`, `registry:page`, `registry:bundle`

## Architektura 2FA Module

### Proponowana Struktura

```
registry/modules/auth/
├── services/
│   ├── twoFactorService.ts        # Główny serwis 2FA
│   └── mockTwoFactorService.ts    # Mock dla demo
├── types/
│   └── twoFactor.type.ts          # Typy dla TOTP i WebAuthn
├── validation/
│   ├── totp.schema.ts             # Walidacja TOTP
│   └── webauthn.schema.ts         # Walidacja WebAuthn
├── composables/
│   ├── useTwoFactor.ts            # Composable do zarządzania 2FA
│   ├── useTotp.ts                 # Composable dla TOTP
│   └── useWebAuthn.ts             # Composable dla WebAuthn
├── components/
│   ├── TotpSetupForm.vue          # Formularz konfiguracji TOTP
│   ├── TotpVerifyForm.vue         # Formularz weryfikacji TOTP (login)
│   ├── TotpQrCode.vue             # Komponent wyświetlający QR code
│   ├── WebAuthnRegisterForm.vue   # Formularz rejestracji passkey
│   ├── WebAuthnVerifyForm.vue     # Formularz weryfikacji passkey (login)
│   └── PasskeyList.vue            # Lista zarejestrowanych passkeys
├── pages/
│   ├── TwoFactorSetupPage.vue     # Strona konfiguracji 2FA
│   └── TwoFactorVerifyPage.vue     # Strona weryfikacji podczas logowania
├── guards/
│   └── twoFactorGuard.ts          # Guard sprawdzający czy użytkownik ma włączone 2FA
├── config/
│   └── twoFactor.config.ts        # Konfiguracja (endpoints, timeout, etc.)
└── i18n/
    └── locales/
        ├── en.ts                  # Rozszerzenie tłumaczeń auth (sekcja twoFactor)
        └── pl.ts
```

### Integracja z Settings Module

```
registry/modules/settings/
├── pages/
│   └── SettingsPage.vue           # Rozszerzenie o sekcję Security
├── components/
│   └── SecuritySettings.vue       # Komponent zarządzania 2FA
└── routes.ts                      # Dodanie sub-route: /settings/security
```

## Szczegółowy Plan Implementacji

### 1. Typy TypeScript (`types/twoFactor.type.ts`)

#### TOTP Types
```typescript
export interface TotpSetup {
  secret: string           // Secret key do generowania kodów
  qrCode: string          // Data URL dla QR code
  backupCodes: string[]   // Backup codes do jednorazowego użycia
}

export interface TotpVerify {
  code: string            // 6-cyfrowy kod z aplikacji
}

export interface TotpStatus {
  enabled: boolean
  createdAt?: TDateTime
  lastUsedAt?: TDateTime
}
```

#### WebAuthn Types
```typescript
export interface Passkey {
  id: string              // Credential ID
  name: string            // Nazwa nadana przez użytkownika (np. "iPhone", "Laptop")
  createdAt: TDateTime
  lastUsedAt?: TDateTime
}

export interface WebAuthnRegisterRequest {
  name: string            // Nazwa passkey
}

export interface WebAuthnRegisterResponse {
  challenge: string       // Challenge do podpisania
  credentialCreationOptions: CredentialCreationOptions
}

export interface WebAuthnVerifyRequest {
  challenge: string
  credentialRequestOptions: CredentialRequestOptions
}

export interface WebAuthnStatus {
  enabled: boolean
  passkeys: Passkey[]
}
```

#### Combined Types
```typescript
export interface TwoFactorStatus {
  totp: TotpStatus
  webauthn: WebAuthnStatus
  required: boolean       // Czy 2FA jest wymagane (globalne ustawienie)
}

export interface TwoFactorVerifyResponse {
  verified: boolean
  method: 'totp' | 'webauthn'
  sessionToken?: string   // Token sesji po weryfikacji
}
```

### 2. Service Layer (`services/twoFactorService.ts`)

#### Interfejs `ITwoFactorService`
```typescript
interface ITwoFactorService {
  // TOTP
  setupTotp(): Promise<TotpSetup>
  verifyTotp(code: string): Promise<{ verified: boolean }>
  disableTotp(): Promise<void>
  getTotpStatus(): Promise<TotpStatus>
  
  // WebAuthn
  registerPasskey(request: WebAuthnRegisterRequest): Promise<WebAuthnRegisterResponse>
  completePasskeyRegistration(credential: PublicKeyCredential): Promise<Passkey>
  verifyPasskey(request: WebAuthnVerifyRequest): Promise<WebAuthnVerifyResponse>
  listPasskeys(): Promise<Passkey[]>
  deletePasskey(passkeyId: string): Promise<void>
  getWebAuthnStatus(): Promise<WebAuthnStatus>
  
  // Combined
  getTwoFactorStatus(): Promise<TwoFactorStatus>
  verifyTwoFactor(method: 'totp' | 'webauthn', data: TotpVerify | WebAuthnVerifyRequest): Promise<TwoFactorVerifyResponse>
}
```

#### Endpoints API (przykładowe)
```
POST   /auth/2fa/totp/setup          # Inicjalizacja TOTP
POST   /auth/2fa/totp/verify         # Weryfikacja kodu TOTP
DELETE /auth/2fa/totp                # Wyłączenie TOTP
GET    /auth/2fa/totp/status         # Status TOTP

POST   /auth/2fa/webauthn/register   # Rozpoczęcie rejestracji passkey
POST   /auth/2fa/webauthn/complete   # Zakończenie rejestracji passkey
POST   /auth/2fa/webauthn/verify     # Weryfikacja passkey
GET    /auth/2fa/webauthn/passkeys   # Lista passkeys
DELETE /auth/2fa/webauthn/passkeys/:id  # Usunięcie passkey

GET    /auth/2fa/status              # Status wszystkich metod 2FA
POST   /auth/2fa/verify              # Weryfikacja 2FA (login flow)
```

### 3. Validation Schemas (`validation/`)

#### `totp.schema.ts`
```typescript
export const totpVerifySchema = z.object({
  code: z.string()
    .length(6, 'Code must be 6 digits')
    .regex(/^\d{6}$/, 'Code must contain only digits')
})

export const totpSetupSchema = z.object({
  // Setup nie wymaga walidacji (serwer generuje secret)
})
```

#### `webauthn.schema.ts`
```typescript
export const passkeyNameSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters')
})
```

### 4. Composables

#### `useTwoFactor.ts`
- Główny composable do zarządzania stanem 2FA
- TanStack Query dla fetchów
- Mutacje dla enable/disable/verify

#### `useTotp.ts`
- Specjalizowany composable dla TOTP
- Funkcje: setup, verify, disable
- QR code generation (via vue-use)

#### `useWebAuthn.ts`
- Specjalizowany composable dla WebAuthn
- Funkcje: register, verify, list, delete
- Wrapper dla Web Authentication API

### 5. Komponenty UI

#### `TotpQrCode.vue`
- Wyświetla QR code używając biblioteki `qrcode` (lub podobnej)
- Format: `otpauth://totp/{app_name}:{email}?secret={secret}&issuer={app_name}`
- Pokazuje secret jako tekst (backup)
- Kopiowanie do schowka (można użyć `useClipboard` z `@vueuse/core`)
- Można użyć composable `useQRCode` jako wrapper nad biblioteką QR code

#### `TotpSetupForm.vue`
- Formularz konfiguracji TOTP
- Kroki:
  1. Pokazanie QR code
  2. Weryfikacja pierwszego kodu
  3. Wyświetlenie backup codes

#### `TotpVerifyForm.vue`
- Formularz weryfikacji podczas logowania
- Pole na 6-cyfrowy kod
- Auto-submit po wpisaniu 6 cyfr

#### `WebAuthnRegisterForm.vue`
- Formularz dodawania passkey
- Pole na nazwę (np. "iPhone", "Laptop")
- Przycisk "Register Passkey" uruchamiający WebAuthn API

#### `WebAuthnVerifyForm.vue`
- Formularz weryfikacji passkey podczas logowania
- Przycisk "Use Passkey" uruchamiający WebAuthn API

#### `PasskeyList.vue`
- Tabela/list zarejestrowanych passkeys
- Kolumny: Nazwa, Data utworzenia, Ostatnie użycie, Akcje (Usuń)
- Empty state gdy brak passkeys

### 6. Pages

#### `TwoFactorSetupPage.vue`
- Strona konfiguracji 2FA w ustawieniach
- Sekcje:
  - TOTP Setup (z `TotpSetupForm`)
  - WebAuthn Setup (z `WebAuthnRegisterForm` i `PasskeyList`)
- Status każdej metody (enabled/disabled)
- Przełączniki enable/disable

#### `TwoFactorVerifyPage.vue`
- Strona weryfikacji podczas logowania
- Wybór metody (TOTP lub WebAuthn)
- Renderuje odpowiedni formularz weryfikacji
- Redirect po udanej weryfikacji

### 7. Guards

#### `twoFactorGuard.ts`
- Sprawdza czy użytkownik ma włączone 2FA
- Jeśli tak, przekierowuje do `TwoFactorVerifyPage`
- Integracja z `authGuard`:
  - Po udanym login → sprawdź 2FA status
  - Jeśli 2FA wymagane → redirect do verify
  - Po verify → kontynuuj do docelowej trasy

#### Modyfikacja `authGuard.ts`
- Po udanym login sprawdź czy user ma 2FA enabled
- Jeśli tak, zapisz informację o potrzebie weryfikacji
- `twoFactorGuard` obsłuży weryfikację

### 8. Routes

#### Dodanie do `modules/auth/config/routes.ts`
```typescript
export const AuthRoutePaths = {
  // ... istniejące
  twoFactorSetup: '/settings/security/two-factor',
  twoFactorVerify: '/auth/2fa/verify',
}

export const AuthRouteNames = {
  // ... istniejące
  TwoFactorSetup: 'TwoFactorSetup',
  TwoFactorVerify: 'TwoFactorVerify',
}
```

#### Modyfikacja `modules/settings/routes.ts`
```typescript
export const settingsRoutes = [
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@registry/modules/settings/pages/SettingsPage.vue'),
    children: [
      {
        path: 'security',
        name: 'SettingsSecurity',
        component: () => import('@registry/modules/auth/pages/TwoFactorSetupPage.vue'),
      }
    ]
  }
]
```

### 9. i18n Translations

#### Rozszerzenie `modules/auth/i18n/locales/en.ts`
```typescript
export const authEn = {
  auth: {
    // ... istniejące
    two_factor: {
      title: 'Two-Factor Authentication',
      subtitle: 'Add an extra layer of security to your account',
      totp: {
        title: 'Authenticator App (TOTP)',
        description: 'Use an authenticator app like Google Authenticator',
        setup: 'Set up Authenticator',
        verify: 'Enter 6-digit code',
        disable: 'Disable TOTP',
        enabled: 'TOTP is enabled',
        disabled: 'TOTP is disabled',
        qr_code: 'Scan QR code',
        secret: 'Secret key',
        backup_codes: 'Backup codes',
        // ...
      },
      webauthn: {
        title: 'Passkeys',
        description: 'Use biometric authentication or security keys',
        register: 'Register Passkey',
        verify: 'Use Passkey',
        passkey_name: 'Passkey name',
        passkey_name_placeholder: 'e.g., iPhone, Laptop',
        no_passkeys: 'No passkeys registered',
        last_used: 'Last used',
        delete: 'Delete',
        // ...
      },
      verify_page: {
        title: 'Verify Your Identity',
        subtitle: 'Please verify using one of your 2FA methods',
        choose_method: 'Choose verification method',
        // ...
      }
    }
  }
}
```

### 10. Mock Service (`services/mockTwoFactorService.ts`)

#### Implementacja dla Demo
- Symulacja TOTP: generowanie secret, QR code (via vue-use), backup codes
- Symulacja WebAuthn: mockowanie Web Authentication API
- Storage w localStorage/memory dla passkeys
- Opóźnienia sieciowe (delay)

### 11. Store Updates

#### Rozszerzenie `useAuthStore.ts`
```typescript
interface AuthState {
  // ... istniejące
  twoFactorRequired?: boolean      // Czy wymagana weryfikacja 2FA
  twoFactorVerified?: boolean      // Czy 2FA zostało zweryfikowane w tej sesji
}
```

### 12. Registry Items Structure

#### Proponowane Registry Items

1. **`two-factor-types`** (registry:lib)
   - `modules/auth/types/twoFactor.type.ts`

2. **`two-factor-service`** (registry:lib)
   - `modules/auth/services/twoFactorService.ts`
   - Dependencies: `http-client`, `two-factor-types`

3. **`two-factor-validation`** (registry:lib)
   - `modules/auth/validation/totp.schema.ts`
   - `modules/auth/validation/webauthn.schema.ts`
   - Dependencies: `zod`

4. **`two-factor-composables`** (registry:lib)
   - `modules/auth/composables/useTwoFactor.ts`
   - `modules/auth/composables/useTotp.ts`
   - `modules/auth/composables/useWebAuthn.ts`
   - Dependencies: `@tanstack/vue-query`, `two-factor-service`, `two-factor-types`

5. **`two-factor-components`** (registry:ui)
   - Wszystkie komponenty UI (TotpSetupForm, TotpVerifyForm, etc.)
   - Dependencies: `form`, `input`, `button`, `qrcode` (via vue-use)

6. **`two-factor-pages`** (registry:page)
   - `TwoFactorSetupPage.vue`
   - `TwoFactorVerifyPage.vue`
   - Dependencies: `two-factor-components`, `layouts`

7. **`two-factor-guards`** (registry:lib)
   - `modules/auth/guards/twoFactorGuard.ts`
   - Dependencies: `auth-store`, `two-factor-service`

8. **`two-factor-config`** (registry:lib)
   - `modules/auth/config/twoFactor.config.ts`
   - Routes extensions

9. **`two-factor-i18n`** (registry:lib)
   - Rozszerzenie `modules/auth/i18n/locales/{en,pl}.ts`

10. **`twoFactorFeat`** (registry:bundle)
    - Bundle wszystkich powyższych (bez UI)

11. **`twoFactorFull`** (registry:bundle)
    - Bundle z UI (komponenty + strony)

## Pytania i Wątpliwości

### 1. Struktura Modułu
- **Pytanie**: Czy 2FA powinno być osobnym modułem (`modules/twoFactor/`) czy częścią `modules/auth/`?
- **Rekomendacja**: Część `modules/auth/` - 2FA jest ściśle związane z autentykacją

### 2. Integracja z Settings
- **Pytanie**: Czy strona konfiguracji 2FA powinna być pod `/settings/security` czy `/auth/2fa/setup`?
- **Rekomendacja**: `/settings/security` - lepiej pasuje do struktury Settings, ale możemy mieć też route w auth dla kompletności

### 3. WebAuthn Implementation
- **Pytanie**: Czy używać biblioteki jak `@simplewebauthn/browser` czy natywne Web Authentication API?
- **Rekomendacja**: Sprawdzić czy natywne API wystarczy, jeśli nie - użyć biblioteki

### 4. QR Code Generation
- **Pytanie**: Która biblioteka do QR code? (`@vueuse/core` już w projekcie, ale nie ma wbudowanego QR code)
- **Rekomendacja**: Użyć biblioteki `qrcode` (npm) lub `qrcode-generator` + wrapper composable. Alternatywnie `qrcode.vue` jeśli preferujemy komponent Vue.
- **Note**: `@vueuse/core` v13.9.0 jest już w dependencies, ale nie zawiera QR code utility. Potrzebna dodatkowa biblioteka.

### 5. Backup Codes
- **Pytanie**: Czy backup codes mają być generowane automatycznie podczas setup TOTP?
- **Rekomendacja**: Tak, wygenerować 10 jednorazowych kodów

### 6. Session Management
- **Pytanie**: Jak zarządzać sesją po weryfikacji 2FA? Czy wystarczy flaga w store?
- **Rekomendacja**: Flaga w store + sprawdzanie w guard, timeout sesji (np. 30 min)

### 7. Required vs Optional 2FA
- **Pytanie**: Czy 2FA ma być zawsze opcjonalne, czy może być wymagane przez admina?
- **Rekomendacja**: Na początku opcjonalne, później można dodać wymuszanie przez config

### 8. Multiple Passkeys
- **Pytanie**: Czy limitować liczbę passkeys na użytkownika?
- **Rekomendacja**: Nie limitować, ale pokazać ostrzeżenie przy dużej liczbie (np. >10)

### 9. TOTP Secret Storage
- **Pytanie**: Czy secret TOTP ma być przechowywany po stronie serwera (backend)?
- **Rekomendacja**: Tak, backend przechowuje secret, frontend tylko pokazuje QR code podczas setup

### 10. WebAuthn Server-side
- **Pytanie**: Czy planujemy implementację backend dla WebAuthn?
- **Rekomendacja**: Mock service na razie, ale API powinno być gotowe na integrację z backendem

## Zależności NPM

### Nowe zależności
- `qrcode` lub `qrcode-generator` - dla generowania QR code (TOTP)
- Ewentualnie `@simplewebauthn/browser` - jeśli potrzebne dla WebAuthn (natywne API może wystarczyć)
- Typy: `@types/qrcode` (jeśli używamy `qrcode`)

### Istniejące zależności (już w projekcie)
- `@vueuse/core` v13.9.0 - już zainstalowane (może być użyteczne dla innych utilities)
- `@tanstack/vue-query` - dla composables
- `vee-validate` + `zod` - dla walidacji
- `vue-router` - dla routes i guards
- `pinia` - dla store
- `axios` - dla API calls

## Kroki Implementacji (Kolejność)

1. **Faza 1: Fundamenty**
   - Typy TypeScript (`twoFactor.type.ts`)
   - Service interfaces (`ITwoFactorService`)
   - Validation schemas
   - Mock service (podstawowy)

2. **Faza 2: TOTP**
   - TOTP service implementation
   - QR code component
   - TOTP setup form
   - TOTP verify form
   - Composables dla TOTP

3. **Faza 3: WebAuthn**
   - WebAuthn service implementation
   - Passkey registration form
   - Passkey verify form
   - Passkey list component
   - Composables dla WebAuthn

4. **Faza 4: Integracja**
   - TwoFactorSetupPage
   - TwoFactorVerifyPage
   - Guards (twoFactorGuard + modyfikacja authGuard)
   - Routes configuration

5. **Faza 5: Settings Integration**
   - SecuritySettings component
   - Rozszerzenie SettingsPage
   - Routes w settings module

6. **Faza 6: i18n**
   - Tłumaczenia EN/PL
   - Aktualizacja i18n exports

7. **Faza 7: Registry Items**
   - Tworzenie registry items w `registry.json`
   - Definiowanie dependencies
   - Testowanie instalacji przez CLI

8. **Faza 8: Demo App**
   - Integracja w `src/`
   - Mock service w demo
   - Testowanie wszystkich flow

## Uwagi Techniczne

### QR Code Format (TOTP)
```
otpauth://totp/{Issuer}:{AccountName}?secret={Secret}&issuer={Issuer}&algorithm=SHA1&digits=6&period=30
```

### WebAuthn Flow
1. Frontend: Request challenge do backend
2. Backend: Zwraca `PublicKeyCredentialCreationOptions`
3. Frontend: Wywołuje `navigator.credentials.create()`
4. Frontend: Wysyła credential do backend
5. Backend: Weryfikuje i zapisuje passkey

### Security Considerations
- TOTP secret nie powinien być logowany
- Backup codes powinny być hashowane po stronie backend
- WebAuthn credentials są przechowywane przez przeglądarkę (nie przez nas)
- Rate limiting dla verify endpoints
- Session timeout po weryfikacji 2FA

## Test Cases

### TOTP
- ✅ Setup TOTP (generowanie secret + QR)
- ✅ Weryfikacja poprawnego kodu
- ✅ Odrzucenie niepoprawnego kodu
- ✅ Wyłączenie TOTP
- ✅ Backup codes (generowanie i użycie)

### WebAuthn
- ✅ Rejestracja passkey z nazwą
- ✅ Weryfikacja passkey
- ✅ Lista passkeys
- ✅ Usunięcie passkey
- ✅ Obsługa wielu passkeys

### Integration
- ✅ Login flow z 2FA (TOTP)
- ✅ Login flow z 2FA (WebAuthn)
- ✅ Setup 2FA w settings
- ✅ Guard redirect gdy 2FA wymagane
- ✅ Session management po verify

## Dokumentacja

Po implementacji należy zaktualizować:
- `README.md` - opis funkcji 2FA
- `CHANGELOG.md` - lista zmian
- `docs/GUIDELINES.md` - wzorce użycia 2FA
- Ewentualnie osobny `docs/2FA_GUIDE.md` - szczegółowy przewodnik

## Podsumowanie

### Zakres Funkcjonalności

✅ **TOTP (Authenticator App)**
- Setup z QR code
- Weryfikacja 6-cyfrowych kodów
- Backup codes (10 jednorazowych)
- Enable/Disable

✅ **WebAuthn (Passkeys)**
- Rejestracja wielu passkeys z nazwami
- Weryfikacja przez Web Authentication API
- Lista i zarządzanie passkeys
- Usuwanie passkeys

✅ **Integracja**
- Strona konfiguracji w Settings (`/settings/security`)
- Strona weryfikacji podczas logowania (`/auth/2fa/verify`)
- Router guards dla wymuszania 2FA
- Mock service dla demo aplikacji

✅ **Registry Items**
- 11 registry items (types, services, validation, composables, components, pages, guards, config, i18n, bundles)
- Pełna modularność i opcjonalność komponentów

### Kluczowe Decyzje Do Podjęcia

1. ✅ Struktura: 2FA jako część `modules/auth/` (nie osobny moduł)
2. ⚠️ Routes: `/settings/security` dla setup (z możliwością `/auth/2fa/setup`)
3. ⚠️ WebAuthn: Natywne API vs biblioteka (`@simplewebauthn/browser`)
4. ⚠️ QR Code: Biblioteka `qrcode` + wrapper composable
5. ✅ Backup Codes: Automatyczne generowanie 10 kodów
6. ✅ Session: Flaga w store + timeout 30 min
7. ✅ Required: Na początku opcjonalne
8. ✅ Passkeys: Brak limitu (z ostrzeżeniem przy >10)

### Szacunkowa Złożoność

- **TOTP**: Średnia (QR code, walidacja kodów, backup codes)
- **WebAuthn**: Wysoka (Web Authentication API, credential management)
- **Integracja**: Średnia (guards, routes, settings)
- **Mock Service**: Niska (symulacja, ale wymaga zrozumienia flow)

### Następne Kroki

1. Przejrzeć plan i odpowiedzieć na pytania oznaczone ⚠️
2. Potwierdzić wybór bibliotek (QR code, WebAuthn)
3. Rozpocząć implementację od Fazy 1 (Fundamenty)
4. Testować każdą fazę przed przejściem do następnej
