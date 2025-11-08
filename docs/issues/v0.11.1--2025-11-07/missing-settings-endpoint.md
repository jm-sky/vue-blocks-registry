# Brakujący endpoint `/settings/me` w backendzie

## Problem

Frontend używa endpointu `/settings/me` w `settingsService.ts`, ale taki endpoint nie istnieje w backendzie:

```typescript
// frontend/src/modules/settings/services/settingsService.ts
async getSettings(): Promise<Settings> {
  const response = await apiClient.get<Settings>('/settings/me')
  return response.data
}

async updateSettings(data: UpdateSettingsData): Promise<Settings> {
  const response = await apiClient.patch<Settings>('/settings/me', data)
  return response.data
}
```

**Brakujący endpoint**: `/api/settings/me` (GET i PATCH)

## Analiza

### Co próbuje robić frontend

Frontend próbuje pobrać i zaktualizować preferencje użytkownika:
- `darkMode: boolean` - preferencja motywu (light/dark)
- `locale: SupportedLocale` - preferencja języka (en/pl)

### Co jest dostępne w backendzie

W backendzie nie ma modułu `settings`. Dostępne są:
- `/api/auth/me` - informacje o zalogowanym użytkowniku (auth module)
- `/api/users/me` - informacje o zalogowanym użytkowniku (users module)

### Problem z endpointem `/settings/me`

1. **Niespójność z konwencją REST**: Zwykle używa się `/users/me` dla danych użytkownika
2. **Brak modułu settings**: W backendzie nie ma modułu `settings`
3. **Preferencje użytkownika**: `darkMode` i `locale` to preferencje, które mogą być:
   - Przechowywane w localStorage (frontend-only)
   - Przechowywane w bazie danych (backend)
   - Przechowywane w tokenie JWT (niezalecane)

## Rozwiązania

### Opcja 1: Przechowywanie w localStorage (Frontend-only)

**Zalety:**
- Proste w implementacji
- Nie wymaga backendu
- Szybkie (brak requestów do API)
- Nie obciąża bazy danych

**Wady:**
- Preferencje nie są synchronizowane między urządzeniami
- Preferencje są tracone przy czyszczeniu cache

**Implementacja:**
```typescript
// frontend/src/modules/settings/services/settingsService.ts
class SettingsService implements ISettingsService {
  async getSettings(): Promise<Settings> {
    // Pobierz z localStorage
    const darkMode = localStorage.getItem('darkMode') === 'true'
    const locale = (localStorage.getItem('locale') || 'en') as SupportedLocale
    return { darkMode, locale }
  }

  async updateSettings(data: UpdateSettingsData): Promise<Settings> {
    // Zapisz do localStorage
    if (data.darkMode !== undefined) {
      localStorage.setItem('darkMode', String(data.darkMode))
    }
    if (data.locale !== undefined) {
      localStorage.setItem('locale', data.locale)
    }
    return this.getSettings()
  }
}
```

### Opcja 2: Dodanie modułu settings w backendzie

**Zalety:**
- Preferencje synchronizowane między urządzeniami
- Możliwość rozszerzenia o więcej preferencji
- Spójność z architekturą modularną

**Wady:**
- Wymaga implementacji modułu w backendzie
- Wymaga migracji bazy danych
- Dodatkowe requesty do API

**Implementacja backend:**
```python
# backend/app/modules/settings/router.py
router = APIRouter()

@router.get("/me", response_model=SettingsResponse)
async def get_settings(current_user: CurrentUser, repo: SettingsRepository):
    settings = await repo.get_user_settings(current_user.id)
    return SettingsResponse(**settings.to_response())

@router.patch("/me", response_model=SettingsResponse)
async def update_settings(
    data: UpdateSettingsRequest,
    current_user: CurrentUser,
    repo: SettingsRepository
):
    settings = await repo.update_user_settings(current_user.id, data)
    return SettingsResponse(**settings.to_response())
```

**Model bazy danych:**
```python
class UserSettingsDB(Base):
    __tablename__ = "user_settings"
    
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), primary_key=True)
    dark_mode: Mapped[bool] = mapped_column(Boolean, default=False)
    locale: Mapped[str] = mapped_column(String(10), default="en")
    created_at: Mapped[datetime] = ...
    updated_at: Mapped[datetime] = ...
```

### Opcja 3: Rozszerzenie endpointu `/users/me`

**Zalety:**
- Wykorzystuje istniejącą infrastrukturę
- Mniej endpointów do utrzymania
- Spójność z konwencją REST

**Wady:**
- Mieszanie danych użytkownika z preferencjami
- Wymaga rozszerzenia modelu UserDB

**Implementacja:**
```python
# Rozszerzenie UserDB
class UserDB(Base):
    # ... existing fields
    dark_mode: Mapped[bool] = mapped_column(Boolean, default=False)
    locale: Mapped[str] = mapped_column(String(10), default="en")

# Rozszerzenie endpointu
@router.patch("/users/me", response_model=UserResponse)
async def update_current_user(
    data: UserUpdate,  # Dodaj darkMode i locale
    current_user: CurrentUser,
    repo: UserRepository
):
    user = await repo.update_user(current_user.id, data)
    return UserResponse(**user.to_response())
```

## Rekomendacja dla vue-blocks-registry

### Dla frontend:

1. **Domyślnie używać localStorage** (Opcja 1) - to najprostsze rozwiązanie dla preferencji UI
2. **Dodać możliwość konfiguracji** - pozwolić użytkownikowi wybrać czy preferencje mają być synchronizowane z backendem
3. **Dokumentować** - jasno wskazać, że domyślnie preferencje są przechowywane w localStorage

### Dla fastapi-blocks-registry:

1. **Rozważyć dodanie modułu `settings`** - jeśli preferencje mają być synchronizowane między urządzeniami
2. **Lub rozszerzyć `/users/me`** - jeśli preferencje są częścią profilu użytkownika
3. **Dokumentować** - jasno wskazać, które endpointy są dostępne i jak ich używać

## Status

⚠️ W toku – przywrócono `settingsService.ts` do korzystania z API (`/settings/me`). Należy dostarczyć backendowy endpoint albo przygotować wariant konfigurowany przez CLI (np. lokalne przechowywanie preferencji) zanim zamkniemy temat.

## Zalecana akcja

**Krótkoterminowo (dla vue-blocks-registry):**
- Zmienić `settingsService.ts` aby używał localStorage zamiast API
- Dodać opcjonalną konfigurację dla synchronizacji z backendem

**Długoterminowo (dla fastapi-blocks-registry):**
- Rozważyć dodanie modułu `settings` lub rozszerzenie `/users/me` o preferencje użytkownika
- Dodać endpoint `/api/settings/me` jeśli preferencje mają być synchronizowane

