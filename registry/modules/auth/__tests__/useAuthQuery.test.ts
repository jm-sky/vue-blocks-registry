// modules/auth/__tests__/useAuthQuery.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { useAuthQuery } from '../composables/useAuthQuery'
import { authService } from '../services/authService'

// Mock the auth service
vi.mock('../services/authService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
  }
}))

// Mock the auth store
vi.mock('../store/useAuthStore', () => ({
  useAuthStore: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setToken: vi.fn(),
    setUser: vi.fn(),
    logout: vi.fn(),
  })
}))

describe('useAuthQuery', () => {
  let app: any

  beforeEach(() => {
    // Create a fresh app instance for each test
    app = createApp({})
    const pinia = createPinia()
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    
    app.use(pinia)
    app.use(VueQueryPlugin, { queryClient })
    setActivePinia(pinia)
    
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('should provide auth functionality', () => {
    const auth = useAuthQuery()
    
    expect(auth).toHaveProperty('user')
    expect(auth).toHaveProperty('isAuthenticated')
    expect(auth).toHaveProperty('login')
    expect(auth).toHaveProperty('register')
    expect(auth).toHaveProperty('logout')
    expect(auth).toHaveProperty('isLoggingIn')
    expect(auth).toHaveProperty('isRegistering')
    expect(auth).toHaveProperty('isLoggingOut')
  })

  it('should handle login mutation', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@example.com' },
      token: 'mock-token'
    }
    
    vi.mocked(authService.login).mockResolvedValue(mockResponse)
    
    const { login } = useAuthQuery()
    
    const credentials = { email: 'test@example.com', password: 'password' }
    
    await expect(login(credentials)).resolves.toEqual(mockResponse)
    expect(authService.login).toHaveBeenCalledWith(credentials)
  })

  it('should handle register mutation', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@example.com' },
      token: 'mock-token'
    }
    
    vi.mocked(authService.register).mockResolvedValue(mockResponse)
    
    const { register } = useAuthQuery()
    
    const credentials = { 
      email: 'test@example.com', 
      password: 'password',
      passwordConfirmation: 'password'
    }
    
    await expect(register(credentials)).resolves.toEqual(mockResponse)
    expect(authService.register).toHaveBeenCalledWith(credentials)
  })

  it('should handle logout mutation', async () => {
    vi.mocked(authService.logout).mockResolvedValue(undefined)
    
    const { logout } = useAuthQuery()
    
    await expect(logout()).resolves.toBeUndefined()
    expect(authService.logout).toHaveBeenCalled()
  })
})