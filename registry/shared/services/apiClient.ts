// shared/services/apiClient.ts
import axios from 'axios'
import { authInterceptor } from './auth.interceptor'

export const apiClient = axios.create({
  // W dev użyj relatywnej ścieżki dla proxy Vite (zero-config)
  // W production użyj VITE_API_BASE_URL jeśli ustawione, w przeciwnym razie '/api'
  baseURL: import.meta.env.DEV 
    ? '/api' 
    : (import.meta.env.VITE_API_BASE_URL ?? '/api'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Apply auth interceptor immediately
apiClient.interceptors.request.use(authInterceptor)
