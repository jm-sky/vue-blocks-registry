// modules/auth/composables/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '../store/useAuthStore'
import { authService } from '../services/authService'
import { 
  authQueryKeys, 
  authRetryFunction, 
  authMutationRetryFunction 
} from '../utils/queryUtils'
import { getAuthConfig } from '../config/auth.config'
import type { 
  LoginCredentials, 
  RegisterCredentials, 
  ForgotPasswordData, 
  ResetPasswordData, 
  ChangePasswordData,
  User 
} from '../types/user'

/**
 * Hook for fetching current user data
 * Automatically refetches when token changes
 */
export function useCurrentUser() {
  const authStore = useAuthStore()
  const config = getAuthConfig()
  
  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: () => authService.getCurrentUser(),
    enabled: !!authStore.token, // Only fetch if user is authenticated
    staleTime: config.query.staleTime,
    retry: authRetryFunction,
  })
}

/**
 * Hook for user login with automatic user data fetching
 */
export function useLogin() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials)
      authStore.setToken(response.token)
      return response
    },
    onSuccess: async (data) => {
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
export function useRegister() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await authService.register(credentials)
      authStore.setToken(response.token)
      return response
    },
    onSuccess: async (data) => {
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
export function useLogout() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => authService.logout(),
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
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for reset password
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
    retry: authMutationRetryFunction,
  })
}

/**
 * Hook for change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => authService.changePassword(data),
    retry: authMutationRetryFunction,
  })
}

/**
 * Main auth composable with TanStack Query integration
 */
export function useAuth() {
  const authStore = useAuthStore()
  const queryClient = useQueryClient()
  
  // Queries
  const currentUserQuery = useCurrentUser()
  
  // Mutations
  const loginMutation = useLogin()
  const registerMutation = useRegister()
  const logoutMutation = useLogout()
  const forgotPasswordMutation = useForgotPassword()
  const resetPasswordMutation = useResetPassword()
  const changePasswordMutation = useChangePassword()
  
  // Computed values
  const user = currentUserQuery.data.value || authStore.user
  const isAuthenticated = !!authStore.token && !!user
  const isLoading = currentUserQuery.isLoading.value
  const isError = currentUserQuery.isError.value
  
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
    fetchUser,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    isChangePasswordLoading: changePasswordMutation.isPending,
    
    // Helpers
    updateUser,
  }
}
