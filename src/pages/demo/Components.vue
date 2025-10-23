<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ComponentCard from '@/components/demo/ComponentCard.vue'
import { RoutePaths } from '@/router/route-names'
import DocsPageHeader from './layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const components = computed(() => [
  {
    title: t('demo.sidebar.button'),
    description: t('demo.overview.buttons.description'),
    to: RoutePaths.DEMO_COMPONENTS_BUTTON
  },
  {
    title: t('demo.sidebar.links'),
    description: t('demo.overview.links.description'),
    to: RoutePaths.DEMO_COMPONENTS_LINKS
  },
  {
    title: t('demo.sidebar.layout'),
    description: t('demo.overview.layout.description'),
    to: RoutePaths.DEMO_COMPONENTS_LAYOUT
  },
  {
    title: t('demo.sidebar.data_table'),
    description: t('demo.overview.dataTable.description'),
    to: RoutePaths.DEMO_COMPONENTS_DATA_TABLE
  }
])
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader :title="t('demo.components_page.title')" :description="t('demo.components_page.description')" />

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

