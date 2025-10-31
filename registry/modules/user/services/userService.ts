// modules/user/services/userService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import type {
  AvatarUploadResponse,
  IUserService,
  UpdateUserProfileData,
  User,
} from '@registry/modules/user/types/user.type'

class UserService implements IUserService {
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/users/me')
    return response.data
  }

  async updateProfile(data: UpdateUserProfileData): Promise<User> {
    const response = await apiClient.patch<User>('/users/me', data)
    return response.data
  }

  async uploadAvatar(file: File): Promise<AvatarUploadResponse> {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await apiClient.post<AvatarUploadResponse>(
      '/users/me/avatar',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return response.data
  }

  async deleteAvatar(): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      '/users/me/avatar'
    )
    return response.data
  }
}

export const userService = new UserService()
