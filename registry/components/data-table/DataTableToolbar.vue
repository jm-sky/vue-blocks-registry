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
  globalFilter: string
  columnVisibility: Record<string, boolean>
  searchPlaceholder?: string
  enableFiltering?: boolean
  enableColumnVisibility?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Filter...',
  enableFiltering: true,
  enableColumnVisibility: true,
})

const emit = defineEmits<{
  'update:globalFilter': [value: string]
  'update:columnVisibility': [value: Record<string, boolean>]
}>()

const handleGlobalFilterChange = (value: string) => {
  emit('update:globalFilter', value)
}

const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
  const newVisibility = { ...props.columnVisibility, [columnId]: visible }
  emit('update:columnVisibility', newVisibility)
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
          @update:checked="(value: boolean) => handleColumnVisibilityChange(column.id, value)"
        >
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
