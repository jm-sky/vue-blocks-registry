# Brakujące translacje dla nawigacji

## Problem

Komponent `AuthenticatedLayout.vue` używa kluczy translacji dla nawigacji:
- `navigation.dashboard`
- `navigation.profile`
- `navigation.settings`

Te klucze nie są zdefiniowane w plikach translacji (`shared/i18n/locales/en.ts` i `shared/i18n/locales/pl.ts`), co powoduje wyświetlanie surowych kluczy zamiast przetłumaczonych tekstów.

## Lokalizacja problemu

**Plik**: `src/layouts/AuthenticatedLayout.vue`

```typescript
const navLinks = computed(() => [
  { to: '/dashboard', label: t('navigation.dashboard') },
  { to: '/profile', label: t('navigation.profile') },
  { to: '/settings', label: t('navigation.settings') },
])
```

## Rozwiązanie

Dodać sekcję `navigation` do plików translacji:

**Plik**: `src/shared/i18n/locales/en.ts`
```typescript
export default {
  // ... existing translations
  navigation: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
  },
}
```

**Plik**: `src/shared/i18n/locales/pl.ts`
```typescript
export default {
  // ... existing translations
  navigation: {
    dashboard: 'Panel',
    profile: 'Profil',
    settings: 'Ustawienia',
  },
}
```

## Rekomendacja dla vue-blocks-registry

1. **Dodać sekcję `navigation` do podstawowych plików translacji** w registry (`shared/i18n/locales/en.ts` i `shared/i18n/locales/pl.ts`)
2. **Upewnić się, że wszystkie klucze używane w komponentach layout są zdefiniowane** przed wydaniem modułu
3. **Rozważyć dodanie walidacji** w trybie development, która sprawdza czy wszystkie używane klucze translacji są zdefiniowane

## ✅ Naprawione

**Data**: 2025-11-07  
**Zmiana**: Dodano sekcję `navigation` do `registry/shared/i18n/locales/en.ts` i `registry/shared/i18n/locales/pl.ts` z kluczami: `dashboard`, `profile`, `settings`.

