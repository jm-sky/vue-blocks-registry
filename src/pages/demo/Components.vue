<script setup lang="ts">
import ComponentCard from '@/components/demo/ComponentCard.vue'
import { RoutePaths } from '@/router/route-names'

const components = [
  {
    title: 'Buttons',
    description: 'Różnorodne style przycisków z wariantami',
    to: RoutePaths.DEMO_COMPONENTS_BUTTONS
  },
  {
    title: 'Links',
    description: 'Komponenty linków z hover efektem i smooth transitions',
    to: RoutePaths.DEMO_COMPONENTS_LINKS
  },
  {
    title: 'Layout',
    description: 'Komponenty układu i kontenerów',
    to: RoutePaths.DEMO_COMPONENTS_LAYOUT
  },
  {
    title: 'Data Table',
    description: 'Zaawansowana tabela z sortowaniem i filtrowaniem',
    to: RoutePaths.DEMO_COMPONENTS_DATA_TABLE
  }
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">
        Components
      </h1>
      <p class="mt-2 text-muted-foreground">
        Wybierz komponent z listy poniżej lub użyj sidebar nawigacji.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ComponentCard
        v-for="component in components"
        :key="component.title"
        :title="component.title"
        :description="component.description"
        :to="component.to"
      />
    </div>
  </div>
</template>

