# Conditional Auth Buttons on HomePage

## Problem
The `HomePage.vue` component currently always displays Login and Register buttons, even when the auth module is not installed. This causes:
- Import errors if auth module doesn't exist
- Broken UI if routes don't exist
- Poor user experience for projects without authentication

## Current Implementation
```vue
<script setup lang="ts">
import { AuthRoutePaths } from '@/modules/auth/config/routes'
</script>

<template>
  <!-- ... -->
  <div class="flex gap-6 justify-center">
    <ButtonLink variant="outline" :to="AuthRoutePaths.login">
      Login
    </ButtonLink>
    <ButtonLink variant="outline" :to="AuthRoutePaths.register">
      Register
    </ButtonLink>
  </div>
</template>
```

## Recommendation

The CLI should implement conditional rendering of auth buttons, showing them only when the auth module is available. Below are several implementation approaches, ordered by recommendation:

### Approach 1: Router Route Check (Recommended) ⭐

Check if auth routes exist in the router before rendering buttons.

**Pros:**
- ✅ No import errors if module doesn't exist
- ✅ Works at runtime
- ✅ Type-safe with proper typing
- ✅ Simple and reliable

**Implementation:**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ButtonLink from '@/components/ui/button-link/ButtonLink.vue'
import HoverLinkExternal from '@/components/ui/hover-link/HoverLinkExternal.vue'
import GuestLayoutCentered from '@/layouts/GuestLayoutCentered.vue'

const router = useRouter()

// Check if auth routes exist
const hasAuthModule = computed(() => {
  try {
    const loginRoute = router.resolve('/auth/login')
    const registerRoute = router.resolve('/auth/register')
    // Route exists if it doesn't throw and has a matched route
    return loginRoute.name !== null && registerRoute.name !== null
  } catch {
    return false
  }
})

// Alternative: Check router routes directly
const hasAuthModuleAlt = computed(() => {
  const routes = router.getRoutes()
  const hasLogin = routes.some(r => r.name === 'Login' || r.path === '/auth/login')
  const hasRegister = routes.some(r => r.name === 'Register' || r.path === '/auth/register')
  return hasLogin && hasRegister
})
</script>

<template>
  <GuestLayoutCentered>
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold">
        Welcome to Vue Blocks Registry
      </h1>
      <p class="text-muted-foreground">
        Your project is ready to go! Start building something amazing.
      </p>
      <div class="flex gap-6 justify-center font-semibold text-primary/80">
        <HoverLinkExternal href="https://github.com/jm-sky/vue-blocks-registry">
          Documentation
        </HoverLinkExternal>
        <HoverLinkExternal href="https://www.npmjs.com/package/vue-blocks-registry">
          npm Package
        </HoverLinkExternal>
      </div>
      <!-- Only show auth buttons if auth module is available -->
      <div v-if="hasAuthModule" class="flex gap-6 justify-center font-semibold text-primary/80">
        <ButtonLink variant="outline" to="/auth/login">
          Login
        </ButtonLink>
        <ButtonLink variant="outline" to="/auth/register">
          Register
        </ButtonLink>
      </div>
    </div>
  </GuestLayoutCentered>
</template>
```

### Approach 2: Dynamic Import with Fallback

Use dynamic import to safely check if auth module exists.

**Pros:**
- ✅ No compile-time errors
- ✅ Works even if module is completely missing

**Cons:**
- ⚠️ Requires async handling
- ⚠️ More complex

**Implementation:**

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonLink from '@/components/ui/button-link/ButtonLink.vue'
import HoverLinkExternal from '@/components/ui/hover-link/HoverLinkExternal.vue'
import GuestLayoutCentered from '@/layouts/GuestLayoutCentered.vue'

const router = useRouter()
const hasAuthModule = ref(false)

onMounted(async () => {
  try {
    // Try to dynamically import auth routes config
    const authRoutes = await import('@/modules/auth/config/routes')
    // Check if routes exist in router
    const routes = router.getRoutes()
    hasAuthModule.value = routes.some(r => 
      r.path === authRoutes.AuthRoutePaths.login || 
      r.path === authRoutes.AuthRoutePaths.register
    )
  } catch {
    // Module doesn't exist
    hasAuthModule.value = false
  }
})
</script>

<template>
  <!-- Same template as Approach 1 -->
</template>
```

### Approach 3: Composable for Module Detection

Create a reusable composable to check module availability.

**Pros:**
- ✅ Reusable across components
- ✅ Centralized logic
- ✅ Easy to test

**Implementation:**

Create `src/shared/composables/useModuleAvailable.ts`:

```typescript
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Composable to check if a module is available
 * @param moduleName - Name of the module to check
 * @param routePaths - Array of route paths that should exist for this module
 */
export function useModuleAvailable(
  moduleName: string,
  routePaths: string[]
) {
  const router = useRouter()
  
  const isAvailable = computed(() => {
    const routes = router.getRoutes()
    return routePaths.every(path => 
      routes.some(r => r.path === path || r.name === path)
    )
  })
  
  return {
    isAvailable,
  }
}

/**
 * Composable specifically for auth module
 */
export function useAuthModuleAvailable() {
  return useModuleAvailable('auth', ['/auth/login', '/auth/register'])
}
```

