# Missing 404 (Not Found) Route

## Problem
The Vue Router configuration does not include a catch-all route for handling 404 (Not Found) errors. When users navigate to non-existent routes, Vue Router doesn't show a proper 404 page.

## Current State
In `frontend/src/router/routes.ts`, there is no catch-all route defined. This means:
- Users visiting invalid URLs see a blank page or router error
- No user-friendly error message is displayed
- Poor user experience for mistyped URLs

## Expected Behavior
When a user navigates to a route that doesn't exist (e.g., `/invalid-page` or `/typo-in-url`), they should see a proper 404 Not Found page with:
- Clear error message
- Option to navigate back to home or other pages
- Consistent UI/UX with the rest of the application

## Recommendation

### 1. Create 404 Page Component
The CLI should generate a `NotFoundPage.vue` component in `src/pages/`:

```vue
<template>
  <div class="not-found-page">
    <div class="container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <div class="actions">
        <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.container h1 {
  font-size: 6rem;
  font-weight: bold;
  margin: 0;
}

.container h2 {
  font-size: 2rem;
  margin: 1rem 0;
}

.container p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.actions {
  margin-top: 2rem;
}
</style>
```

### 2. Add Catch-All Route
The CLI should automatically add a catch-all route at the end of the routes array in `frontend/src/router/routes.ts`:

```typescript
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  
  // ... all other routes ...
  
  // Catch-all route for 404 - must be last
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]
```

### 3. Route Configuration Details
- **Path**: `/:pathMatch(.*)*` - This is Vue Router 4 syntax for catch-all routes
- **Name**: `NotFound` (or `not-found` following naming conventions)
- **Component**: Lazy-loaded NotFoundPage component
- **Position**: Must be the **last route** in the array (Vue Router matches routes in order)

### 4. Optional Enhancements
The CLI could also:
- Add route name constant: `export const RouteNames = { notFound: 'NotFound' } as const`
- Support custom 404 page template (if user provides one)
- Add meta information: `meta: { title: '404 - Not Found' }`
- Include breadcrumbs or navigation suggestions

## Implementation Example

The CLI should modify `frontend/src/router/routes.ts` to include:

```typescript
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  // ... existing routes ...
  
  // Catch-all route for 404 errors (must be last)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      title: '404 - Page Not Found',
    },
  },
]
```

## Impact
- ✅ Better user experience for invalid URLs
- ✅ Consistent error handling
- ✅ Professional application behavior
- ✅ Standard practice in Vue Router applications

## References
- Vue Router 4 Catch-All Route: https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
- The `:pathMatch(.*)*` syntax is the recommended way in Vue Router 4

## ✅ Naprawione

**Data**: 2025-11-07  
**Status**: Route 404 już istnieje w `src/router/routes.ts` (linia 189-192). NotFoundPage.vue również istnieje w `src/pages/NotFoundPage.vue`. Funkcjonalność jest już zaimplementowana.

