# Rekomendacja: Zero-config API client dla dev servera

## Problem

Obecna konfiguracja `apiClient.ts` używa:
```typescript
baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
```

To wymaga ustawienia zmiennej środowiskowej `VITE_API_BASE_URL` w dev, co nie jest zero-config. Dodatkowo, jeśli ustawimy pełny URL (np. `http://localhost:8000/api`), requesty będą omijać proxy Vite, co może powodować problemy z CORS i wymaga dodatkowej konfiguracji.

## Rozwiązanie

Zmienić `baseURL` w `apiClient.ts`, aby w trybie development zawsze używać relatywnej ścieżki `/api`, która będzie automatycznie proxy'owana przez Vite do backendu.

### Proponowana zmiana

**Plik**: `src/shared/services/apiClient.ts`

**Przed**:
```typescript
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

**Po**:
```typescript
export const apiClient = axios.create({
  // W dev użyj relatywnej ścieżki dla proxy Vite (zero-config)
  // W production użyj VITE_API_BASE_URL jeśli ustawione, w przeciwnym razie '/api'
  baseURL: import.meta.env.DEV 
    ? '/api' 
    : (import.meta.env.VITE_API_BASE_URL ?? '/api'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

## Korzyści

1. **Zero-config w development**: Nie trzeba ustawiać `VITE_API_BASE_URL` w dev - wszystko działa od razu
2. **Automatyczne proxy**: Vite proxy (`/api` -> `http://localhost:8000`) działa automatycznie
3. **Brak problemów z CORS**: Proxy rozwiązuje problemy z CORS w dev
4. **Elastyczność w production**: W production nadal można użyć `VITE_API_BASE_URL` dla custom backend URL
5. **Prostsze testy**: Testy E2E nie wymagają dodatkowej konfiguracji

## Konfiguracja Vite

Proxy w `vite.config.ts` już jest skonfigurowane:
```typescript
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_PROXY_URL ?? 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

Dzięki tej zmianie, wszystkie requesty do `/api/*` w dev będą automatycznie przekierowywane na `http://localhost:8000/api/*` przez proxy Vite.

## Przykład działania

- **Development**: 
  - Request: `GET /api/auth/me`
  - Proxy Vite: `GET http://localhost:8000/api/auth/me`
  - ✅ Działa bez konfiguracji

- **Production** (z `VITE_API_BASE_URL=https://api.example.com`):
  - Request: `GET https://api.example.com/api/auth/me`
  - ✅ Działa z custom URL

- **Production** (bez `VITE_API_BASE_URL`):
  - Request: `GET /api/auth/me` (relatywna ścieżka)
  - ✅ Działa gdy frontend i backend są na tej samej domenie (reverse proxy)

## ✅ Naprawione

**Data**: 2025-11-07  
**Zmiana**: Zaktualizowano `registry/shared/services/apiClient.ts` - używa `/api` w dev (dla proxy Vite) i `VITE_API_BASE_URL ?? '/api'` w production.

