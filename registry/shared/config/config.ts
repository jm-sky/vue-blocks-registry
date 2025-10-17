// shared/config/config.ts

export const config = {
  app: {
    id: import.meta.env.VITE_APP_ID ?? 'defaultApp',
    name: import.meta.env.VITE_APP_NAME ?? 'MyApp',
    description: import.meta.env.VITE_APP_DESCRIPTION ?? 'Auth module',
  }
}

// osobna zmienna do użycia w localStorage / store
export const JWT_STORE_KEY = `${config.app.id}:token`
