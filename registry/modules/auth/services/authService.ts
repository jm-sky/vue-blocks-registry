// modules/auth/services/authService.ts
import { apiClient } from '@registry/shared/services/apiClient'
import type { IAuthService } from '@registry/modules/auth/types/auth.type'
import type {
  AuthResponse,
  ChangePasswordData,
  ForgotPasswordData,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  User,
} from '@registry/modules/auth/types/user.type'

class AuthService implements IAuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return response.data
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials)
    return response.data
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', data)
    return response.data
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', data)
    return response.data
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/change-password', data)
    return response.data
  }

  async getCurrentUser(): Promise<User> {
    // Token is sent via apiClient interceptor (Authorization header)
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  }

  async deleteAccount(confirmation: string, password?: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>('/auth/account', {
      data: { confirmation, password },
    })
    return response.data
  }
}

export const authService = new AuthService()
