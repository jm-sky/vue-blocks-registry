<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import DataTable from '@registry/components/data-table/DataTable.vue'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import CardHeader from '@registry/components/ui/card/CardHeader.vue'
import CardTitle from '@registry/components/ui/card/CardTitle.vue'
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import { columns } from '@registry/examples/data-table/columns-full'
import { payments } from '@registry/examples/data-table/data'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('demo.showcase.data_table.features.sorting.title'),
    description: t('demo.showcase.data_table.features.sorting.description'),
  },
  {
    title: t('demo.showcase.data_table.features.filtering.title'),
    description: t('demo.showcase.data_table.features.filtering.description'),
  },
  {
    title: t('demo.showcase.data_table.features.pagination.title'),
    description: t('demo.showcase.data_table.features.pagination.description'),
  },
  {
    title: t('demo.showcase.data_table.features.row_selection.title'),
    description: t('demo.showcase.data_table.features.row_selection.description'),
  },
  {
    title: t('demo.showcase.data_table.features.column_visibility.title'),
    description: t('demo.showcase.data_table.features.column_visibility.description'),
  },
  {
    title: t('demo.showcase.data_table.features.action_menu.title'),
    description: t('demo.showcase.data_table.features.action_menu.description'),
  },
])

const basicUsageCode = `// Import components
<script setup lang="ts">
import DataTable from '@registry/components/data-table/DataTable.vue'
import { columns } from './columns'
import { data } from './data'
<\/script>

<template>
  <DataTable
    :columns="columns"
    :data="data"
    search-placeholder="Filter emails..."
    enable-row-selection
  />
</template>`
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <DocsPageHeader
      :title="t('demo.showcase.data_table.title')"
      :description="t('demo.showcase.data_table.description')"
    />

    <!-- Full Featured DataTable -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.data_table.full_featured.title') }}
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        {{ t('demo.showcase.data_table.full_featured.description') }}
      </p>

      <DataTable
        :columns="columns"
        :data="payments"
        :search-placeholder="t('demo.showcase.data_table.filter_placeholder')"
        enable-row-selection
      />
    </div>

    <!-- Features List -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.data_table.features.title') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card v-for="feature in features" :key="feature.title" class="gap-3">
          <CardHeader>
            <CardTitle>{{ feature.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              ✅ {{ feature.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Tech Stack -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.data_table.tech_stack.title') }}
      </h3>
      <HoverCard variant="blue" dense no-hover>
        <ul class="space-y-2 text-slate-700 dark:text-slate-300">
          <li>• <strong>TanStack Table v8</strong> - Headless table state management</li>
          <li>• <strong>Vue 3 Composition API</strong> - Reactive table instance</li>
          <li>• <strong>TypeScript Generics</strong> - Full type safety for data</li>
          <li>• <strong>shadcn-vue components</strong> - Base UI components</li>
          <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
        </ul>
      </HoverCard>
    </div>

    <!-- Usage Example -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {{ t('demo.showcase.data_table.usage.title') }}
      </h3>
      <InstallationCode :code="basicUsageCode" />
    </div>
  </div>
</template>