Then use in `HomePage.vue`:

```vue
<script setup lang="ts">
import { useAuthModuleAvailable } from '@/shared/composables/useModuleAvailable'
import ButtonLink from '@/components/ui/button-link/ButtonLink.vue'
import HoverLinkExternal from '@/components/ui/hover-link/HoverLinkExternal.vue'
import GuestLayoutCentered from '@/layouts/GuestLayoutCentered.vue'

const { isAvailable: hasAuthModule } = useAuthModuleAvailable()
</script>

<template>
  <!-- Same template as Approach 1 -->
</template>
```

### Approach 4: Environment Variable / Config Flag

Use a configuration flag to indicate module availability.

**Pros:**
- ✅ Simple and explicit
- ✅ No runtime checks needed

**Cons:**
- ⚠️ Requires manual configuration
- ⚠️ Not automatic

**Implementation:**

In `src/shared/config/config.ts`:

```typescript
export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Vue App',
  },
  modules: {
    auth: {
      enabled: import.meta.env.VITE_AUTH_MODULE_ENABLED !== 'false',
    },
  },
}
```

In `HomePage.vue`:

```vue
<script setup lang="ts">
import { config } from '@/shared/config/config'
import ButtonLink from '@/components/ui/button-link/ButtonLink.vue'
// ... other imports

const hasAuthModule = computed(() => config.modules.auth.enabled)
</script>
```

## Recommended Solution

**Use Approach 1 (Router Route Check)** as the primary solution because:
1. ✅ Automatic - no configuration needed
2. ✅ Works at runtime - adapts to actual route availability
3. ✅ Type-safe - no import errors
4. ✅ Simple - easy to understand and maintain

**Optionally combine with Approach 3 (Composable)** for:
- Better code organization
- Reusability across multiple components
- Easier testing

## Implementation for CLI

The CLI should generate `HomePage.vue` with:

1. **Router-based check** (Approach 1) as default
2. **Composable** (Approach 3) as an optional enhancement
3. **Conditional rendering** using `v-if="hasAuthModule"`

### Generated Code Template

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ButtonLink from '@/components/ui/button-link/ButtonLink.vue'
import HoverLinkExternal from '@/components/ui/hover-link/HoverLinkExternal.vue'
import GuestLayoutCentered from '@/layouts/GuestLayoutCentered.vue'

const router = useRouter()

// Check if auth module routes are available
const hasAuthModule = computed(() => {
  const routes = router.getRoutes()
  const hasLogin = routes.some(r => r.name === 'Login' || r.path === '/auth/login')
  const hasRegister = routes.some(r => r.name === 'Register' || r.path === '/auth/register')
  return hasLogin && hasRegister
})
</script>

<template>
  <GuestLayoutCentered>
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold">
        Welcome to Vue Blocks Registry
      </h1>
      <p class="text-muted-foreground">
        Your project is ready to go! Start building something amazing.
      </p>
      <div class="flex gap-6 justify-center font-semibold text-primary/80">
        <HoverLinkExternal href="https://github.com/jm-sky/vue-blocks-registry">
          Documentation
        </HoverLinkExternal>
        <HoverLinkExternal href="https://www.npmjs.com/package/vue-blocks-registry">
          npm Package
        </HoverLinkExternal>
      </div>
      <!-- Only show auth buttons if auth module is installed -->
      <div v-if="hasAuthModule" class="flex gap-6 justify-center font-semibold text-primary/80">
        <ButtonLink variant="outline" to="/auth/login">
          Login
        </ButtonLink>
        <ButtonLink variant="outline" to="/auth/register">
          Register
        </ButtonLink>
      </div>
    </div>
  </GuestLayoutCentered>
</template>
```

## Additional Considerations

1. **Route Paths**: Use hardcoded paths (`/auth/login`) instead of importing `AuthRoutePaths` to avoid import errors
2. **Route Names**: Check both route names and paths for flexibility
3. **Error Handling**: Wrap route checks in try-catch for safety
4. **Performance**: Use `computed` for reactive checks that only run when needed
5. **Extensibility**: Consider making this pattern reusable for other modules (settings, user, etc.)

## Impact
- ✅ No import errors when auth module is missing
- ✅ Clean UI that adapts to available modules
- ✅ Better developer experience
- ✅ More flexible project setup

## ✅ Status

**Data**: 2025-11-07  
**Uwaga**: To dotyczy generowania kodu przez CLI. W obecnym kodzie nie ma HomePage.vue z przyciskami auth - problem dotyczy przyszłych projektów generowanych przez CLI. Rekomendacja jest gotowa do implementacji w CLI.

