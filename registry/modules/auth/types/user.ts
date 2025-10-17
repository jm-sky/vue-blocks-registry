// modules/auth/types/user.ts
import type { TULID } from '@/shared/types/base.type'

export interface User {
  id: TULID
  email: string
  name?: string
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  password_confirmation: string
  name?: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export interface ChangePasswordData {
  current_password: string
  password: string
  password_confirmation: string
}

export interface AuthResponse {
  user: User
  token: string
}
