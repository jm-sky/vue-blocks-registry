<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@registry/components/ui/dropdown-menu'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-vue-next'

interface Props {
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  pageSizeOptions: () => [10, 20, 30, 40, 50, 100, 500],
})

const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [pageSize: number]
}>()

const totalPages = Math.ceil(props.total / props.pageSize)
const canPreviousPage = props.page > 1
const canNextPage = props.page < totalPages

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    emit('update:page', page)
  }
}

const setPageSize = (size: number) => {
  emit('update:pageSize', size)
  // Reset to first page when changing page size
  emit('update:page', 1)
}
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ total }} row(s) total.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="h-8 w-[70px]">
              {{ pageSize }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              v-for="size in pageSizeOptions"
              :key="size"
              @click="setPageSize(size)"
            >
              {{ size }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {{ page }} of {{ totalPages }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          :disabled="!canPreviousPage"
          @click="goToPage(1)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft class="size-4" />
        </Button>
        <Button
          variant="outline"
          class="size-8 p-0"
          :disabled="!canPreviousPage"
          @click="goToPage(page - 1)"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeft class="size-4" />
        </Button>
        <Button
          variant="outline"
          class="size-8 p-0"
          :disabled="!canNextPage"
          @click="goToPage(page + 1)"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRight class="size-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          :disabled="!canNextPage"
          @click="goToPage(totalPages)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRight class="size-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
