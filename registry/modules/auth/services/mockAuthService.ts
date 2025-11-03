// Mock auth service for demo purposes (no real backend needed)
import { HttpStatusCode } from 'axios'
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

// Mock user database (in-memory)
const mockUsers = new Map<string, { email: string; password: string; name: string }>([
  ['demo@example.com', { email: 'demo@example.com', password: 'password123', name: 'Demo User' }],
  ['test@test.com', { email: 'test@test.com', password: 'test1234', name: 'Test User' }],
])

// Mock tokens storage
const mockTokens = new Map<string, string>()

// Helper to generate mock JWT token
function generateMockToken(email: string): string {
  const token = `mock_jwt_${email}_${Date.now()}`
  mockTokens.set(token, email)
  return token
}

// Helper to create User object
function createUserObject(email: string, name: string): User {
  return {
    id: `usr_${email.split('@')[0]}`,
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    isActive: true,
    isAdmin: email === 'demo@example.com', // Demo user is admin
    createdAt: new Date().toISOString(),
  }
}

function createHttpError(status: HttpStatusCode, message: string, errors?: Record<string, string[]>): Error {
  const error = new Error(message)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(error as any).response = {
    status,
    data: {
      message,
      errors,
    },
  }
  return error
}

// Simulate network delay
function delay(ms = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class MockAuthService implements IAuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay()

    const user = mockUsers.get(credentials.email)

    if (!user || user.password !== credentials.password) {
      throw createHttpError(HttpStatusCode.UnprocessableEntity, 'Invalid email or password', {
        email: ['Invalid email or password'],
      })
    }

    const token = generateMockToken(credentials.email)

    return {
      user: createUserObject(user.email, user.name),
      accessToken: token,
      refreshToken: `refresh_${token}`,
      tokenType: 'Bearer',
      expiresIn: 3600,
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await delay()

    if (mockUsers.has(credentials.email)) {
      throw createHttpError(HttpStatusCode.UnprocessableEntity, 'Email already exists', {
        email: ['Email already exists'],
      })
    }

    mockUsers.set(credentials.email, {
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
    })

    const token = generateMockToken(credentials.email)

    return {
      user: createUserObject(credentials.email, credentials.name),
      accessToken: token,
      refreshToken: `refresh_${token}`,
      tokenType: 'Bearer',
      expiresIn: 3600,
    }
  }

  async logout(): Promise<void> {
    await delay(200)
    // In mock, we just simulate success
    console.log('[Mock] User logged out')
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    await delay()

    if (!mockUsers.has(data.email)) {
      throw createHttpError(HttpStatusCode.NotFound, 'User not found')
    }

    return {
      message: `Password reset link has been sent to ${data.email} (mock - check console)`,
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    await delay()

    const user = mockUsers.get(data.email)

    if (!user) {
      throw createHttpError(HttpStatusCode.NotFound, 'User not found')
    }

    // Update password in mock database
    user.password = data.password

    return {
      message: 'Password has been reset successfully',
    }
  }

  async changePassword(_data: ChangePasswordData): Promise<{ message: string }> {
    await delay()
    console.log('[MockAuthService] changePassword', _data)

    // For mock, we'll just return success
    // In real implementation, you'd verify currentPassword
    return {
      message: 'Password has been changed successfully',
    }
  }

  async getCurrentUser(): Promise<User> {
    await delay(200)

    // In mock, get token from localStorage (same as authStore)
    const token = localStorage.getItem('jwt_token')

    if (!token) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'No token provided')
    }

    const email = mockTokens.get(token)

    if (!email) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'Invalid or expired token')
    }

    const user = mockUsers.get(email)

    if (!user) {
      throw createHttpError(HttpStatusCode.Unauthorized, 'User not found')
    }

    return createUserObject(user.email, user.name)
  }
}

export const mockAuthService = new MockAuthService()
