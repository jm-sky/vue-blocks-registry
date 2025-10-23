// shared/config/config.ts

export const config = {
  app: {
    id: import.meta.env.VITE_APP_ID ?? 'my-app',
    name: import.meta.env.VITE_APP_NAME ?? 'MyApp',
    description: import.meta.env.VITE_APP_DESCRIPTION ?? 'My App to make life better',
  }
}

// osobna zmienna do użycia w localStorage / store
export const DARK_MODE_STORAGE_KEY = `${config.app.id}:dark-mode`
export const JWT_STORE_KEY = `${config.app.id}:token`
