// shared/services/auth.interceptor.ts
import type { InternalAxiosRequestConfig } from 'axios'
import { JWT_STORE_KEY } from '@registry/shared/config/config'

export function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem(JWT_STORE_KEY)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
