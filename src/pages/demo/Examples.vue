<script setup lang="ts">
import ComponentCard from '@/components/demo/ComponentCard.vue'
import { RoutePaths } from '@/router/route-names'
import DocsPageHeader from './layouts/partials/DocsPageHeader.vue'

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
  },
  {
    title: 'Internationalization (i18n)',
    description: 'Multi-language support with PL/EN translations',
    to: RoutePaths.DEMO_EXAMPLES_I18N
  }
]
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader title="Examples" description="Przykłady użycia komponentów w rzeczywistych scenariuszach." />

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

