// modules/settings/composables/useSettings.ts
import { settingsService } from '@registry/modules/settings/services/settingsService'
import {
  settingsMutationRetryFunction,
  settingsQueryKeys,
  settingsRetryFunction
} from '@registry/modules/settings/utils/queryUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { ISettingsService, Settings, UpdateSettingsData } from '@registry/modules/settings/types/settings.type'

export function useSettingsQuery(service?: ISettingsService) {
  return useQuery({
    queryKey: settingsQueryKeys.me(),
    queryFn: () => (service ?? settingsService).getSettings(),
    staleTime: 5 * 60 * 1000,
    retry: settingsRetryFunction,
  })
}

export function useUpdateSettings(service?: ISettingsService) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSettingsData) => (service ?? settingsService).updateSettings(data),
    onSuccess: (updated: Settings) => {
      queryClient.setQueryData(settingsQueryKeys.me(), updated)
      void queryClient.invalidateQueries({ queryKey: settingsQueryKeys.me() })
    },
    retry: settingsMutationRetryFunction,
  })
}

export function useSettings(service?: ISettingsService) {
  const queryClient = useQueryClient()

  const settingsQuery = useSettingsQuery(service)
  const updateMutation = useUpdateSettings(service)

  const settings = settingsQuery.data
  const isLoading = settingsQuery.isLoading
  const isError = settingsQuery.isError
  const error = settingsQuery.error

  const refetchSettings = () => queryClient.invalidateQueries({ queryKey: settingsQueryKeys.me() })

  return {
    settingsQuery,
    settings,
    isLoading,
    isError,
    error,
    updateSettings: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    refetchSettings,
  }
}


