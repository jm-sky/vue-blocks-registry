<script setup lang="ts">
import { DataTable } from '@registry/components/data-table'
import { Button } from '@registry/components/ui/button'
import { ref } from 'vue'
import { columnsSortable } from './columns-sortable'
import { data } from './data'
import type { RowSelectionState } from '@tanstack/vue-table'

// v-model reactive state
const page = ref(1)
const pageSize = ref(10)
const rowSelection = ref<RowSelectionState>({})
const searchFilter = ref('')

// Example data
const tableData = data
</script>

<template>
  <div class="space-y-8 p-6">
    <h1 class="text-3xl font-bold">
      DataTable with Slots & v-model
    </h1>

    <!-- Example 1: Custom Toolbar -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        1. Custom Toolbar
      </h2>
      <p class="text-muted-foreground mb-4">
        Custom toolbar with additional actions and styling.
      </p>
      <DataTable
        v-model:page="page"
        v-model:page-size="pageSize"
        v-model:row-selection="rowSelection"
        :columns="columnsSortable"
        :data="tableData"
        :enable-row-selection="true"
      >
        <template #toolbar="{ table }">
          <div class="flex items-center justify-between py-4">
            <div class="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Import
              </Button>
              <span class="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                {{ table.getFilteredRowModel().rows.length }} items
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <input
                v-model="searchFilter"
                placeholder="Search..."
                class="max-w-sm px-3 py-2 border rounded-md"
              >
              <Button variant="outline" size="sm">
                Columns
              </Button>
            </div>
          </div>
        </template>
      </DataTable>
    </section>

    <!-- Example 2: Custom Empty State -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        2. Custom Empty State
      </h2>
      <p class="text-muted-foreground mb-4">
        Custom empty state with illustration and call-to-action.
      </p>
      <DataTable
        v-model:page="page"
        v-model:page-size="pageSize"
        :columns="columnsSortable"
        :data="[]"
      >
        <template #empty>
          <div class="flex flex-col items-center justify-center py-12">
            <div class="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg
                class="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">
              No data available
            </h3>
            <p class="text-muted-foreground text-center mb-4">
              There are no records to display. Try adjusting your filters or add some data.
            </p>
            <Button>
              Add New Record
            </Button>
          </div>
        </template>
      </DataTable>
    </section>

    <!-- Example 3: Custom Pagination -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        3. Custom Pagination
      </h2>
      <p class="text-muted-foreground mb-4">
        Custom pagination with different styling and additional info.
      </p>
      <DataTable
        v-model:page="page"
        v-model:page-size="pageSize"
        :columns="columnsSortable"
        :data="tableData"
      >
        <template #pagination="{ page: currentPage, pageSize: currentPageSize, total, handlePageChange }">
          <div class="flex items-center justify-between py-4">
            <div class="text-sm text-muted-foreground">
              Showing {{ (currentPage - 1) * currentPageSize + 1 }} to {{ Math.min(currentPage * currentPageSize, total) }} of {{ total }} entries
            </div>
            <div class="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                :disabled="currentPage <= 1"
                @click="handlePageChange(currentPage - 1)"
              >
                Previous
              </Button>
              <span class="px-3 py-1 text-sm bg-muted rounded">
                Page {{ currentPage }}
              </span>
              <Button
                variant="outline"
                size="sm"
                :disabled="currentPage * currentPageSize >= total"
                @click="handlePageChange(currentPage + 1)"
              >
                Next
              </Button>
            </div>
          </div>
        </template>
      </DataTable>
    </section>

    <!-- Example 4: Custom Selection Info -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        4. Custom Selection Info
      </h2>
      <p class="text-muted-foreground mb-4">
        Custom selection info with bulk actions.
      </p>
      <DataTable
        v-model:row-selection="rowSelection"
        :columns="columnsSortable"
        :data="tableData"
        :enable-row-selection="true"
      >
        <template #selection-info="{ selectedCount, totalCount }">
          <div v-if="selectedCount > 0" class="flex items-center justify-between py-4 bg-muted/50 rounded-lg px-4">
            <div class="flex items-center space-x-4">
              <span class="text-sm font-medium">
                {{ selectedCount }} of {{ totalCount }} selected
              </span>
              <Button variant="outline" size="sm">
                Delete Selected
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
            </div>
            <Button variant="ghost" size="sm" @click="rowSelection = {}">
              Clear Selection
            </Button>
          </div>
        </template>
      </DataTable>
    </section>

    <!-- Example 5: v-model Usage -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        5. v-model Usage
      </h2>
      <p class="text-muted-foreground mb-4">
        Using v-model for reactive state management.
      </p>
      <div class="mb-4 p-4 bg-muted rounded-lg">
        <h3 class="font-semibold mb-2">
          Current State:
        </h3>
        <p>Page: {{ page }}</p>
        <p>Page Size: {{ pageSize }}</p>
        <p>Selected Rows: {{ Object.keys(rowSelection).length }}</p>
      </div>
      <DataTable
        v-model:page="page"
        v-model:page-size="pageSize"
        v-model:row-selection="rowSelection"
        :columns="columnsSortable"
        :data="tableData"
        :enable-row-selection="true"
      />
    </section>
  </div>
</template>
