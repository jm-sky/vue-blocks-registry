// modules/auth/composables/useTotp.ts
import { mockTwoFactorService } from '@registry/modules/auth/services/mockTwoFactorService'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { twoFactorQueryKeys } from './useTwoFactor'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

/**
 * Hook for setting up TOTP
 */
export function useSetupTotp(service?: ITwoFactorService) {
  return useMutation({
    mutationFn: async () => {
      return (service ?? mockTwoFactorService).setupTotp()
    },
    onSuccess: () => {
      // Don't invalidate status yet - only after verification
    },
  })
}

/**
 * Hook for verifying TOTP code
 */
export function useVerifyTotp(service?: ITwoFactorService) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string) => {
      return (service ?? mockTwoFactorService).verifyTotp(code)
    },
    onSuccess: async (data) => {
      if (data.verified) {
        // Invalidate all 2FA queries to refresh status
        await queryClient.invalidateQueries({ queryKey: twoFactorQueryKeys.all })
      }
    },
  })
}

/**
 * Hook for disabling TOTP
 */
export function useDisableTotp(service?: ITwoFactorService) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      return (service ?? mockTwoFactorService).disableTotp()
    },
    onSuccess: async () => {
      // Invalidate all 2FA queries to refresh status
      await queryClient.invalidateQueries({ queryKey: twoFactorQueryKeys.all })
    },
  })
}
