# Plan implementacji powiadomień emailowych

## Status obecny

✅ **Rejestracja użytkownika** - działa (bez emaila powitalnego)
✅ **Logowanie** - działa (bez powiadomienia o nowym urządzeniu)
⚠️ **Reset hasła** - działa, ale email nie jest wysyłany (tylko logowanie w dev mode)

## Lista sytuacji wymagających powiadomień emailowych

### 1. Rejestracja użytkownika
- **Kiedy**: Po pomyślnej rejestracji nowego użytkownika
- **Typ**: Powitanie / Welcome email
- **Zawartość**:
  - Powitanie
  - Link do weryfikacji emaila (jeśli implementowane)
  - Instrukcje pierwszego logowania
  - Link do ustawień konta
- **Priorytet**: Wysoki

### 2. Reset hasła
- **Kiedy**: Gdy użytkownik prosi o reset hasła
- **Typ**: Security notification
- **Zawartość**:
  - Link do resetu hasła (z tokenem)
  - Czas ważności linku (np. 1 godzina)
  - Ostrzeżenie bezpieczeństwa (jeśli to nie Ty, zignoruj)
  - Informacja o IP/urządzeniu (opcjonalnie)
- **Priorytet**: Krytyczny (już częściowo zaimplementowane)

### 3. Zmiana hasła
- **Kiedy**: Gdy użytkownik zmienia hasło (przez ustawienia)
- **Typ**: Security notification
- **Zawartość**:
  - Potwierdzenie zmiany hasła
  - Data i czas zmiany
  - Informacja o IP/urządzeniu
  - Link do cofnięcia zmiany (jeśli to nie Ty)
- **Priorytet**: Wysoki

### 4. Logowanie z nowego urządzenia
- **Kiedy**: Gdy użytkownik loguje się z nowego urządzenia/IP
- **Typ**: Security alert
- **Zawartość**:
  - Informacja o nowym logowaniu
  - Data, czas, lokalizacja (jeśli dostępne), urządzenie
  - Link do zarządzania sesjami
  - Link do zmiany hasła (jeśli to nie Ty)
- **Priorytet**: Średni

### 5. Włączenie 2FA (TOTP)
- **Kiedy**: Gdy użytkownik włącza 2FA przez TOTP
- **Typ**: Security notification
- **Zawartość**:
  - Potwierdzenie włączenia 2FA
  - Instrukcje użycia
  - Backup codes (jeśli dostępne)
  - Link do wyłączenia 2FA
- **Priorytet**: Średni

### 6. Wyłączenie 2FA (TOTP)
- **Kiedy**: Gdy użytkownik wyłącza 2FA
- **Typ**: Security alert
- **Zawartość**:
  - Ostrzeżenie o wyłączeniu 2FA
  - Data i czas
  - Link do ponownego włączenia
  - Link do zmiany hasła (jeśli to nie Ty)
- **Priorytet**: Wysoki

### 7. Dodanie passkey (WebAuthn)
- **Kiedy**: Gdy użytkownik dodaje nowy passkey
- **Typ**: Security notification
- **Zawartość**:
  - Potwierdzenie dodania passkey
  - Nazwa urządzenia/klucza
  - Data dodania
  - Link do zarządzania passkeys
  - Link do usunięcia (jeśli to nie Ty)
- **Priorytet**: Średni

### 8. Usunięcie passkey (WebAuthn)
- **Kiedy**: Gdy użytkownik usuwa passkey
- **Typ**: Security notification
- **Zawartość**:
  - Potwierdzenie usunięcia passkey
  - Nazwa usuniętego urządzenia/klucza
  - Data usunięcia
  - Link do zarządzania passkeys
- **Priorytet**: Średni

### 9. Weryfikacja emaila (jeśli implementowane)
- **Kiedy**: Po rejestracji lub zmianie emaila
- **Typ**: Verification
- **Zawartość**:
  - Link weryfikacyjny
  - Czas ważności
  - Instrukcje
- **Priorytet**: Niski (funkcjonalność nie jest jeszcze zaimplementowana)

### 10. Zmiana emaila
- **Kiedy**: Gdy użytkownik zmienia adres email
- **Typ**: Security alert
- **Zawartość**:
  - Potwierdzenie zmiany
  - Stary i nowy email
  - Link do cofnięcia zmiany (jeśli to nie Ty)
  - Wymagana weryfikacja nowego emaila
- **Priorytet**: Wysoki (funkcjonalność nie jest jeszcze zaimplementowana)

## Implementacja

### Email Service Adapter Pattern

Stworzyć abstrakcję dla wysyłki emaili z dwoma implementacjami:

1. **FileEmailAdapter** (development/testing)
   - Zapisuje emaile do plików w katalogu `emails/`
   - Format: JSON lub HTML
   - Struktura: `emails/{date}/{timestamp}_{type}_{email}.html`

2. **SMTPEmailAdapter** (production)
   - Wysyła emaile przez SMTP
   - Wymaga konfiguracji SMTP w `.env`

### Struktura katalogów

```
backend/
├── app/
│   ├── core/
│   │   └── email/
│   │       ├── __init__.py
│   │       ├── adapter.py          # EmailAdapter interface
│   │       ├── file_adapter.py     # FileEmailAdapter
│   │       ├── smtp_adapter.py     # SMTPEmailAdapter
│   │       ├── service.py          # EmailService
│   │       └── templates/          # Email templates (Jinja2)
│   │           ├── welcome.html
│   │           ├── password_reset.html
│   │           ├── password_changed.html
│   │           ├── new_device.html
│   │           ├── 2fa_enabled.html
│   │           ├── 2fa_disabled.html
│   │           ├── passkey_added.html
│   │           └── passkey_removed.html
```

### Konfiguracja

Dodać do `app/core/config.py`:

```python
class EmailSettings(BaseSettings):
    """Email configuration."""
    
    enabled: bool = Field(default=True, validation_alias="EMAIL_ENABLED")
    adapter: str = Field(default="file", validation_alias="EMAIL_ADAPTER")  # "file" | "smtp"
    
    # SMTP settings (if adapter == "smtp")
    smtp_host: str = Field(default="", validation_alias="SMTP_HOST")
    smtp_port: int = Field(default=587, validation_alias="SMTP_PORT")
    smtp_user: str = Field(default="", validation_alias="SMTP_USER")
    smtp_password: str = Field(default="", validation_alias="SMTP_PASSWORD")
    smtp_from: str = Field(default="noreply@example.com", validation_alias="SMTP_FROM")
    smtp_use_tls: bool = Field(default=True, validation_alias="SMTP_USE_TLS")
    
    # File adapter settings (if adapter == "file")
    file_path: str = Field(default="./emails", validation_alias="EMAIL_FILE_PATH")
```

## Priorytety implementacji

### Faza 1 (Wysoki priorytet)
1. ✅ Stworzyć EmailService z adapter pattern
2. ✅ Zaimplementować FileEmailAdapter
3. ✅ Dodać email powitalny przy rejestracji
4. ✅ Dodać email przy resetowaniu hasła (już częściowo zaimplementowane)

### Faza 2 (Średni priorytet)
5. Email przy zmianie hasła
6. Email przy logowaniu z nowego urządzenia
7. Email przy włączeniu/wyłączeniu 2FA

### Faza 3 (Niski priorytet)
8. Email przy dodaniu/usunięciu passkey
9. SMTPEmailAdapter dla produkcji
10. Szablony HTML z stylingiem

## Data utworzenia

2025-11-06

## Status

📋 **Plan** - wymaga implementacji

