<script setup lang="ts" generic="TData, TValue">
import { Input } from '@registry/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@registry/components/ui/table'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

// Props
const props = defineProps<{
  columns: ColumnDef<TData>[]
  data: TData[]
  searchPlaceholder?: string
}>()

// Filtering state
const filtering = ref('')

// Table instance with filtering
const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onGlobalFilterChange: (value) => { filtering.value = value },
  state: {
    get globalFilter() { return filtering.value },
  },
})
</script>

<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <div class="flex items-center py-4">
      <Input
        v-model="filtering"
        :placeholder="searchPlaceholder || 'Filter emails...'"
        class="max-w-sm"
      />
    </div>

    <!-- Table -->
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
