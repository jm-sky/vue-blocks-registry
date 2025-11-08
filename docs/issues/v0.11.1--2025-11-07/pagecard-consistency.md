# Niespójność użycia PageCard w stronach z AuthenticatedLayout

## Problem

Strony używające `AuthenticatedLayout` mają niespójne podejście do opakowywania treści w `PageCard`:

1. **DashboardPage.vue** - używa `PageCard` wewnątrz `AuthenticatedLayout`
2. **ProfileViewPage.vue** - nie używa `PageCard`, ma własne style (`bg-card border rounded-lg`)
3. **ProfileEditPage.vue** - nie używa `PageCard`, ma własne style (`bg-card border rounded-lg`)
4. **SettingsPage.vue** - nie używa `PageCard`, ma własne style
5. **LogsBrowserPage.vue** - nie używa `PageCard`, ma własne style
6. **ChangePasswordPage.vue** - nie używa `PageCard`, ma własne style (`bg-card py-8 px-6 shadow-lg rounded-lg`)

## Przykłady

### DashboardPage.vue (z PageCard)
```vue
<template>
  <AuthenticatedLayout>
    <PageCard>
      <div class="p-6 space-y-4">
        <!-- content -->
      </div>
    </PageCard>
  </AuthenticatedLayout>
</template>
```

### ProfileViewPage.vue (bez PageCard)
```vue
<template>
  <div class="space-y-6">
    <!-- content z własnymi stylami bg-card border rounded-lg -->
  </div>
</template>
```

### ChangePasswordPage.vue (bez PageCard)
```vue
<template>
  <AuthenticatedLayout>
    <div class="max-w-md mx-auto py-8">
      <div class="bg-card py-8 px-6 shadow-lg rounded-lg space-y-4">
        <!-- content -->
      </div>
    </div>
  </AuthenticatedLayout>
</template>
```

## Problem

Niespójność powoduje:
- Różne style wizualne między stronami
- Duplikację kodu stylowania
- Trudności w utrzymaniu spójnego wyglądu
- Brak jednolitego podejścia do layoutu

## Rekomendacja dla vue-blocks-registry

### Opcja 1: Wymusić użycie PageCard w AuthenticatedLayout

Zmodyfikować `AuthenticatedLayout.vue`, aby automatycznie opakowywał slot w `PageCard`:

```vue
<template>
  <div class="min-h-screen bg-muted">
    <!-- header -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <PageCard>
        <slot />
      </PageCard>
    </main>
  </div>
</template>
```

**Zalety:**
- Automatyczna spójność
- Mniej kodu w każdej stronie
- Łatwiejsze utrzymanie

**Wady:**
- Mniej elastyczności (nie można użyć wielu kart na stronie)

### Opcja 2: Dokumentować i wymusić konwencję

Dodać do dokumentacji, że strony używające `AuthenticatedLayout` powinny opakowywać treść w `PageCard`:

```vue
<template>
  <AuthenticatedLayout>
    <PageCard>
      <!-- page content -->
    </PageCard>
  </AuthenticatedLayout>
</template>
```

I zaktualizować wszystkie generowane strony, aby używały tego wzorca.

**Zalety:**
- Elastyczność (można użyć wielu kart)
- Spójność przez konwencję

**Wady:**
- Wymaga pamiętania o dodaniu `PageCard` w każdej stronie

### Opcja 3: Utworzyć wrapper component

Utworzyć `AuthenticatedPage.vue`, który łączy `AuthenticatedLayout` i `PageCard`:

```vue
<script setup lang="ts">
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import PageCard from '@/components/layout/PageCard.vue'
</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <slot />
    </PageCard>
  </AuthenticatedLayout>
</template>
```

I używać go w stronach:

```vue
<template>
  <AuthenticatedPage>
    <!-- page content -->
  </AuthenticatedPage>
</template>
```

**Zalety:**
- Najprostsze użycie
- Spójność gwarantowana
- Możliwość łatwej modyfikacji w przyszłości

**Wady:**
- Dodatkowy komponent do utrzymania

## Rekomendacja

**Rekomenduję Opcję 3** - utworzenie `AuthenticatedPage.vue` jako wrappera, który zapewnia spójność i prostotę użycia. To najlepsze rozwiązanie dla CLI, które generuje kod - użytkownicy będą mieli prosty, spójny wzorzec do naśladowania.

## ✅ Naprawione

**Data**: 2025-11-07  
**Zmiana**: Utworzono `registry/layouts/AuthenticatedPage.vue` - wrapper łączący `AuthenticatedLayout` i `PageCard` dla spójnego użycia w stronach. Strony mogą teraz używać `<AuthenticatedPage>` zamiast ręcznego opakowywania w oba komponenty.

