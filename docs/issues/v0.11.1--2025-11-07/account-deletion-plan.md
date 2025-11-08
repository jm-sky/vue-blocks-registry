# Plan implementacji usuwania konta użytkownika

## Status obecny

✅ **Frontend** - **Zaimplementowane**:
- Komponent `DeleteAccountCard.vue` w `src/modules/settings/components/`
- Composable `useDeleteAccount` w `src/modules/auth/composables/useAuth.ts`
- Metoda `deleteAccount` w `authService.ts` (DELETE `/auth/account`)
- Integracja w `SettingsPage.vue`
- i18n tłumaczenia (en, pl)
- Modal z potwierdzeniem (wymaga wpisania "DELETE")
- Checkbox potwierdzenia
- Automatyczne wylogowanie po usunięciu

✅ **Backend** - **Zaimplementowane**:
- Endpoint `DELETE /api/auth/account` w `app/modules/auth/router.py`
- Metoda `delete_account` w `AuthService`
- Metoda `delete_user` w `UserRepository` (soft delete z anonimizacją)
- Schema `DeleteAccountRequest` (password opcjonalne, confirmation wymagane)
- Rate limiting: 1 request/day
- Soft delete z anonimizacją danych (GDPR compliant)
- Email powiadomienie (jeśli email service dostępny)

## Uwaga

**Funkcjonalność jest już w pełni zaimplementowana w obu projektach!** 

Ten dokument został utworzony jako plan przed implementacją, ale implementacja została już wykonana. Dokument może służyć jako:
- Dokumentacja istniejącej funkcjonalności
- Referencja dla przyszłych ulepszeń
- Przykład implementacji dla innych projektów

## Wymagania

### Backend

#### Endpoint API

```
DELETE /api/auth/account
DELETE /api/users/{user_id}  # Admin only
```

#### Funkcjonalności

1. **Usuwanie własnego konta** (DELETE /api/auth/account)
   - Wymaga autentykacji
   - Wymaga potwierdzenia hasła (opcjonalnie, dla bezpieczeństwa)
   - Soft delete vs Hard delete (do rozważenia)
   - Anonimizacja danych osobowych (GDPR compliance)
   - Usunięcie powiązanych danych:
     - Sesje/tokeny
     - Logi użytkownika (opcjonalnie - może zostać dla audytu)
     - 2FA konfiguracje
     - Passkeys
     - Inne powiązane dane

2. **Usuwanie konta przez admina** (DELETE /api/users/{user_id})
   - Wymaga uprawnień admina
   - Podobne funkcjonalności jak wyżej

#### Bezpieczeństwo

- Rate limiting (np. 1 request/24h)
- Wymaganie potwierdzenia hasła przed usunięciem
- Logowanie akcji usunięcia konta
- Email powiadomienie o usunięciu konta (jeśli email service jest dostępny)
- Okres karencji (opcjonalnie - np. 30 dni przed faktycznym usunięciem)

#### Soft Delete vs Hard Delete

**Rekomendacja: Soft Delete**

- Oznaczenie konta jako `deleted` zamiast fizycznego usunięcia
- Data usunięcia (`deleted_at`)
- Anonimizacja danych osobowych (email, name)
- Możliwość przywrócenia w okresie karencji (np. 30 dni)
- Automatyczne hard delete po okresie karencji

### Frontend

#### Komponenty

1. **Strona ustawień konta** (`/settings/account` lub `/profile/settings`)
   - Sekcja "Danger Zone"
   - Przycisk "Delete Account"
   - Modal z potwierdzeniem
   - Wymaganie wpisania hasła lub frazy potwierdzającej

2. **Modal potwierdzenia**
   - Ostrzeżenie o konsekwencjach
   - Pole na hasło (opcjonalnie)
   - Checkbox "Rozumiem konsekwencje"
   - Przyciski: "Anuluj" i "Usuń konto"

#### UX Flow

```
1. Użytkownik przechodzi do ustawień konta
2. Kliknie "Delete Account" w sekcji "Danger Zone"
3. Modal z ostrzeżeniem i formularzem
4. Wypełnia formularz (hasło + checkbox)
5. Wysyła request DELETE /api/auth/account
6. Backend usuwa konto (soft delete)
7. Frontend wylogowuje użytkownika
8. Przekierowanie do strony głównej z komunikatem
```

