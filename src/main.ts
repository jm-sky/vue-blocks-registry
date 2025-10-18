import './css/style.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Create query client with auth-optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on authentication errors
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry on client errors (4xx)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        return failureCount < 2
      },
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
