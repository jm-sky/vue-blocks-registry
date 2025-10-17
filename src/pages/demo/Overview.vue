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
    iconClass: 'size-6 text-blue-600',
    iconBgClass: 'w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4'
  },
  {
    title: 'Forms',
    description: 'Komponenty formularzy i pól input',
    linkTo: '/demo/forms',
    iconComponent: FormIcon,
    iconClass: 'size-6 text-green-600',
    iconBgClass: 'w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4'
  },
  {
    title: 'Layout',
    description: 'Komponenty układu i kontenerów',
    linkTo: '/demo/layout',
    iconComponent: LayoutIcon,
    iconClass: 'size-6 text-purple-600',
    iconBgClass: 'w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4'
  }
]

const stats = [
  { value: 1, label: 'Kategoria', colorClass: 'text-blue-600' },
  { value: 6, label: 'Warianty Button', colorClass: 'text-green-600' },
  { value: 3, label: 'Wibracje Button', colorClass: 'text-purple-600' }
]
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="text-center py-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        Witaj w
        <LogoText class="text-4xl" />
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Odkryj naszą kolekcję gotowych komponentów UI, zaprojektowanych z myślą o nowoczesnych aplikacjach Vue.js
      </p>
    </div>

    <!-- Component Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
