# Tytuł w index.html powinien używać nazwy aplikacji

## Problem

Plik `index.html` ma hardcoded tytuł "Vite App" zamiast używać nazwy aplikacji:

```html
<!-- frontend/index.html -->
<title>Vite App</title>
```

## Analiza

### Obecna sytuacja

1. **Konfiguracja aplikacji** jest zdefiniowana w `src/shared/config/config.ts`:
   ```typescript
   export const config = {
     app: {
       id: import.meta.env.VITE_APP_ID ?? 'my-app',
       name: import.meta.env.VITE_APP_NAME ?? 'MyApp',
       description: import.meta.env.VITE_APP_DESCRIPTION ?? 'My App to make life better',
     },
   }
   ```

2. **LogoText.vue** już używa `config.app.name`:
   ```vue
   <component :is="props.as">
     {{ config.app.name }}
   </component>
   ```

3. **index.html** ma hardcoded "Vite App"

### Problem

`index.html` jest statycznym plikiem i nie może bezpośrednio używać zmiennych JavaScript. Potrzebne jest rozwiązanie, które:
- Używa nazwy aplikacji z konfiguracji
- Działa w trybie development i production
- Jest łatwe w utrzymaniu

## Rozwiązania

### Opcja 1: Użycie Vite HTML Plugin (transform)

**Zalety:**
- Działa w development i production
- Automatyczna transformacja podczas build
- Możliwość użycia zmiennych środowiskowych

**Implementacja:**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    // ... other plugins
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: process.env.VITE_APP_NAME || 'MyApp',
        },
      },
    }),
  ],
})
```

```html
<!-- index.html -->
<title><%- title %></title>
```

**Wymaga:** `vite-plugin-html` (dodatkowa zależność)

### Opcja 2: Dynamiczna aktualizacja w main.ts

**Zalety:**
- Nie wymaga dodatkowych zależności
- Proste w implementacji
- Działa natychmiast po załadowaniu

**Wady:**
- Tytuł może być widoczny jako "Vite App" przez krótki moment przed załadowaniem JS

**Implementacja:**

```typescript
// src/main.ts
import { config } from '@/shared/config/config'

// Ustaw tytuł strony
document.title = config.app.name
```

```html
<!-- index.html -->
<title>MyApp</title> <!-- fallback, zostanie nadpisany przez JS -->
```

### Opcja 3: Użycie Vite define + HTML transform

**Zalety:**
- Używa zmiennych środowiskowych Vite
- Działa w development i production
- Nie wymaga dodatkowych zależności (używa wbudowanego HTML transform)

**Implementacja:**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __APP_NAME__: JSON.stringify(process.env.VITE_APP_NAME || 'MyApp'),
  },
  // Vite automatycznie transformuje HTML
})
```

```html
<!-- index.html -->
<title>MyApp</title> <!-- zostanie zastąpione podczas build -->
```

**Uwaga:** Vite nie transformuje HTML automatycznie, więc to rozwiązanie nie zadziała bez dodatkowego pluginu.

### Opcja 4: Użycie Vite HTML transform hook

**Zalety:**
- Wykorzystuje wbudowane możliwości Vite
- Nie wymaga dodatkowych zależności
- Działa w development i production

**Implementacja:**

```typescript
// vite.config.ts
import { defineConfig, type Plugin } from 'vite'

function htmlTitlePlugin(): Plugin {
  return {
    name: 'html-title',
    transformIndexHtml(html) {
      const appName = process.env.VITE_APP_NAME || 'MyApp'
      return html.replace(/<title>.*?<\/title>/, `<title>${appName}</title>`)
    },
  }
}

export default defineConfig({
  plugins: [
    // ... other plugins
    htmlTitlePlugin(),
  ],
})
```

```html
<!-- index.html -->
<title>Vite App</title> <!-- zostanie zastąpione podczas transformacji -->
```

## Rekomendacja dla vue-blocks-registry

**Rekomenduję Opcję 4** (Vite HTML transform hook) z następujących powodów:

1. **Nie wymaga dodatkowych zależności** - używa wbudowanych możliwości Vite
2. **Działa w development i production** - transformacja odbywa się podczas build i dev server
3. **Proste w utrzymaniu** - jeden plugin w `vite.config.ts`
4. **Elastyczne** - można łatwo rozszerzyć o inne transformacje HTML

### Implementacja dla vue-blocks-registry

**vite.config.ts:**
```typescript
import { defineConfig, type Plugin } from 'vite'
// ... other imports

function htmlTitlePlugin(): Plugin {
  return {
    name: 'html-title',
    transformIndexHtml(html) {
      const appName = process.env.VITE_APP_NAME || 
                     import.meta.env.VITE_APP_NAME || 
                     'MyApp'
      return html.replace(
        /<title>.*?<\/title>/i, 
        `<title>${appName}</title>`
      )
    },
  }
}

export default defineConfig({
  plugins: [
    // ... existing plugins
    htmlTitlePlugin(),
  ],
  // ... rest of config
})
```

**index.html:**
```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyApp</title> <!-- zostanie zastąpione przez plugin -->
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### Alternatywnie: Opcja 2 (Dynamiczna aktualizacja)

Jeśli nie chcemy używać transformacji HTML, można użyć dynamicznej aktualizacji w `main.ts`:

```typescript
// src/main.ts
import { config } from '@/shared/config/config'

// Ustaw tytuł strony natychmiast
if (typeof document !== 'undefined') {
  document.title = config.app.name
}

// ... rest of main.ts
```

**Zalety:**
- Najprostsze rozwiązanie
- Nie wymaga zmian w vite.config.ts
- Działa od razu

**Wady:**
- Tytuł może być widoczny jako "Vite App" przez krótki moment przed załadowaniem JS

## Aktualna sytuacja

- ❌ `index.html` ma hardcoded "Vite App"
- ✅ `config.app.name` jest zdefiniowane w `src/shared/config/config.ts`
- ✅ `LogoText.vue` używa `config.app.name`
- ⚠️ Tytuł strony nie jest zsynchronizowany z nazwą aplikacji

## Zalecana akcja

**Dla vue-blocks-registry:**
1. Dodać plugin HTML transform do `vite.config.ts` (Opcja 4)
2. Lub dodać dynamiczną aktualizację w `main.ts` (Opcja 2)
3. Zaktualizować `index.html` aby używał sensownej wartości domyślnej
4. Dokumentować, że tytuł jest automatycznie ustawiany z `VITE_APP_NAME` lub `config.app.name`

## ✅ Naprawione

**Data**: 2025-11-07  
**Zmiana**: Dodano plugin `htmlTitlePlugin` do `vite.config.ts` - automatycznie ustawia tytuł strony z `VITE_APP_NAME` (fallback: 'MyApp'). Plugin transformuje HTML podczas build i dev server.

