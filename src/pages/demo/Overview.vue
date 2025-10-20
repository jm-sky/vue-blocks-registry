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
  }
]

const stats = [
  { value: 1, label: 'Kategoria', colorClass: 'text-blue-600' },
  { value: 6, label: 'Warianty Button', colorClass: 'text-emerald-600' },
  { value: 3, label: 'Wibracje Button', colorClass: 'text-violet-600' }
]
</script>

<template>
  <div class="space-y-16">
    <!-- Welcome Section -->
    <div class="text-center py-16 space-y-4">
      <h2 class="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
        Witaj w
        <LogoText class="text-5xl" />
      </h2>
      <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
        Odkryj naszą kolekcję gotowych komponentów UI, zaprojektowanych z myślą o nowoczesnych aplikacjach Vue.js
      </p>
      <p class="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
        Używamy Tailwind CSS i Shadcn Vue, Vee Validate, Zod...
      </p>
    </div>

    <!-- Component Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <StatsSection
      title="Statystyki"
      :stats="stats"
    />
  </div>
</template>
