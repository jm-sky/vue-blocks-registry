<script setup lang="ts" generic="TData, TValue">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@registry/components/ui/table'
import { valueUpdater } from '@registry/lib/utils'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { computed, ref } from 'vue'
import DataTableEmpty from './DataTableEmpty.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import Pagination from './Pagination.vue'
import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

// Props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // Feature toggles
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableRowSelection?: boolean
  enableColumnVisibility?: boolean
  // Filtering
  searchPlaceholder?: string
  globalFilterFn?: (row: TData, filterValue: string) => boolean
  // Pagination
  initialPageSize?: number
  pageSizeOptions?: number[]
  // Server-side pagination
  total?: number
  // Events
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const props = withDefaults(defineProps<DataTableProps<TData, TValue>>(), {
  enableSorting: true,
  enableFiltering: true,
  enablePagination: true,
  enableRowSelection: false,
  enableColumnVisibility: true,
  searchPlaceholder: 'Filter...',
  initialPageSize: 10,
  pageSizeOptions: () => [10, 20, 50, 100, 500],
})

// v-model support using defineModel
const page = defineModel<number>('page', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 10 })
const rowSelection = defineModel<RowSelectionState>('rowSelection', { default: {} })

// Emits for non-v-model events
const emit = defineEmits<{
  'update:sorting': [sorting: SortingState]
  'update:globalFilter': [filter: string]
  'update:columnVisibility': [visibility: VisibilityState]
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  'empty-action': []
}>()

// State
const sorting = ref<SortingState>([])
const globalFilter = ref('')
const columnVisibility = ref<VisibilityState>({})

// Pagination state (client-side or server-side)
const isServerSide = computed(() => props.total !== undefined)
const currentPage = computed({
  get: () => isServerSide.value ? page.value : page.value,
  set: (value) => {
    page.value = value
    if (isServerSide.value) {
      emit('update:page', value)
      props.onPageChange?.(value)
    }
  }
})
const currentPageSize = computed({
  get: () => isServerSide.value ? pageSize.value : pageSize.value,
  set: (value) => {
    pageSize.value = value
    if (isServerSide.value) {
      emit('update:pageSize', value)
      props.onPageSizeChange?.(value)
    }
  }
})

// Table instance
const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  enableRowSelection: props.enableRowSelection,
  enableMultiRowSelection: props.enableRowSelection,
  getSortedRowModel: props.enableSorting ? getSortedRowModel() : undefined,
  getFilteredRowModel: props.enableFiltering ? getFilteredRowModel() : undefined,
  getPaginationRowModel: props.enablePagination ? getPaginationRowModel() : undefined,
  globalFilterFn: props.globalFilterFn ? (row, columnId, filterValue) => {
    return props.globalFilterFn ? props.globalFilterFn(row.original, filterValue) : false
  } : 'includesString',
  onSortingChange: props.enableSorting
    ? (updaterOrValue) => {
        valueUpdater(updaterOrValue, sorting)
        emit('update:sorting', sorting.value)
      }
    : undefined,
  onGlobalFilterChange: props.enableFiltering
    ? (value) => {
        globalFilter.value = value
        emit('update:globalFilter', value)
      }
    : undefined,
  onColumnVisibilityChange: props.enableColumnVisibility
    ? (updaterOrValue) => {
        valueUpdater(updaterOrValue, columnVisibility)
        emit('update:columnVisibility', columnVisibility.value)
      }
    : undefined,
  onRowSelectionChange: props.enableRowSelection
    ? (updaterOrValue) => {
        valueUpdater(updaterOrValue, rowSelection)
      }
    : undefined,
  onPaginationChange: props.enablePagination && !isServerSide.value
    ? (updater) => {
        const newPagination = typeof updater === 'function'
          ? updater({ pageIndex: currentPage.value - 1, pageSize: currentPageSize.value })
          : updater

        currentPage.value = newPagination.pageIndex + 1
        currentPageSize.value = newPagination.pageSize
      }
    : undefined,
  state: {
    get sorting() { return props.enableSorting ? sorting.value : undefined },
    get globalFilter() { return props.enableFiltering ? globalFilter.value : undefined },
    get columnVisibility() { return props.enableColumnVisibility ? columnVisibility.value : undefined },
    get rowSelection() { return props.enableRowSelection ? rowSelection.value : undefined },
    get pagination() {
      return props.enablePagination ? {
        pageIndex: currentPage.value - 1,
        pageSize: currentPageSize.value,
      } : undefined
    },
  },
  initialState: props.enablePagination ? {
    pagination: {
      pageIndex: 0,
      pageSize: currentPageSize.value,
    },
  } : undefined,
})

// Computed values
const totalRows = computed(() => isServerSide.value ? (props.total ?? 0) : props.data.length)
const isEmpty = computed(() => table.getRowModel().rows.length === 0)
const selectedRowsCount = computed(() => Object.keys(rowSelection.value).length)

// Event handlers
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  if (!isServerSide.value) {
    table.setPageIndex(newPage - 1)
  }
}

const handlePageSizeChange = (newPageSize: number) => {
  currentPageSize.value = newPageSize
  if (!isServerSide.value) {
    table.setPageSize(newPageSize)
    currentPage.value = 1
    table.setPageIndex(0)
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Toolbar Slot -->
    <slot
      name="toolbar"
      :table="table"
      :global-filter="globalFilter"
      :column-visibility="columnVisibility"
    >
      <DataTableToolbar
        v-model:global-filter="globalFilter"
        v-model:column-visibility="columnVisibility"
        :table="table"
        :search-placeholder="searchPlaceholder"
        :enable-filtering="enableFiltering"
        :enable-column-visibility="enableColumnVisibility"
      />
    </slot>

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
          <template v-if="!isEmpty">
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
            <!-- Empty State Slot -->
            <slot name="empty" :table="table" :columns="columns">
              <DataTableEmpty
                :table="table"
                :columns="columns"
                @action="$emit('empty-action')"
              />
            </slot>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination Slot -->
    <slot
      name="pagination"
      :table="table"
      :page="currentPage"
      :page-size="currentPageSize"
      :total="totalRows"
      :handle-page-change="handlePageChange"
      :handle-page-size-change="handlePageSizeChange"
    >
      <Pagination
        v-if="enablePagination"
        :page="currentPage"
        :page-size="currentPageSize"
        :total="totalRows"
        :page-size-options="pageSizeOptions"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </slot>

    <!-- Row Selection Info Slot -->
    <slot
      name="selection-info"
      :table="table"
      :selected-count="selectedRowsCount"
      :total-count="table.getFilteredRowModel().rows.length"
    >
      <div v-if="enableRowSelection && selectedRowsCount > 0" class="flex-1 text-sm text-muted-foreground">
        {{ selectedRowsCount }} of {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
    </slot>
  </div>
</template>
