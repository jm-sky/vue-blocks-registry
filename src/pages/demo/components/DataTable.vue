<script setup lang="ts">
import DataTable from '@registry/components/data-table/DataTable.vue'
import { columns } from '@registry/examples/data-table/columns-full'
import { payments } from '@registry/examples/data-table/data'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

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
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ✅ Sorting
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Click column headers to sort ascending/descending
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ✅ Filtering
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Search/filter by column values (email in this example)
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ✅ Pagination
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Navigate through pages with Previous/Next buttons
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ✅ Row Selection
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Select rows with checkboxes (individual or select all)
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ✅ Column Visibility
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Toggle column visibility with "Columns" dropdown
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
          <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ✅ Action Menu
          </h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Per-row actions with dropdown menu (3-dot icon)
          </p>
        </div>
      </div>
    </div>

    <!-- Tech Stack -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        Technology Stack
      </h3>
      <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg">
        <ul class="space-y-2 text-slate-700 dark:text-slate-300">
          <li>• <strong>TanStack Table v8</strong> - Headless table state management</li>
          <li>• <strong>Vue 3 Composition API</strong> - Reactive table instance</li>
          <li>• <strong>TypeScript Generics</strong> - Full type safety for data</li>
          <li>• <strong>shadcn-vue components</strong> - Base UI components</li>
          <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
        </ul>
      </div>
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
