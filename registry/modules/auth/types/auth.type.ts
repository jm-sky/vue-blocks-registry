import type { AuthResponse, ChangePasswordData, ForgotPasswordData, LoginCredentials, RegisterCredentials, ResetPasswordData, User } from './user.type'

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  register(credentials: RegisterCredentials): Promise<AuthResponse>
  logout(): Promise<void>
  forgotPassword(data: ForgotPasswordData): Promise<{ message: string }>
  resetPassword(data: ResetPasswordData): Promise<{ message: string }>
  changePassword(data: ChangePasswordData): Promise<{ message: string }>
  getCurrentUser(): Promise<User>
}
