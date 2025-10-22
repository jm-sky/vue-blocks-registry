<script setup lang="ts">
import CategoryCard from '@/components/demo/CategoryCard.vue'
import ButtonIcon from '@/components/demo/icons/ButtonIcon.vue'
import FormIcon from '@/components/demo/icons/FormIcon.vue'
import LayoutIcon from '@/components/demo/icons/LayoutIcon.vue'
import StatsSection from '@/components/demo/StatsSection.vue'
import LogoText from '@/components/layout/LogoText.vue'

const categories = [
  {
    title: 'Buttons',
    description: 'Różnorodne style przycisków z wariantami i wibracjami',
    linkTo: '/demo/buttons',
    iconComponent: ButtonIcon,
    iconClass: 'size-7 text-blue-600',
    iconBgClass: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    title: 'Forms',
    description: 'Komponenty formularzy i pól input',
    linkTo: '/demo/forms',
    iconComponent: FormIcon,
    iconClass: 'size-7 text-emerald-600',
    iconBgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100'
  },
  {
    title: 'Layout',
    description: 'Komponenty układu i kontenerów',
    linkTo: '/demo/layout',
    iconComponent: LayoutIcon,
    iconClass: 'size-7 text-violet-600',
    iconBgClass: 'bg-gradient-to-br from-violet-50 to-violet-100'
  },
  {
    title: 'Data Table',
    description: 'Zaawansowana tabela z sortowaniem, filtrowaniem i paginacją',
    linkTo: '/demo/data-table',
    iconComponent: LayoutIcon,
    iconClass: 'size-7 text-amber-600',
    iconBgClass: 'bg-gradient-to-br from-amber-50 to-amber-100'
  }
]

const stats = [
  { value: 4, label: 'Kategorie', colorClass: 'text-blue-600' },
  { value: 20, label: 'Komponenty UI', colorClass: 'text-emerald-600' },
  { value: 5, label: 'Layouty', colorClass: 'text-violet-600' }
]
</script>

<template>
  <div class="space-y-16">
    <!-- Welcome Section -->
    <div class="text-center py-16 space-y-4 animate-fade-in">
      <h2 class="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
        Witaj w
        <LogoText class="text-5xl" />
      </h2>
      <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
        Odkryj naszą kolekcję gotowych komponentów UI, zaprojektowanych z myślą o nowoczesnych aplikacjach Vue.js
      </p>
      <p class="text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
        Używamy Tailwind CSS i Shadcn Vue, Vee Validate, Zod...
      </p>
    </div>

    <!-- Component Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
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

    <!-- Quick Stats -->
    <div class="animate-scale-in">
      <StatsSection
        title="Statystyki"
        :stats="stats"
      />
    </div>
  </div>
</template>
