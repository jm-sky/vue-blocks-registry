// modules/auth/types/user.ts
import type { TDateTime, TULID } from '@registry/shared/types/base.type'

export interface User {
  id: TULID
  name: string
  email: string
  avatar?: string
  isActive: boolean
  isAdmin: boolean
  createdAt: TDateTime
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  email: string
  token: string
  password: string
  passwordConfirmation: string
}

export interface ChangePasswordData {
  currentPassword: string
  password: string
  passwordConfirmation: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}
