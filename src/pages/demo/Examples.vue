<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ComponentCard from '@/components/demo/ComponentCard.vue'
import { RoutePaths } from '@/router/route-names'
import DocsPageHeader from './layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const examples = computed(() => [
  {
    title: t('demo.sidebar.dashboard'),
    description: t('demo.overview.dataTable.description'),
    to: RoutePaths.DEMO_EXAMPLES_DASHBOARD
  },
  {
    title: t('demo.sidebar.authentication'),
    description: t('demo.overview.buttons.description'),
    to: RoutePaths.DEMO_EXAMPLES_AUTH
  },
  {
    title: t('demo.examples_page.i18n_example.title'),
    description: t('demo.examples_page.i18n_example.description'),
    to: RoutePaths.DEMO_EXAMPLES_I18N
  }
  ,
  {
    title: t('demo.examples_page.settings_example.title'),
    description: t('demo.examples_page.settings_example.description'),
    to: RoutePaths.DEMO_EXAMPLES_SETTINGS
  },
  {
    title: t('demo.examples_page.user_example.title'),
    description: t('demo.examples_page.user_example.description'),
    to: RoutePaths.DEMO_EXAMPLES_USER
  },
  {
    title: t('demo.examples_page.logs_example.title'),
    description: t('demo.examples_page.logs_example.description'),
    to: RoutePaths.DEMO_EXAMPLES_LOGS
  },
  {
    title: t('demo.examples_page.tenant_example.title', 'Multi-Tenancy'),
    description: t('demo.examples_page.tenant_example.description', 'Tenant selection and switching'),
    to: RoutePaths.DEMO_EXAMPLES_TENANT
  }
])
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader :title="t('demo.examples_page.title')" :description="t('demo.examples_page.description')" />

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

