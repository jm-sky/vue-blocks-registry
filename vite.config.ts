import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// Plugin to set HTML title from environment variable
function htmlTitlePlugin(): Plugin {
  return {
    name: 'html-title',
    transformIndexHtml(html) {
      const appName = process.env.VITE_APP_NAME ??
                     import.meta.env.VITE_APP_NAME ??
                     'MyApp'
      return html.replace(
        /<title>.*?<\/title>/i, 
        `<title>${appName}</title>`
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    htmlTitlePlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@registry': fileURLToPath(new URL('./registry', import.meta.url))
    },
  },
  server: {
    port: Number(process.env.VITE_PORT ?? 5176),
  },
  optimizeDeps: {
    exclude: [
      '@tailwindcss/oxide',
      'lightningcss',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
  },
})
