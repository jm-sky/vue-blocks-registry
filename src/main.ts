import './css/style.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createAuthQueryClient } from '@registry/modules/auth/config/queryClient'
import { i18n } from '@registry/shared/i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Create query client with auth-optimized defaults
const queryClient = createAuthQueryClient({
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  }
})

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.use(i18n)

app.mount('#app')
