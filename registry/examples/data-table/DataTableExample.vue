<script setup lang="ts">
import { DataTable } from '@registry/components/data-table'
import { ref } from 'vue'
import { columnsSortable } from './columns-sortable'
import { columnsWithSelection } from './columns-with-selection'
import { data } from './data'
import type { RowSelectionState } from '@tanstack/vue-table'

// Example 1: Basic DataTable with all features
const basicColumns = columnsSortable
const basicData = data

// Example 2: DataTable with row selection
const selectionColumns = columnsWithSelection
const selectionData = data
const rowSelection = ref<RowSelectionState>({})

// Example 3: Server-side pagination
const serverPage = ref(1)
const serverPageSize = ref(10)
const serverTotal = ref(1000) // Simulated total from server

const handleServerPageChange = (page: number) => {
  serverPage.value = page
  console.log('Server page changed to:', page)
  // Here you would typically make an API call
}

const handleServerPageSizeChange = (pageSize: number) => {
  serverPageSize.value = pageSize
  serverPage.value = 1 // Reset to first page
  console.log('Server page size changed to:', pageSize)
  // Here you would typically make an API call
}

// Example 4: Minimal DataTable (no features)
const minimalColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
]
</script>

<template>
  <div class="space-y-8 p-6">
    <h1 class="text-3xl font-bold">
      DataTable Examples
    </h1>

    <!-- Example 1: Basic DataTable with all features -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        1. Basic DataTable (All Features)
      </h2>
      <p class="text-muted-foreground mb-4">
        Sorting, filtering, pagination, and column visibility enabled by default.
      </p>
      <DataTable
        :columns="basicColumns"
        :data="basicData"
        search-placeholder="Search payments..."
      />
    </section>

    <!-- Example 2: DataTable with row selection -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        2. DataTable with Row Selection
      </h2>
      <p class="text-muted-foreground mb-4">
        Enable row selection with checkboxes. Selected rows: {{ Object.keys(rowSelection).length }}
      </p>
      <DataTable
        :columns="selectionColumns"
        :data="selectionData"
        :enable-row-selection="true"
        search-placeholder="Search payments..."
        @update:row-selection="(selection) => rowSelection = selection"
      />
    </section>

    <!-- Example 3: Server-side pagination -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        3. Server-side Pagination
      </h2>
      <p class="text-muted-foreground mb-4">
        Pagination controlled by server. Current page: {{ serverPage }}, Page size: {{ serverPageSize }}
      </p>
      <DataTable
        :columns="basicColumns"
        :data="basicData.slice(0, serverPageSize)"
        :total="serverTotal"
        :page="serverPage"
        :page-size="serverPageSize"
        :enable-filtering="false"
        :enable-sorting="false"
        search-placeholder="Search payments..."
        @update:page="handleServerPageChange"
        @update:page-size="handleServerPageSizeChange"
      />
    </section>

    <!-- Example 4: Minimal DataTable -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        4. Minimal DataTable
      </h2>
      <p class="text-muted-foreground mb-4">
        Only basic table functionality, no additional features.
      </p>
      <DataTable
        :columns="minimalColumns"
        :data="basicData"
        :enable-sorting="false"
        :enable-filtering="false"
        :enable-pagination="false"
        :enable-column-visibility="false"
      />
    </section>

    <!-- Example 5: Custom configuration -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        5. Custom Configuration
      </h2>
      <p class="text-muted-foreground mb-4">
        Custom page size options and disabled column visibility.
      </p>
      <DataTable
        :columns="basicColumns"
        :data="basicData"
        :page-size-options="[5, 10, 25, 50]"
        :enable-column-visibility="false"
        search-placeholder="Custom search..."
      />
    </section>
  </div>
</template>
