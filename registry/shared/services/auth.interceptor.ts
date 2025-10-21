import { JWT_STORE_KEY } from '@registry/shared/config/config'
// shared/services/auth.interceptor.ts
import type { InternalAxiosRequestConfig } from 'axios'

export function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem(JWT_STORE_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
