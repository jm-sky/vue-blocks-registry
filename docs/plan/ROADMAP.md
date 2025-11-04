# ROADMAP - Vue Blocks Registry

## Przegląd
Lista funkcji i pomysłów do przyszłej implementacji. Funkcje są pogrupowane tematycznie i zawierają szczegóły techniczne oraz wymagania.

---

## 🔐 Multi-Tenancy

### Opis
System wielodostępowy, gdzie jeden użytkownik może mieć dostęp do wielu tenantów (organizacji/przestrzeni roboczych). User może przełączać się między tenantami.

### Komponenty do implementacji

#### 1. Tenant Module (`registry/features/tenantFeat/`)
- **Struktura:**
  ```
  tenantFeat/
  ├─ lib/
  │  ├─ tenantApiClient.ts        # API client z tenant context (opcjonalnie, jeśli używasz header)
  │  └─ jwtDecoder.ts             # Utility do dekodowania JWT (używa jwt-decode)
  ├─ types/
  │  └─ tenant.types.ts           # Tenant, TenantUser, TenantMembership types
  ├─ stores/
  │  └─ tenantStore.ts            # Stan aktualnego tenant, lista tenantów użytkownika
  ├─ services/
  │  ├─ tenantService.ts          # CRUD operacje na tenantach
  │  └─ tenantMembershipService.ts # Zarządzanie członkami tenant
  ├─ composables/
  │  ├─ useTenant.ts              # Główny composable do pracy z tenant
  │  │                            # - Odczytuje tid (tenantId) z JWT (dekodowanie)
  │  │                            # - Zwraca currentTenant z store
  │  │                            # - Zwraca tenantRole z JWT (pole `trol`)
  │  └─ useTenantSwitch.ts        # Logika przełączania tenantów
  │                               # - Wywołuje switchTenant service
  │                               # - Aktualizuje token w authStore
  ├─ utils/
  │  └─ queryUtils.ts             # Tanstack Query utilities (query keys, retry functions)
  ├─ pages/
  │  └─ SelectTenantPage.vue      # Strona wyboru tenant (lista kafelków z wyszukiwarką)
  ├─ components/
  │  ├─ TenantGrid.vue            # Komponent z listą tenantów jako kafelki z wyszukiwarką
  │  └─ TenantCard.vue            # Karta tenant z logo, nazwą, opisem
  ├─ routes/
  │  └─ tenantRoutes.ts           # Routes dla tenant (np. /select-tenant)
  ├─ index.ts
  └─ README.md
  ```
  
- **Tanstack Query:** Używany w composables do fetchowania danych o tenantach (np. `useQuery` w `useTenant`, `useMutation` w `useTenantSwitch`)

#### 2. Tenant Grid Component (`registry/features/tenantFeat/components/TenantGrid.vue`)
- Komponent z listą tenantów użytkownika jako kafelki
- Z wyszukiwarką do filtrowania tenantów
- Kliknięcie w kafelek wybiera tenant i przełącza kontekst
- Może być używany jako standalone component lub w SelectTenantPage
- Integracja z `tenantStore` i `useTenantSwitch`

