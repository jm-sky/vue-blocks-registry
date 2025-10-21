// modules/auth/services/authService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import { mockAuthService } from './mockAuthService'
import type {
  AuthResponse,
  ChangePasswordData,
  ForgotPasswordData,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  User,
} from '@registry/modules/auth/types/user'

// Check if we should use mock service (for demo purposes)
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true'

// Real API implementation
const realAuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', data)
    return response.data
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', data)
    return response.data
  },

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/change-password', data)
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  },
}

// Export the appropriate service based on environment
export const authService = USE_MOCK ? mockAuthService : realAuthService
