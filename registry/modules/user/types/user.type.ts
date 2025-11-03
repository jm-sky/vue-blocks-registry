// modules/user/types/user.type.ts
import type { TULID } from '@registry/shared/types/base.type'

export interface User {
  id: TULID
  name: string
  email: string
  avatar?: string
}

export interface UpdateUserProfileData {
  name?: string
  email?: string
}

export interface AvatarUploadResponse {
  avatar: string
}

export interface IUserService {
  getProfile(): Promise<User>
  updateProfile(data: UpdateUserProfileData): Promise<User>
  uploadAvatar(file: File): Promise<AvatarUploadResponse>
  deleteAvatar(): Promise<{ message: string }>
}
