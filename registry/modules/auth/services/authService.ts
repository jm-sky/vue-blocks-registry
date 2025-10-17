// modules/auth/services/authService.ts
import { httpClient } from '@registry/shared/services/httpClient'
import { authInterceptor } from '@registry/shared/services/auth.interceptor'
import type {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  AuthResponse,
  User,
} from '../types/user'

// Dodaj interceptor do httpClient
httpClient.interceptors.request.use(authInterceptor)

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>('/auth/register', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout')
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>('/auth/forgot-password', data)
    return response.data
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>('/auth/reset-password', data)
    return response.data
  },

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>('/auth/change-password', data)
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/auth/me')
    return response.data
  },
}