## Implementacja

### Backend

#### 1. Schema

```python
# app/modules/auth/schemas.py

class DeleteAccountRequest(BaseModel):
    password: str | None = Field(
        None,
        description="Current password for confirmation (optional but recommended)"
    )
    confirmation: str = Field(
        ...,
        description="Confirmation phrase like 'DELETE' or user email"
    )
```

#### 2. Repository

```python
# app/modules/auth/repositories.py

async def delete_user(self, user_id: str, soft_delete: bool = True) -> bool:
    """Delete user account (soft delete by default)."""
    # Implementation
```

#### 3. Service

```python
# app/modules/auth/service.py

async def delete_account(
    self, 
    user_id: str, 
    password: str | None = None,
    soft_delete: bool = True
) -> bool:
    """Delete user account."""
    # Verify password if provided
    # Delete related data
    # Soft delete user
    # Send notification email
    # Log action
```

#### 4. Router

```python
# app/modules/auth/router.py

@router.delete(
    "/account",
    response_model=MessageResponse,
    summary="Delete account",
    description="Delete current user's account",
    tags=["Authentication"]
)
@rate_limit("1/day")  # Prevent abuse
async def delete_account(
    request_data: DeleteAccountRequest,
    current_user: User = Depends(get_current_user),
    auth_service: AuthServiceDep = Depends(),
) -> MessageResponse:
    """Delete current user's account."""
    # Implementation
```

### Frontend

#### 1. API Service

```typescript
// frontend/src/modules/auth/services/authService.ts

async deleteAccount(password?: string, confirmation: string): Promise<void> {
  await api.delete('/api/auth/account', {
    data: { password, confirmation }
  })
}
```

#### 2. Component

```vue
<!-- frontend/src/modules/auth/components/DeleteAccountModal.vue -->
<template>
  <Modal>
    <h2>Usuń konto</h2>
    <p>Ostrzeżenie o konsekwencjach...</p>
    <form @submit.prevent="handleDelete">
      <Input v-model="password" type="password" label="Hasło" />
      <Input v-model="confirmation" label="Wpisz 'USUŃ' aby potwierdzić" />
      <Checkbox v-model="confirmed" label="Rozumiem konsekwencje" />
      <Button type="submit" variant="danger" :disabled="!canDelete">
        Usuń konto
      </Button>
    </form>
  </Modal>
</template>
```

#### 3. Route/Page

Dodać do istniejących ustawień konta lub stworzyć nową stronę.

## Powiązane dane do usunięcia/anonimizacji

1. **Auth module**:
   - User record (soft delete)
   - Reset tokens
   - Refresh tokens (unieważnienie)

2. **2FA module**:
   - TOTP configurations
   - Passkeys
   - Backup codes

3. **Logs module**:
   - Opcjonalnie: zachować dla audytu, ale anonimizować user_id

4. **Users module** (jeśli istnieje):
   - Profile data
   - Preferences

## Email powiadomienie

Jeśli email service jest dostępny, wysłać email:
- Przed usunięciem (jeśli jest okres karencji)
- Po usunięciu (potwierdzenie)
- Link do przywrócenia konta (jeśli soft delete z karencją)

## Priorytety implementacji

### Faza 1
1. ✅ Backend: Endpoint DELETE /api/auth/account
2. ✅ Backend: Soft delete z anonimizacją
3. ✅ Backend: Usunięcie powiązanych danych (2FA, passkeys)
4. ✅ Frontend: Modal potwierdzenia
5. ✅ Frontend: Integracja z API

### Faza 2
6. Wymaganie potwierdzenia hasła
7. Email powiadomienie
8. Okres karencji z możliwością przywrócenia

### Faza 3
9. Admin endpoint do usuwania kont
10. Dashboard do zarządzania usuniętymi kontami

## Data utworzenia

2025-11-06

## Status

✅ **Zaimplementowane** - funkcjonalność jest już w pełni zaimplementowana w obu projektach (frontend i backend).

## ✅ Potwierdzenie

**Data**: 2025-11-07  
**Status**: Zgodnie z dokumentem, funkcjonalność usuwania konta jest już w pełni zaimplementowana. Nie wymaga dodatkowych zmian.

