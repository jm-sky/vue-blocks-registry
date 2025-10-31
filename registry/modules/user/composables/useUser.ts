// modules/user/composables/useUser.ts
import { getUserConfig } from '@registry/modules/user/config/user.config'
import { userService } from '@registry/modules/user/services/userService'
import {
  userMutationRetryFunction,
  userQueryKeys,
  userRetryFunction
} from '@registry/modules/user/utils/queryUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type {
  AvatarUploadResponse,
  IUserService,
  UpdateUserProfileData,
  User,
} from '@registry/modules/user/types/user.type'

/**
 * Hook for fetching user profile data
 */
export function useUserProfile(service?: IUserService) {
  const config = getUserConfig()

  return useQuery({
    queryKey: userQueryKeys.profile(),
    queryFn: () => (service ?? userService).getProfile(),
    staleTime: config.query.staleTime,
    retry: userRetryFunction,
  })
}

/**
 * Hook for updating user profile
 */
export function useUpdateProfile(service?: IUserService) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserProfileData) => (service ?? userService).updateProfile(data),
    onSuccess: (updatedUser: User) => {
      // Update profile cache
      queryClient.setQueryData(userQueryKeys.profile(), updatedUser)
      // Also invalidate to ensure consistency
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() })
    },
    retry: userMutationRetryFunction,
  })
}

/**
 * Hook for uploading user avatar
 */
export function useUploadAvatar(service?: IUserService) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => (service ?? userService).uploadAvatar(file),
    onSuccess: (response: AvatarUploadResponse) => {
      // Optimistically update profile with new avatar
      queryClient.setQueryData<User | undefined>(
        userQueryKeys.profile(),
        (oldData) => {
          if (oldData) {
            return { ...oldData, avatar: response.avatar }
          }
          return oldData
        }
      )
      // Invalidate to ensure consistency
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() })
    },
    retry: userMutationRetryFunction,
  })
}

/**
 * Hook for deleting user avatar
 */
export function useDeleteAvatar(service?: IUserService) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => (service ?? userService).deleteAvatar(),
    onSuccess: () => {
      // Optimistically remove avatar from profile
      queryClient.setQueryData<User | undefined>(
        userQueryKeys.profile(),
        (oldData) => {
          if (oldData) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { avatar, ...rest } = oldData
            return rest
          }
          return oldData
        }
      )
      // Invalidate to ensure consistency
      void queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() })
    },
    retry: userMutationRetryFunction,
  })
}

/**
 * Main user composable with TanStack Query integration
 */
export function useUser(service?: IUserService) {
  const queryClient = useQueryClient()

  // Queries
  const profileQuery = useUserProfile(service)

  // Mutations
  const updateProfileMutation = useUpdateProfile(service)
  const uploadAvatarMutation = useUploadAvatar(service)
  const deleteAvatarMutation = useDeleteAvatar(service)

  // Computed values
  const profile = profileQuery.data
  const isLoading = profileQuery.isLoading
  const isError = profileQuery.isError
  const error = profileQuery.error

  // Helper function to refresh profile data
  const fetchProfile = () => {
    return queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() })
  }

  // Helper function to update profile data optimistically
  const updateProfileData = (updater: (oldProfile: User | null) => User | null) => {
    queryClient.setQueryData(userQueryKeys.profile(), updater)
  }

  return {
    // Data
    profile,
    isLoading,
    isError,
    error,

    // Queries
    profileQuery,

    // Actions
    updateProfile: updateProfileMutation.mutateAsync,
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    deleteAvatar: deleteAvatarMutation.mutateAsync,
    fetchProfile,

    // Mutation states
    isUpdatingProfile: updateProfileMutation.isPending,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isDeletingAvatar: deleteAvatarMutation.isPending,

    // Helpers
    updateProfileData,
  }
}

