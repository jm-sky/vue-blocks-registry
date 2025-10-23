<script setup lang="ts">
import ComponentCard from '@/components/demo/ComponentCard.vue'
import { RoutePaths } from '@/router/route-names'

const examples = [
  {
    title: 'Dashboard',
    description: 'Przykład dashboard z różnymi komponentami',
    to: RoutePaths.DEMO_EXAMPLES_DASHBOARD
  },
  {
    title: 'Authentication',
    description: 'Kompletny system autentykacji',
    to: RoutePaths.DEMO_EXAMPLES_AUTH
  }
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        Examples
      </h1>
      <p class="mt-2 text-muted-foreground">
        Przykłady użycia komponentów w rzeczywistych scenariuszach.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ComponentCard
        v-for="example in examples"
        :key="example.title"
        :title="example.title"
        :description="example.description"
        :to="example.to"
      />
    </div>
  </div>
</template>

