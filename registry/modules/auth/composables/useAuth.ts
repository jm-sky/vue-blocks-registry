import { getAuthConfig } from '@registry/modules/auth/config/auth.config'
import { authService } from '@registry/modules/auth/services/authService'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import {
  authMutationRetryFunction,
  authQueryKeys,
  authRetryFunction
} from '@registry/modules/auth/utils/queryUtils'
// modules/auth/composables/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import type { IAuthService } from '@registry/modules/auth/types/auth.type'
import type {
  ChangePasswordData,
  ForgotPasswordData,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  User
} from '@registry/modules/auth/types/user.type'
import type { AuthResponse } from '@registry/modules/auth/types/user.type'

/**
 * Hook for fetching current user data
 * Automatically refetches when token changes
 */
export function useCurrentUser(service?: IAuthService) {
  const authStore = useAuthStore()
  const config = getAuthConfig()

  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: () => (service ?? authService).getCurrentUser(),
    enabled: !!authStore.token, // Only fetch if user is authenticated
    staleTime: config.query.staleTime,
    retry: authRetryFunction,
  })
}

/**
 * Hook for user login with automatic user data fetching
 */
export function useLogin(service?: IAuthService) {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await (service ?? authService).login(credentials)
      authStore.setToken(response.accessToken)
      return response
    },
    onSuccess: async (data: AuthResponse) => {
      // Set user from login response
      authStore.setUser(data.user)

      // Invalidate and refetch user data to ensure consistency
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.me() })
    },
    onError: () => {
      // Clear auth state on error
      authStore.logout()
    },
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for user registration with automatic user data fetching
 */
export function useRegister(service?: IAuthService) {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await (service ?? authService).register(credentials)
      authStore.setToken(response.accessToken)
      return response
    },
    onSuccess: async (data: AuthResponse) => {
      // Set user from registration response
      authStore.setUser(data.user)

      // Invalidate and refetch user data to ensure consistency
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.me() })
    },
    onError: () => {
      // Clear auth state on error
      authStore.logout()
    },
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for user logout with cache cleanup
 */
export function useLogout(service?: IAuthService) {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => (service ?? authService).logout(),
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: authQueryKeys.all })

      // Clear auth store
      authStore.logout()
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      queryClient.removeQueries({ queryKey: authQueryKeys.all })
      authStore.logout()
    },
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for forgot password
 */
export function useForgotPassword(service?: IAuthService) {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => (service ?? authService).forgotPassword(data),
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for reset password
 */
export function useResetPassword(service?: IAuthService) {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => (service ?? authService).resetPassword(data),
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for change password
 */
export function useChangePassword(service?: IAuthService) {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => (service ?? authService).changePassword(data),
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for delete account
 */
export function useDeleteAccount(service?: IAuthService) {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ confirmation, password }: { confirmation: string; password?: string }) =>
      (service ?? authService).deleteAccount(confirmation, password),
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: authQueryKeys.all })

      // Clear auth store
      authStore.logout()
    },
    onError: () => {
      // Even if deletion fails, we keep the user logged in
      // (in case of temporary network issues)
    },
    retry: authMutationRetryFunction,
  })
}

/**
 * Main auth composable with TanStack Query integration
 */
export function useAuth(service?: IAuthService) {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()

  // Queries
  const currentUserQuery = useCurrentUser(service)

  // Mutations
  const loginMutation = useLogin(service)
  const registerMutation = useRegister(service)
  const logoutMutation = useLogout(service)
  const forgotPasswordMutation = useForgotPassword(service)
  const resetPasswordMutation = useResetPassword(service)
  const changePasswordMutation = useChangePassword(service)
  const deleteAccountMutation = useDeleteAccount(service)

  // Computed values (keep refs reactive)
  const user = computed<User | null>(() => currentUserQuery.data.value ?? authStore.user)
  const isAuthenticated = computed<boolean>(() => !!authStore.token && !!user.value)
  const isLoading = currentUserQuery.isLoading
  const isError = currentUserQuery.isError

  // Helper function to refresh user data
  const fetchUser = () => {
    return queryClient.invalidateQueries({ queryKey: authQueryKeys.me() })
  }

  // Helper function to update user data optimistically
  const updateUser = (updater: (oldUser: User | null) => User | null) => {
    queryClient.setQueryData(authQueryKeys.me(), updater)
    authStore.setUser(updater(authStore.user))
  }

  return {
    // Data
    user,
    isAuthenticated,
    isLoading,
    isError,

    // Queries
    currentUserQuery,

    // Actions
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    changePassword: changePasswordMutation.mutateAsync,
    deleteAccount: deleteAccountMutation.mutateAsync,
    fetchUser,

    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    isChangePasswordLoading: changePasswordMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,

    // Helpers
    updateUser,
  }
}