#### 3. Tenant Store (`registry/features/tenantFeat/stores/tenantStore.ts`)
- Stan:
  - `currentTenant: Tenant | null` - aktualnie wybrany tenant (może być cache'owany z JWT)
  - `availableTenants: Tenant[]` - lista tenantów użytkownika
  - `tenantMembership: TenantMembership | null` - rola użytkownika w tenant
- Actions:
  - `setTenant(tenant: Tenant)` - ustaw aktualny tenant (z API response)
  - `loadUserTenants()` - załaduj tenanty użytkownika
  - `switchTenant(tenantId: string)` - przełącz tenant
    - Wywołuje `tenantService.switchTenant(tenantId)`
    - Otrzymuje nowy JWT token z backend
    - Aktualizuje token w `authStore` (integracja z `authFeat`)
    - Aktualizuje `currentTenant` w tenantStore
    - Może dekodować JWT do weryfikacji `tid` (tenantId) i `trol` (tenantRole)

#### 4. Tenant Service (`registry/features/tenantFeat/services/tenantService.ts`)
- API methods:
  - `getTenants()` - pobierz listę tenantów użytkownika
  - `getTenant(tenantId: string)` - pobierz szczegóły tenant
  - `createTenant(data: CreateTenantDto)` - utwórz nowy tenant
  - `updateTenant(tenantId: string, data: UpdateTenantDto)` - aktualizuj tenant
  - `switchTenant(tenantId: string)` - przełącz aktualny tenant
    - Backend zwraca nowy JWT token z `tenantId` w payload
    - Frontend powinien zaktualizować token w `authStore` (integracja z `authFeat`)
    - Returns: `{ token: string, tenant: Tenant }`

#### 5. Types (`registry/features/tenantFeat/types/tenant.types.ts`)
```typescript
import type { TDateTime, TULID } from '@registry/shared/types/base.type'

interface Tenant {
  id: TULID
  name: string
  slug: string              // URL-friendly identyfikator
  externalId?: string       // ID zewnętrzny (np. z innego systemu)
  businessIdentifier?: string // Ogólne pole dla friendly ID (np. taxId, vatId, NIP, etc.)
                             // TODO: Do ustalenia - może być bardziej specyficzne pole
  logo?: string
  description?: string
  isActive: boolean         // status aktywności tenant
  createdAt: TDateTime
  updatedAt: TDateTime
}

interface TenantUser {
  id: TULID
  tenantId: TULID
  userId: TULID
  role: TenantRole
  joinedAt: TDateTime
}

enum TenantRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer'
}

interface TenantMembership {
  tenant: Tenant
  role: TenantRole
  permissions: string[]
}
```

### Zależności
- **Wymaga `authFeat`** - użytkownik musi być zalogowany
  - Integracja z `authStore` do zarządzania JWT tokenem
  - `tenantFeat` aktualizuje token w `authStore` przy switch tenant
  - `useTenant()` dekoduje JWT z `authStore.token`
- Może wymagać `userProfileFeat` - informacje o użytkowniku
- Biblioteka `jwt-decode` - do dekodowania JWT na frontend

### Integracje
- **Tenant Context w JWT Token** (Rekomendowane):
  - `tenantId` w payload JWT token jako claim
  - Przy przełączaniu tenant, backend wydaje nowy token z aktualnym `tenantId`
  - Token automatycznie przekazywany w `Authorization` header (już zaimplementowane w `authInterceptor`)
  - Frontend może dekodować JWT do weryfikacji aktualnego tenant (bez decode: biblioteka `jwt-decode`)
  
  **Struktura JWT payload (kompaktowa):**
  ```typescript
  {
    sub: string,        // userId
    email: string,
    tid: string,        // tenantId - aktualny tenant context (skrócona nazwa)
    trol: string,       // tenantRole - rola użytkownika w tenant (owner, admin, member, viewer)
    iat: number,
    exp: number
  }
  ```
  
  **Proces przełączania tenant:**
  1. User wybiera tenant z listy
  2. Frontend wywołuje `tenantService.switchTenant(tenantId)`
  3. Backend weryfikuje dostęp użytkownika do tenant
  4. Backend wydaje nowy JWT z `tenantId` w payload
  5. Frontend aktualizuje token w `authStore` i localStorage
  6. Wszystkie kolejne requesty automatycznie zawierają nowy tenant context

- **Alternatywne podejście** (jeśli nie chcemy wydawać nowych tokenów):
  - Header `X-Tenant-ID` dodawany przez `tenantInterceptor`
  - Tenant context w `tenantStore` (localStorage lub sessionStorage)
  - Wymaga synchronizacji między store a interceptor

- Routing może wymagać tenant context w URL (`/:tenantSlug/...`) dla SEO/user experience
- Middleware/router guard do weryfikacji dostępu do tenant
- API client interceptor powinien automatycznie dodawać tenant context do requestów

---

## 🔑 OAuth

### Opis
Integracja z OAuth 2.0 / OpenID Connect dla logowania przez zewnętrzne serwisy.

### Priorytety implementacji providerów
1. **Google OAuth** (P0 - pierwszy priorytet)
2. **GitHub OAuth** (P0 - drugi priorytet)
3. **Microsoft, Apple, inne** (P2 - opcjonalnie, może kiedyś)

### Komponenty do implementacji

#### 1. OAuth Feature (`registry/features/oauthFeat/`)
- **Struktura:**
  ```
  oauthFeat/
  ├─ lib/
  │  ├─ oauthClient.ts            # OAuth 2.0 client logic
  │  └─ providers/
  │     ├─ google.ts              # Google OAuth provider (P0 - pierwszy)
  │     ├─ github.ts              # GitHub OAuth provider (P0 - drugi)
  │     ├─ microsoft.ts           # Microsoft OAuth provider (P2 - opcjonalnie)
  │     ├─ apple.ts               # Apple OAuth provider (P2 - opcjonalnie)
  │     └─ generic.ts             # Generic OAuth provider (dla custom providers)
  ├─ types/
  │  └─ oauth.types.ts            # OAuthProvider, OAuthConfig types
  ├─ services/
  │  └─ oauthService.ts           # OAuth flow management
  ├─ composables/
  │  ├─ useOAuth.ts               # Główny composable do OAuth
  │  └─ useOAuthCallback.ts       # Obsługa OAuth callback
  ├─ index.ts
  └─ README.md
  ```
  
- **Plan implementacji:**
  1. Najpierw Google OAuth (najpopularniejszy, dobre dokumentacja)
  2. Potem GitHub OAuth (popularny wśród developerów)
  3. Inne providerzy - dodawać w miarę potrzeb (Microsoft, Apple, etc.)

#### 2. OAuth Buttons (`registry/components/auth/OAuthButton.vue`)
- Przeużywalny przycisk do logowania przez OAuth
- Wspiera różne providerów
- Props: `provider` (OAuthProvider enum), `label`, `icon`
- **Implementacja:**
  - Najpierw dla Google (z oficjalnym logo/ikoną)
  - Potem dla GitHub (z oficjalnym logo/ikoną)
  - Inne providerzy - dodawać w miarę potrzeb

#### 3. OAuth Service (`registry/features/oauthFeat/services/oauthService.ts`)
- Methods:
  - `initiateLogin(provider: OAuthProvider)` - rozpoczyna OAuth flow
  - `handleCallback(code: string, state: string)` - obsługuje callback
  - `refreshToken(refreshToken: string)` - odświeża token
  - `revokeToken(token: string)` - odwołuje token

#### 4. Types (`registry/features/oauthFeat/types/oauth.types.ts`)
```typescript
enum OAuthProvider {
  GOOGLE = 'google',    // P0 - pierwszy priorytet
  GITHUB = 'github',    // P0 - drugi priorytet
  MICROSOFT = 'microsoft', // P2 - opcjonalnie
  APPLE = 'apple'       // P2 - opcjonalnie
}

interface OAuthConfig {
  clientId: string
  redirectUri: string
  scopes: string[]
  state?: string
}

interface OAuthToken {
  accessToken: string
  refreshToken?: string
  expiresIn: number
  tokenType: string
  scope?: string
}
```

### Zależności
- Integracja z `authFeat` - OAuth tokens powinny być zarządzane przez auth store
- Może wymagać PKCE flow dla lepszego bezpieczeństwa

### Integracje
- **Backend endpoints:**
  - `/auth/oauth/google` - inicjuje Google OAuth flow (P0 - pierwszy)
  - `/auth/oauth/github` - inicjuje GitHub OAuth flow (P0 - drugi)
  - `/auth/oauth/:provider/callback` - obsługuje OAuth callback dla wszystkich providerów
- Frontend routing dla `/auth/callback/:provider` (lub `/auth/oauth/callback/:provider`)
- Storage dla OAuth state (session storage) - używany w PKCE flow
- Integracja z `authFeat` - OAuth tokens przekonwertowane na JWT (lub bezpośrednio JWT z backend)

---

## 👨‍💼 Admin Panel

### Opis
Panel administracyjny do zarządzania użytkownikami, tenantami oraz ogólnymi ustawieniami systemu.

### Komponenty do implementacji

#### 1. Admin Panel Bundle (`registry/bundles/adminPanel/`)
- **Struktura:**
  ```
  adminPanel/
  ├─ imports/                      # Linki do adminFeat + adminTenantFeat + UI components
  ├─ layout/
  │  └─ AdminLayout.vue           # Layout dla panelu admin
  ├─ pages/
  │  ├─ AdminDashboard.vue        # Główna strona dashboard
  │  ├─ UserManagement.vue        # Zarządzanie użytkownikami (używa adminFeat)
  │  ├─ TenantManagement.vue      # Zarządzanie tenantami (używa adminTenantFeat)
  │  ├─ Settings.vue              # Ustawienia systemu
  │  └─ AuditLog.vue              # Logi audytu
  ├─ components/
  │  ├─ UserTable.vue             # Tabela użytkowników
  │  ├─ TenantTable.vue           # Tabela tenantów
  │  ├─ UserEditDialog.vue        # Dialog edycji użytkownika
  │  └─ TenantEditDialog.vue      # Dialog edycji tenant
  ├─ routes/
  │  └─ adminRoutes.ts            # Routes dla panelu admin
  ├─ middleware/
  │  └─ adminGuard.ts             # Route guard sprawdzający uprawnienia admin
  ├─ index.ts
  └─ README.md
  ```
- **Zależności:** `adminFeat` (wymagane), `adminTenantFeat` (opcjonalne - jeśli potrzebne zarządzanie tenantami)

#### 2. Admin Feature (`registry/features/adminFeat/`) - User Management
- **Struktura:**
  ```
  adminFeat/
  ├─ services/
  │  └─ adminUserService.ts       # CRUD operacje na użytkownikach (admin)
  ├─ composables/
  │  └─ useAdminUsers.ts          # Composable do zarządzania użytkownikami
  ├─ types/
  │  └─ admin.types.ts            # AdminUserList type
  ├─ index.ts
  └─ README.md
  ```
- **Zależności:** `authFeat` (wymagane), `userFeat` (opcjonalnie)

#### 3. Admin Tenant Feature (`registry/features/adminTenantFeat/`) - Tenant Management
- **Struktura:**
  ```
  adminTenantFeat/
  ├─ services/
  │  └─ adminTenantService.ts     # CRUD operacje na tenantach (admin)
  ├─ composables/
  │  └─ useAdminTenants.ts        # Composable do zarządzania tenantami
  ├─ types/
  │  └─ adminTenant.types.ts      # AdminTenantList type
  ├─ index.ts
  └─ README.md
  ```
- **Zależności:** `adminFeat` (wymagane), `tenantFeat` (wymagane)

#### 5. Admin Guard (`registry/bundles/adminPanel/middleware/adminGuard.ts`)
- Router guard sprawdzający:
  - Czy użytkownik jest zalogowany
  - Czy użytkownik ma `isAdmin: true` (z `User` z auth module)
- Redirect do `/` jeśli brak uprawnień

#### 6. Admin Services

**Admin Feature Services** (`adminFeat/services/adminUserService.ts`):
- `getUsers(filters?)` - lista wszystkich użytkowników (zwraca `AdminUserList[]`)
- `getUser(userId: string)` - szczegóły użytkownika (zwraca `User`)
- `updateUser(userId: string, data: UpdateUserDto)` - aktualizuj użytkownika
- `deleteUser(userId: string)` - usuń użytkownika
- `setUserActive(userId: string, isActive: boolean)` - ustaw aktywność użytkownika
- `setUserAdmin(userId: string, isAdmin: boolean)` - ustaw uprawnienia admin

**Admin Tenant Feature Services** (`adminTenantFeat/services/adminTenantService.ts`):
- `getTenants(filters?)` - lista wszystkich tenantów (zwraca `AdminTenantList[]`)
- `getTenant(tenantId: string)` - szczegóły tenant (zwraca `Tenant`)
- `updateTenant(tenantId: string, data: UpdateTenantDto)` - aktualizuj tenant
- `deleteTenant(tenantId: string)` - usuń tenant
- `setTenantActive(tenantId: string, isActive: boolean)` - ustaw aktywność tenant

#### 4. Types

**Admin Feature Types** (`registry/features/adminFeat/types/admin.types.ts`):
```typescript
// Używamy User z auth module (registry/modules/auth/types/user.type.ts)
// User ma już: isAdmin, isActive, id, email, name, avatar, createdAt
import type { User } from '@registry/modules/auth/types/user.type'
import type { TDateTime } from '@registry/shared/types/base.type'

// Rozszerzenie User dla admin panel (dodatkowe pola tylko dla listy użytkowników)
export interface AdminUserList extends User {
  lastLoginAt?: TDateTime  // dodatkowe pole tylko dla admin listy
}
```

**Admin Tenant Feature Types** (`registry/features/adminTenantFeat/types/adminTenant.types.ts`):
```typescript
// Używamy Tenant z tenantFeat (registry/features/tenantFeat/types/tenant.types.ts)
// Tenant ma już: id, name, slug, externalId, businessIdentifier, logo, description, isActive, createdAt (TDateTime), updatedAt (TDateTime)
import type { Tenant } from '@registry/features/tenantFeat/types/tenant.types'
import type { TDateTime, TULID } from '@registry/shared/types/base.type'

// Rozszerzenie Tenant dla admin panel (dodatkowe pola tylko dla listy tenantów)
export interface AdminTenantList extends Tenant {
  ownerId: TULID        // dodatkowe pole tylko dla admin listy
  memberCount: number   // dodatkowe pole tylko dla admin listy
}
```

**Uwaga:** 
- Używamy `User` z auth module (ma `isAdmin`, `isActive`)
- Nie potrzebujemy osobnego `AdminUser` - tylko `AdminUserList` z dodatkowymi polami dla listy
- `isAdmin` boolean zamiast `role` enum - prostsze, można rozszerzyć później
- `isActive` boolean zamiast status enum - prostsze, można rozszerzyć później
- Tenant też używa `isActive: boolean` zamiast status enum

### Zależności

**Admin Feature (`adminFeat`):**
- **Wymaga `authFeat`** - logowanie i weryfikacja uprawnień
  - Używa `User` type z auth module (`registry/modules/auth/types/user.type.ts`)
  - `User` ma już `isAdmin: boolean` i `isActive: boolean`
  - Admin guard sprawdza `user.isAdmin === true`
- Może używać `userFeat` (opcjonalnie) - jeśli dostępne

**Admin Tenant Feature (`adminTenantFeat`):**
- **Wymaga `adminFeat`** - podstawowe funkcje admin
- **Wymaga `tenantFeat`** - dostęp do typu `Tenant` i funkcji tenant

**Admin Panel Bundle (`adminPanel`):**
- **Wymaga `adminFeat`** - zawsze potrzebne
- **Wymaga `adminTenantFeat`** - opcjonalne (tylko jeśli potrzebne zarządzanie tenantami)
- UI components: Table, Dialog, Form, Button

### Integracje
- Backend API endpoints z prefiksem `/admin/*`
- Role-based access control (RBAC)
- Audit logging dla akcji admin
- Paginacja i filtrowanie dla tabel

---

## 🔗 Zależności między funkcjami

```
adminPanel (bundle)
├── adminFeat (wymagane)
│   └── authFeat (wymagane)
│       └── userFeat (opcjonalnie)
│
└── adminTenantFeat (opcjonalne - jeśli zarządzanie tenantami)
    ├── adminFeat (wymagane)
    │   └── authFeat (wymagane)
    └── tenantFeat (wymagane)
        └── authFeat (wymagane)

tenantFeat (feature - zawiera SelectTenantPage)
└── authFeat (wymagane)

oauthFeat
└── authFeat (integracja z systemem autoryzacji)
```

---

## 📋 Priorytetyzacja

### P0 - Wysoki priorytet (podstawowe funkcje)
1. **Multi-Tenancy** - kluczowa funkcja dla wielu aplikacji SaaS
   - tenantFeat (feature) - zawiera SelectTenantPage, TenantGrid, store, service

2. **OAuth** - standardowa integracja autoryzacji
   - oauthFeat (feature) - **najpierw Google, potem GitHub**
   - OAuth buttons (components) - Google i GitHub
   - OAuth service z PKCE flow

### P1 - Średni priorytet (rozszerzone funkcje)
3. **Admin Panel** - zarządzanie systemem
   - adminFeat (feature) - user management
   - adminPanel (bundle) - kompletny panel admin
   
4. **Admin Tenant** - zarządzanie tenantami (jeśli multi-tenancy)
   - adminTenantFeat (feature) - tenant management
   - Integracja z adminPanel bundle

### P2 - Niski priorytet (nice to have)
- **Dodatkowe OAuth providers** (Microsoft, Apple, etc.)
- Audit logging dla admin panel
- Zaawansowane filtry i wyszukiwanie w admin panel
- Bulk operations (bulk delete, bulk update)
- Export danych (CSV, Excel)

---

## 📝 Uwagi implementacyjne

### Multi-Tenancy
- **Tenant Context w JWT** (Rekomendowane):
  - `tenantId` w JWT payload - bezpieczne, automatyczne, standardowe
  - Przy każdym switch tenant - nowy token (może wymagać refresh token strategy)
  - Frontend dekoduje JWT do odczytu `tid` (tenantId, biblioteka `jwt-decode`)
  - Backend zawsze weryfikuje `tid` z JWT przed dostępem do danych
  
- **Backend Requirements:**
  - Row-level security (RLS) - każdy query filtrowany przez `tenantId` z JWT
  - Middleware do ekstrakcji `tenantId` z JWT i dodania do request context
  - Weryfikacja dostępu użytkownika do tenant przed wydaniem tokenu
  - Endpoint `/auth/switch-tenant` zwracający nowy JWT
  
- **Frontend Implementation:**
  - `tenantStore` może cache'ować `tid` (tenantId) z dekodowanego JWT
  - `useTenant()` composable dekoduje JWT do odczytu aktualnego tenant (pole `tid`)
  - Tenant switch endpoint zwraca nowy token, który jest zapisywany w `authStore`
  
- Routing może używać tenant slug w URL (`/:tenantSlug/...`) dla lepszego UX, ale tenant context wciąż z JWT
- Migration strategy dla istniejących aplikacji bez multi-tenancy - wymaga dodania `tenantId` do wszystkich tabel

### OAuth
- **Implementacja etapowa:**
  - Etap 1: Google OAuth (najpierw)
  - Etap 2: GitHub OAuth (potem)
  - Etap 3+: Inne providerzy w miarę potrzeb
  
- **Techniczne wymagania:**
  - Wsparcie dla PKCE flow (dla mobile/SPA security) - wymagane dla Google/GitHub
  - Secure storage dla OAuth tokens (integracja z authStore/JWT)
  - Error handling dla failed OAuth flows
  - Support dla multiple OAuth providers jednocześnie (wszystkie aktywne jednocześnie)
  
- **Backend requirements:**
  - Endpoint `/auth/oauth/:provider` - inicjuje OAuth flow
  - Endpoint `/auth/oauth/:provider/callback` - obsługuje OAuth callback
  - Backend powinien wspierać Google i GitHub OAuth na starcie
  - Możliwość łatwego dodania nowych providerów w przyszłości

### Admin Panel
- **Architektura modułów:**
  - `adminFeat` - niezależny feature do zarządzania użytkownikami (zależny od `authFeat`)
  - `adminTenantFeat` - feature do zarządzania tenantami (zależny od `adminFeat` + `tenantFeat`)
  - `adminPanel` bundle - łączy oba features w kompletny panel admin
  - Można użyć `adminFeat` bez `adminTenantFeat` jeśli nie potrzebne zarządzanie tenantami
  
- **Typy danych:**
  - Używamy `User` z auth module (ma `isAdmin`, `isActive`) - nie duplikujemy typów
  - `AdminUserList` rozszerza `User` tylko o dodatkowe pola dla listy (np. `lastLoginAt`)
  - Używamy `Tenant` z tenantFeat (ma `slug`, `isActive`, `externalId`, `businessIdentifier`) - nie duplikujemy typów
  - `AdminTenantList` rozszerza `Tenant` tylko o dodatkowe pola dla listy (np. `ownerId`, `memberCount`)
  - `isAdmin: boolean` i `isActive: boolean` zamiast enumów - prostsze, można rozszerzyć później
  - `slug` w Tenant - URL-friendly identyfikator (zachowany)
  - `businessIdentifier` w Tenant - ogólne pole dla friendly ID (np. taxId, vatId, NIP), do ustalenia
  
- Security: wszystkie admin endpoints muszą mieć proper authorization (sprawdzenie `isAdmin`)
- Audit trail: logowanie wszystkich akcji admin
- Rate limiting dla admin endpoints
- UI powinien być responsive i dostępny (a11y)

---

## 🎯 Następne kroki

1. Zdefiniować szczegóły techniczne każdej funkcji
2. Stworzyć issue/tasks w systemie zarządzania projektem
3. Określić backend requirements dla każdej funkcji
4. Zaprojektować API contracts
5. Rozpocząć implementację zgodnie z priorytetami

---

_Last updated: 2025-11-04_
