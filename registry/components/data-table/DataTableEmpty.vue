<script setup lang="ts" generic="TData, TValue">
import { Button } from '@registry/components/ui/button'
import { TableEmpty } from '@registry/components/ui/table'
import { FileText, Plus } from 'lucide-vue-next'
import type { Table } from '@tanstack/vue-table'

interface Props {
  table: Table<TData>
  columns: unknown[]
  title?: string
  description?: string
  actionText?: string
  showAction?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'No results found',
  description: 'There are no records to display.',
  actionText: 'Add New Record',
  showAction: false,
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <TableEmpty :colspan="columns.length">
    <div class="flex flex-col items-center justify-center py-12">
      <div class="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
        <FileText class="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 class="text-lg font-semibold mb-2">
        {{ title }}
      </h3>
      <p class="text-muted-foreground text-center mb-4">
        {{ description }}
      </p>
      <Button v-if="showAction" @click="emit('action')">
        <Plus class="w-4 h-4 mr-2" />
        {{ actionText }}
      </Button>
    </div>
  </TableEmpty>
</template>
