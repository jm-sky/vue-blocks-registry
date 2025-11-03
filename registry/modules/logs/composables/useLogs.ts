// modules/logs/composables/useLogs.ts
import { logsService } from '@registry/modules/logs/services/logsService'
import { logsQueryKeys, logsRetryFunction } from '@registry/modules/logs/utils/queryUtils'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { reactive, toRefs, watch } from 'vue'
import type { LogsFilter } from '@registry/modules/logs/types/logs.type'

export function useLogs(initial?: LogsFilter) {
  const queryClient = useQueryClient()
  const filters = reactive<LogsFilter>({ level: initial?.level, query: initial?.query })

  const query = useQuery({
    queryKey: logsQueryKeys.list(filters),
    queryFn: () => logsService.getLogs(filters),
    staleTime: 60_000,
    retry: logsRetryFunction,
  })

  // Refetch when filters change
  watch(filters, () => {
    void queryClient.invalidateQueries({ queryKey: logsQueryKeys.list(filters) })
  }, { deep: true })

  return {
    ...toRefs(filters),
    logs: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}


