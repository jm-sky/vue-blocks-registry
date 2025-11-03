<script setup lang="ts">
import { DataTable } from '@registry/components/data-table'
import { useLogs } from '@registry/modules/logs/composables/useLogs'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { LogEntry } from '@registry/modules/logs/types/logs.type'
import type { ColumnDef } from '@tanstack/vue-table'

const { t } = useI18n()
const { logs, isLoading, isError, error } = useLogs()

const rows = computed<LogEntry[]>(() => logs.value ?? [])

const columns: ColumnDef<LogEntry>[] = [
  {
    accessorKey: 'timestamp',
    header: () => t('logs.page.time'),
    cell: ({ row }) => row.original.timestamp,
  },
  {
    accessorKey: 'level',
    header: () => t('logs.page.level'),
    cell: ({ row }) => row.original.level.toUpperCase(),
  },
  {
    accessorKey: 'message',
    header: () => t('logs.page.message'),
    cell: ({ row }) => row.original.message,
  },
]
</script>

<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="p-4 text-sm text-muted-foreground">
      {{ t('logs.page.loading') }}
    </div>
    <div v-else-if="isError" class="p-4 text-sm text-destructive">
      {{ t('logs.page.error_prefix') }}: {{ (error as unknown as Error)?.message ?? 'Unknown error' }}
    </div>
    <DataTable v-else :columns="columns" :data="rows">
      <template #empty>
        <div class="p-4 text-sm text-muted-foreground">
          {{ t('logs.page.empty') }}
        </div>
      </template>
    </DataTable>
  </div>
</template>

