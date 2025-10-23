<script setup lang="ts">
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader title="Dashboard Example" description="Przykładowy dashboard z komponentami nawigacji, widgetów i innymi elementami" />

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

