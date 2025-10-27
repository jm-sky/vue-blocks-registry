<script setup lang="ts" generic="TData, TValue">
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
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import Pagination from './Pagination.vue'
import type { ColumnDef } from '@tanstack/vue-table'

// Props
const props = defineProps<{
  columns: ColumnDef<TData>[]
  data: TData[]
  initialPageSize?: number
  pageSizeOptions?: number[]
}>()

// Pagination state
const page = ref(1)
const pageSize = ref(props.initialPageSize ?? 10)

// Table instance with pagination
const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: pageSize.value,
    },
  },
  onPaginationChange: (updater) => {
    const newPagination = typeof updater === 'function' 
      ? updater({ pageIndex: page.value - 1, pageSize: pageSize.value })
      : updater
    
    page.value = newPagination.pageIndex + 1
    pageSize.value = newPagination.pageSize
  },
  state: {
    get pagination() {
      return {
        pageIndex: page.value - 1,
        pageSize: pageSize.value,
      }
    },
  },
})

// Handle page changes
const handlePageChange = (newPage: number) => {
  page.value = newPage
  table.setPageIndex(newPage - 1)
}

// Handle page size changes
const handlePageSizeChange = (newPageSize: number) => {
  pageSize.value = newPageSize
  table.setPageSize(newPageSize)
  page.value = 1 // Reset to first page
  table.setPageIndex(0)
}
</script>

<template>
  <div class="space-y-4">
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

    <!-- Pagination -->
    <Pagination
      :page="page"
      :page-size="pageSize"
      :total="data.length"
      :page-size-options="pageSizeOptions"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
  </div>
</template>
