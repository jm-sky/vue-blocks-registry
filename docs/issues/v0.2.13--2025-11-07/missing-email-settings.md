# Brakująca konfiguracja EmailSettings w app/core/config.py

## Problem

Nowy moduł email wymaga `EmailSettings` w konfiguracji, ale klasa nie jest zdefiniowana w `app/core/config.py`.

### Błąd

```
ImportError: cannot import name 'EmailSettings' from 'app.core.config'
```

### Lokalizacja błędu

Plik: `backend/app/core/email/service.py` (linia 9)
```python
from app.core.config import EmailSettings, settings
```

### Przyczyna

CLI `fastapi-blocks-registry` dodał moduł email z zależnością od `EmailSettings`, ale nie zaktualizował pliku konfiguracji.

## Wersje CLI, w których występuje problem

- ✅ **v0.2.13** - problem występuje

## Priorytet

🔴 **KRYTYCZNY** - Uniemożliwia uruchomienie aplikacji

## Rekomendacja

1. CLI powinno automatycznie dodawać wymagane klasy konfiguracyjne podczas instalacji modułu email
2. Sprawdzić czy wszystkie zależności modułów są poprawnie zdefiniowane
3. Dodać walidację zależności podczas generowania kodu

## Workaround

Dodać `EmailSettings` do `app/core/config.py` ręcznie lub zainstalować moduł email ponownie po aktualizacji CLI.

