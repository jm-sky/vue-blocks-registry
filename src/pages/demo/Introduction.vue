<script setup lang="ts">
import { LayoutDashboard, Lock, Star, Table } from 'lucide-vue-next'
import { type Component } from 'vue'
import FeatureCard from '@/components/demo/FeatureCard.vue'
import { RoutePaths } from '@/router/route-names'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import DocsPageHeader from './layouts/partials/DocsPageHeader.vue'

const features = [
  {
    title: 'Komponenty UI',
    items: ['Przyciski z wariantami', 'Formularze i pola input', 'Karty i kontenery', 'Tabele i listy'],
    iconComponent: Star as Component,
    iconClass: 'size-5 text-blue-600',
    iconBgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
  },
  {
    title: 'Layouty',
    items: ['PublicLayout', 'AuthenticatedLayout', 'GuestLayoutCentered', 'GuestLayoutTwoColumns'],
    iconComponent: LayoutDashboard as Component,
    iconClass: 'size-5 text-violet-600',
    iconBgClass: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20'
  },
  {
    title: 'Moduły Auth',
    items: ['Login/Register', 'Password Reset', 'Change Password', 'Protected Routes'],
    iconComponent: Lock as Component,
    iconClass: 'size-5 text-emerald-600',
    iconBgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
  },
  {
    title: 'Data Table',
    items: ['Sortowanie', 'Filtrowanie', 'Paginacja', 'Responsive'],
    iconComponent: Table as Component,
    iconClass: 'size-5 text-amber-600',
    iconBgClass: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
  }
]
</script>

<template>
  <div class="space-y-10">
    <DocsPageHeader title="Introduction" description="Poznaj Vue Blocks Registry - modularny system komponentów Vue 3" />

    <Card>
      <CardContent class="leading-7 text-muted-foreground">
        Vue Blocks Registry to modularny system komponentów Vue 3 z gotowymi rozwiązaniami UI, layoutami i funkcjonalnościami.
      </CardContent>
    </Card>

    <div class="space-y-4">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        Czym jest Vue Blocks Registry?
      </h2>

      <p class="leading-7 text-muted-foreground">
        Vue Blocks Registry to <strong>nie jest biblioteką komponentów</strong>. To kolekcja wielokrotnego użytku komponentów,
        które możesz skopiować i wkleić do swoich aplikacji lub dodać za pomocą CLI.
      </p>

      <p class="leading-7 text-muted-foreground">
        Podobnie jak shadcn/ui, kod jest Twój. Możesz go dostosować do swoich potrzeb.
      </p>
    </div>

    <div class="space-y-4 animate-slide-up">
      <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
        Główne Funkcje
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :items="feature.items"
          :icon-component="feature.iconComponent"
          :icon-class="feature.iconClass"
          :icon-bg-class="feature.iconBgClass"
          dense
        />
      </div>
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
      Technologie
    </h2>

    <div class="grid grid-cols-2 gap-4 not-prose my-6">
      <FeatureCard
        title="Frontend"
        :items="['Vue 3', 'TypeScript', 'Tailwind CSS', 'Reka UI']"
      />
      <FeatureCard
        title="Tools"
        :items="['Vite', 'Vue Router', 'Pinia', 'Vee Validate + Zod']"
      />
    </div>

    <h2 class="scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight">
      Rozpocznij
    </h2>

    <p class="leading-7 text-muted-foreground">
      Wybierz kategorię komponentów z sidebar po lewej stronie, aby zobaczyć przykłady i kod.
    </p>

    <div class="flex flex-wrap gap-4 not-prose my-6">
      <RouterLink
        :to="RoutePaths.DEMO_COMPONENTS_BUTTON"
        class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors duration-200"
      >
        View Components
      </RouterLink>
      <a
        href="https://github.com/jm-sky/vue-blocks-registry"
        target="_blank"
        class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
      >
        GitHub Repository
      </a>
    </div>
  </div>
</template>
