<script setup lang="ts">
import { LayoutDashboard, Link2, MousePointerClick, Table } from 'lucide-vue-next'
import { type Component } from 'vue'
import CategoryCard from '@/components/demo/CategoryCard.vue'
import HeroSection from '@/components/demo/HeroSection.vue'
import { RoutePaths } from '@/router/route-names'

const categories = [
  {
    title: 'Buttons',
    description: 'Różnorodne style przycisków z wariantami i wibracjami',
    linkTo: RoutePaths.DEMO_COMPONENTS_BUTTONS,
    iconClass: 'size-7 text-blue-600',
    iconBgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    iconComponent: MousePointerClick as Component
  },
  {
    title: 'Links',
    description: 'Komponenty linków z hover efektem i smooth transitions',
    linkTo: RoutePaths.DEMO_COMPONENTS_LINKS,
    iconClass: 'size-7 text-emerald-600',
    iconBgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
    iconComponent: Link2 as Component
  },
  {
    title: 'Layout',
    description: 'Komponenty układu i kontenerów',
    linkTo: RoutePaths.DEMO_COMPONENTS_LAYOUT,
    iconClass: 'size-7 text-violet-600',
    iconBgClass: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20',
    iconComponent: LayoutDashboard as Component
  },
  {
    title: 'Data Table',
    description: 'Zaawansowana tabela z sortowaniem i filtrowaniem',
    linkTo: RoutePaths.DEMO_COMPONENTS_DATA_TABLE,
    iconClass: 'size-7 text-amber-600',
    iconBgClass: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
    iconComponent: Table as Component
  }
]
</script>

<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Component Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      <CategoryCard
        v-for="category in categories"
        :key="category.title"
        :title="category.title"
        :description="category.description"
        :link-to="category.linkTo"
        :icon-component="category.iconComponent"
        :icon-class="category.iconClass"
        :icon-bg-class="category.iconBgClass"
      />
    </div>
  </div>
</template>

