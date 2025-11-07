# Błąd składni w app/api/router.py

## Problem

CLI `fastapi-blocks-registry` generuje kod z błędem składni w pliku `app/api/router.py`.

### Opis błędu

Importy modułów są umieszczone wewnątrz bloku `try-except`, co powoduje błąd składni:

```python
# ❌ BŁĘDNY KOD (generowany przez CLI)
try:
    from app.modules.auth.router import router as auth_router
    from app.modules.logs.router import router as logs_router
    from app.modules.users.router import router as users_router
except Exception:
    pass
```

**Błąd**: `E402 Module level import not at top of file` oraz `invalid-syntax: Expected 'except' or 'finally' after 'try' block`

### Poprawka

Importy modułów powinny być na początku pliku, a tylko opcjonalne moduły (np. `two_factor`) mogą być w `try-except`:

```python
# ✅ POPRAWNY KOD
"""Main API router aggregating all module routers."""

from fastapi import APIRouter

# Module routers registration
# When you add modules using 'fastapi-registry add <module>', the CLI will automatically
# add the necessary imports and include_router calls here.
from app.modules.auth.router import router as auth_router
from app.modules.logs.router import router as logs_router
from app.modules.users.router import router as users_router

# Main API router
api_router = APIRouter()

# Health check endpoint
@api_router.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint.

    Returns:
        Status message
    """
    return {"status": "healthy"}

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

## Wersje CLI, w których występuje problem

- ✅ **v0.2.10** - problem występował
- ✅ **v0.2.12** - problem nadal występuje (potwierdzone podczas testów)

## Priorytet

🔴 **WYSOKI** - Błąd składni uniemożliwia uruchomienie aplikacji

## Rekomendacja

1. Poprawić generator kodu w CLI, aby importy modułów były zawsze na początku pliku
2. Użyć `try-except ImportError` tylko dla opcjonalnych modułów (np. `two_factor`)
3. Dodać testy weryfikujące poprawność składni generowanego kodu

## Plik patch

Zobacz: `git-diff-fastapi-*.patch` w katalogu `docs/to-repos/fastapi-blocks-registry/`

