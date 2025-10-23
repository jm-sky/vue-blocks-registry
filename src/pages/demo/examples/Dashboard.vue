<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        Dashboard Example
      </h1>
      <p class="mt-2 text-muted-foreground">
        Przykład dashboard aplikacji
      </p>
    </div>

    <div class="rounded-lg border border-border bg-card p-8">
      <p class="text-center text-muted-foreground">
        Coming soon... Dashboard example będzie tutaj.
      </p>
      <div class="mt-4 text-center">
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Zobacz istniejący Dashboard
        </RouterLink>
      </div>
    </div>
  </div>
</template>

