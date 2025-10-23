<script setup lang="ts">
import DataTable from '@registry/components/data-table/DataTable.vue'
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import CardHeader from '@registry/components/ui/card/CardHeader.vue'
import CardTitle from '@registry/components/ui/card/CardTitle.vue'
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import { columns } from '@registry/examples/data-table/columns-full'
import { payments } from '@registry/examples/data-table/data'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const features = [
  {
    title: 'Sorting',
    description: 'Click column headers to sort ascending/descending',
  },
  {
    title: 'Filtering',
    description: 'Search/filter by column values (email in this example)',
  },
  {
    title: 'Pagination',
    description: 'Navigate through pages with Previous/Next buttons',
  },
  {
    title: 'Row Selection',
    description: 'Select rows with checkboxes (individual or select all)',
  },
  {
    title: 'Column Visibility',
    description: 'Toggle column visibility with "Columns" dropdown',
  },
  {
    title: 'Action Menu',
    description: 'Per-row actions with dropdown menu (3-dot icon)',
  },
]
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <DocsPageHeader title="DataTable" description="Advanced table with sorting, filtering, pagination, and row selection powered by TanStack Table" />

    <!-- Full Featured DataTable -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        Full Featured Table
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Table with sorting (click Email header), filtering, pagination, row selection, column visibility toggle, and action menu
      </p>

      <DataTable
        :columns="columns"
        :data="payments"
        filter-column="email"
        filter-placeholder="Filter emails..."
      />
    </div>

    <!-- Features List -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        Features Included
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
        Technology Stack
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
        Basic Usage
      </h3>
      <div class="bg-gray-900 dark:bg-gray-950 p-6 rounded-lg overflow-x-auto">
        <pre class="text-sm text-gray-100"><code>&lt;script setup lang="ts"&gt;
import DataTable from '@registry/components/data-table/DataTable.vue'
import { columns } from './columns'
import { data } from './data'
&lt;/script&gt;

&lt;template&gt;
  &lt;DataTable
    :columns="columns"
    :data="data"
    filter-column="email"
    filter-placeholder="Filter emails..."
  /&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>
  </div>
</template>
