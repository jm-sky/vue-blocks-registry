# Problem z zakresem zmiennej `two_factor_router` w app/api/router.py

## Problem

W wersji v0.2.13 CLI generuje kod, w którym zmienna `two_factor_router` jest używana poza blokiem `try-except`, ale jest zdefiniowana tylko wewnątrz tego bloku.

### Błędny kod (generowany przez CLI v0.2.13)

```python
# Register Two-Factor module (added during development)
try:
    from app.modules.two_factor.router import router as two_factor_router
    api_router.include_router(two_factor_router)
except Exception:
    # Module may be absent in some builds; ignore if not present
    pass

api_router.include_router(auth_router, prefix="/auth", tags=['Authentication'])
api_router.include_router(logs_router, prefix="/logs", tags=['Logs', 'Monitoring'])
api_router.include_router(users_router, prefix="/users", tags=['Users'])

# ❌ BŁĄD: two_factor_router może nie być zdefiniowane
api_router.include_router(two_factor_router, prefix="/two-factor", tags=['Two-Factor Authentication', 'Security', 'WebAuthn', 'TOTP'])
```

**Problem**: Jeśli import `two_factor_router` się nie powiedzie, zmienna nie będzie zdefiniowana, a linia 47 spowoduje błąd `NameError: name 'two_factor_router' is not defined`.

### Poprawka

Wszystkie użycia `two_factor_router` powinny być wewnątrz bloku `try-except`:

```python
# Register module routers
api_router.include_router(auth_router, prefix="/auth", tags=['Authentication'])
api_router.include_router(logs_router, prefix="/logs", tags=['Logs', 'Monitoring'])
api_router.include_router(users_router, prefix="/users", tags=['Users'])

# Register Two-Factor module (added during development)
try:
    from app.modules.two_factor.router import router as two_factor_router
    api_router.include_router(two_factor_router, prefix="/two-factor", tags=['Two-Factor Authentication', 'Security', 'WebAuthn', 'TOTP'])
except ImportError:
    # Module may be absent in some builds; ignore if not present
    pass
```

**Zmiany**:
1. Wszystkie użycia `two_factor_router` są wewnątrz `try-except`
2. Użyto `ImportError` zamiast `Exception` dla lepszej precyzji
3. Usunięto duplikację `include_router` dla `two_factor_router`

## Wersje CLI, w których występuje problem

- ✅ **v0.2.13** - problem występuje

## Priorytet

🔴 **WYSOKI** - Błąd logiczny może powodować `NameError` w runtime

## Rekomendacja

1. Poprawić generator kodu w CLI, aby wszystkie użycia zmiennych zdefiniowanych w `try-except` były również w tym bloku
2. Dodać testy weryfikujące poprawność zakresu zmiennych w generowanym kodzie
3. Rozważyć użycie `ImportError` zamiast ogólnego `Exception` dla lepszej precyzji

