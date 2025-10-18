// shared/services/httpClient.ts
import axios from 'axios'
import { authInterceptor } from './auth.interceptor'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Apply auth interceptor immediately
apiClient.interceptors.request.use(authInterceptor)
