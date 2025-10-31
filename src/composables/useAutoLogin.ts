import { useLogin } from '@registry/modules/auth/composables/useAuth'
import { mockAuthService } from '@registry/modules/auth/services/mockAuthService'

export const useAutoLogin = () => {
  const login = async () => {
    const login = useLogin(mockAuthService)
    await login.mutateAsync({
      email: 'demo@example.com',
      password: 'password123',
    })
  }

  return { login }
}
