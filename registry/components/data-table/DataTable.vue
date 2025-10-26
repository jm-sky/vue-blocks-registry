<script setup lang="ts" generic="TData, TValue">
import { Button } from '@registry/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@registry/components/ui/dropdown-menu'
import { Input } from '@registry/components/ui/input'
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
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref } from 'vue'
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
  // Pagination
  initialPageSize?: number
  pageSizeOptions?: number[]
  // Server-side pagination
  total?: number
  page?: number
  pageSize?: number
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
  pageSizeOptions: () => [10, 20, 30, 40, 50, 100, 500],
})

// Emits
const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
  'update:rowSelection': [selection: RowSelectionState]
}>()

// State
const sorting = ref<SortingState>([])
const globalFilter = ref('')
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})

// Pagination state (client-side or server-side)
const isServerSide = computed(() => props.total !== undefined)
const currentPage = ref(props.page ?? 1)
const currentPageSize = ref(props.pageSize ?? props.initialPageSize)

// Table instance
const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.enableSorting ? getSortedRowModel() : undefined,
  getFilteredRowModel: props.enableFiltering ? getFilteredRowModel() : undefined,
  getPaginationRowModel: props.enablePagination ? getPaginationRowModel() : undefined,
  onSortingChange: props.enableSorting 
    ? (updaterOrValue) => { valueUpdater(updaterOrValue, sorting) }
    : undefined,
  onGlobalFilterChange: props.enableFiltering 
    ? (value) => { globalFilter.value = value }
    : undefined,
  onColumnVisibilityChange: props.enableColumnVisibility
    ? (updaterOrValue) => { valueUpdater(updaterOrValue, columnVisibility) }
    : undefined,
  onRowSelectionChange: props.enableRowSelection
    ? (updaterOrValue) => {
        valueUpdater(updaterOrValue, rowSelection)
        emit('update:rowSelection', rowSelection.value)
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

// Event handlers
const handlePageChange = (page: number) => {
  if (isServerSide.value) {
    emit('update:page', page)
    props.onPageChange?.(page)
  } else {
    currentPage.value = page
    table.setPageIndex(page - 1)
  }
}

const handlePageSizeChange = (pageSize: number) => {
  if (isServerSide.value) {
    emit('update:pageSize', pageSize)
    props.onPageSizeChange?.(pageSize)
  } else {
    currentPageSize.value = pageSize
    table.setPageSize(pageSize)
    currentPage.value = 1
    table.setPageIndex(0)
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Toolbar -->
    <div v-if="enableFiltering || enableColumnVisibility" class="flex items-center justify-between py-4">
      <!-- Global Filter Input -->
      <Input
        v-if="enableFiltering"
        v-model="globalFilter"
        :placeholder="searchPlaceholder"
        class="max-w-sm"
      />

      <!-- Column Visibility Toggle -->
      <DropdownMenu v-if="enableColumnVisibility">
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns
            <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="(value: boolean) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
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

    <!-- Pagination -->
    <Pagination
      v-if="enablePagination"
      :page="currentPage"
      :page-size="currentPageSize"
      :total="totalRows"
      :page-size-options="pageSizeOptions"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />

    <!-- Row Selection Info -->
    <div v-if="enableRowSelection && Object.keys(rowSelection).length > 0" class="flex-1 text-sm text-muted-foreground">
      {{ Object.keys(rowSelection).length }} of {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
  </div>
</template>
