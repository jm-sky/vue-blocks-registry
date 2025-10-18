import './css/style.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createAuthQueryClient } from '@registry/modules/auth/config/queryClient'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Create query client with auth-optimized defaults
const queryClient = createAuthQueryClient({
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 3,
  }
})

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
