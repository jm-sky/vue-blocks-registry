// modules/auth/composables/useTwoFactor.ts
import { mockTwoFactorService } from '@registry/modules/auth/services/mockTwoFactorService'
import { useQuery } from '@tanstack/vue-query'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

// Query keys for 2FA
export const twoFactorQueryKeys = {
  all: ['2fa'] as const,
  status: () => [...twoFactorQueryKeys.all, 'status'] as const,
  totpStatus: () => [...twoFactorQueryKeys.all, 'totp', 'status'] as const,
  webauthnStatus: () => [...twoFactorQueryKeys.all, 'webauthn', 'status'] as const,
  passkeys: () => [...twoFactorQueryKeys.all, 'passkeys'] as const,
}

/**
 * Hook for fetching 2FA status
 */
export function useTwoFactorStatus(service?: ITwoFactorService) {
  return useQuery({
    queryKey: twoFactorQueryKeys.status(),
    queryFn: () => (service ?? mockTwoFactorService).getTwoFactorStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for fetching TOTP status
 */
export function useTotpStatus(service?: ITwoFactorService) {
  return useQuery({
    queryKey: twoFactorQueryKeys.totpStatus(),
    queryFn: () => (service ?? mockTwoFactorService).getTotpStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for fetching WebAuthn status
 */
export function useWebAuthnStatus(service?: ITwoFactorService) {
  return useQuery({
    queryKey: twoFactorQueryKeys.webauthnStatus(),
    queryFn: () => (service ?? mockTwoFactorService).getWebAuthnStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for fetching passkeys list
 */
export function usePasskeys(service?: ITwoFactorService) {
  return useQuery({
    queryKey: twoFactorQueryKeys.passkeys(),
    queryFn: () => (service ?? mockTwoFactorService).listPasskeys(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
