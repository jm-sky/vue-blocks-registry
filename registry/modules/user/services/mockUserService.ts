// Mock user service for demo purposes (no real backend)
import type { AvatarUploadResponse, IUserService, UpdateUserProfileData, User } from '@registry/modules/user/types/user.type'

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let mockUser: User = {
  id: 'usr_demo',
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
}

class MockUserService implements IUserService {
  async getProfile(): Promise<User> {
    await delay(200)
    return { ...mockUser }
  }

  async updateProfile(data: UpdateUserProfileData): Promise<User> {
    await delay(300)
    mockUser = { ...mockUser, ...data }
    return { ...mockUser }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async uploadAvatar(file: File): Promise<AvatarUploadResponse> {
    await delay(400)
    // In mock, we ignore the file and generate a new avatar URL based on timestamp
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(mockUser.name)}&background=random&v=${Date.now()}`
    mockUser = { ...mockUser, avatar }
    return { avatar }
  }

  async deleteAvatar(): Promise<{ message: string }> {
    await delay(200)
    mockUser = { ...mockUser, avatar: undefined }
    return { message: 'Avatar removed' }
  }
}

export const mockUserService = new MockUserService()


