<script setup lang="ts" generic="TData, TValue">
import { Button } from '@registry/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@registry/components/ui/dropdown-menu'
import { Input } from '@registry/components/ui/input'
import { ChevronDown } from 'lucide-vue-next'
import type { Table } from '@tanstack/vue-table'

interface Props {
  table: Table<TData>
  searchPlaceholder?: string
  enableFiltering?: boolean
  enableColumnVisibility?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Filter...',
  enableFiltering: true,
  enableColumnVisibility: true,
})

const globalFilter = defineModel<string>('globalFilter', { default: '' })
const columnVisibility = defineModel<Record<string, boolean>>('columnVisibility', { default: {} })

const handleGlobalFilterChange = (value: string) => {
  globalFilter.value = value
}

const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
  // Toggle column visibility in table
  const column = props.table.getColumn(columnId)
  if (column) {
    column.toggleVisibility(visible)
  }

  // Update parent state
  const newVisibility = { ...columnVisibility.value, [columnId]: visible }
  columnVisibility.value = newVisibility
}
</script>

<template>
  <div v-if="enableFiltering || enableColumnVisibility" class="flex items-center justify-between py-4">
    <!-- Global Filter Input -->
    <Input
      v-if="enableFiltering"
      :model-value="globalFilter"
      :placeholder="searchPlaceholder"
      class="max-w-sm"
      @update:model-value="(value: string | number) => handleGlobalFilterChange(String(value))"
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
          @update:model-value="(value: boolean) => handleColumnVisibilityChange(column.id, value)"
        >
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
