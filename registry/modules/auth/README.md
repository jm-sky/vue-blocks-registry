# Auth Module with TanStack Query

This module provides authentication functionality with TanStack Query integration for optimal data fetching, caching, and state management.

## Features

- 🔐 User authentication (login, register, logout)
- 👤 User profile management
- 🔄 Automatic data synchronization
- ⚡ Optimistic updates
- 🔄 Background refetching
- 📱 Loading states for all operations
- 🛡️ Error handling with retry logic
- 💾 Intelligent caching

## Quick Start

### Basic Usage

```vue
<script setup>
import { useAuthQuery } from '../composables/useAuthQuery'

const { 
  user, 
  isAuthenticated, 
  login, 
  logout, 
  isLoggingIn 
} = useAuthQuery()

const handleLogin = async (credentials) => {
  try {
    await login(credentials)
    // User is now logged in and data is cached
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      Welcome, {{ user?.name || user?.email }}!
    </div>
    <button @click="handleLogin" :disabled="isLoggingIn">
      {{ isLoggingIn ? 'Logging in...' : 'Login' }}
    </button>
  </div>
</template>
```

## API Reference

### useAuthQuery()

Main composable that provides all authentication functionality.

```typescript
const {
  // Data
  user,                    // Current user data
  isAuthenticated,         // Authentication status
  isLoading,              // Loading state for user data
  isError,                // Error state for user data
  
  // Actions
  login,                  // Login function
  register,               // Register function
  logout,                 // Logout function
  forgotPassword,         // Forgot password function
  resetPassword,          // Reset password function
  changePassword,         // Change password function
  refreshUser,            // Refresh user data
  
  // Loading states
  isLoggingIn,            // Login loading state
  isRegistering,          // Registration loading state
  isLoggingOut,           // Logout loading state
  isForgotPasswordLoading, // Forgot password loading state
  isResetPasswordLoading,  // Reset password loading state
  isChangePasswordLoading, // Change password loading state
  
  // Helpers
  updateUser,             // Update user data optimistically
} = useAuthQuery()
```

### Individual Query Hooks

For more granular control, you can use individual hooks:

```typescript
import { 
  useCurrentUser, 
  useLogin, 
  useRegister, 
  useLogout 
} from '../composables/useAuthQuery'

// Fetch current user
const { data: user, isLoading, error } = useCurrentUser()

// Login mutation
const loginMutation = useLogin()
await loginMutation.mutateAsync(credentials)

// Register mutation
const registerMutation = useRegister()
await registerMutation.mutateAsync(credentials)

// Logout mutation
const logoutMutation = useLogout()
await logoutMutation.mutateAsync()
```

## Data Flow

### 1. Login Process
1. User submits login form
2. `login()` mutation is called
3. Token is stored in auth store
4. User data is fetched and cached
5. UI updates with user information

### 2. Data Synchronization
- User data is automatically refetched when:
  - Window regains focus
  - Network reconnects
  - Token changes
- Data is cached for 5 minutes by default
- Optimistic updates provide immediate UI feedback

### 3. Error Handling
- Authentication errors (401/403) don't retry
- Server errors retry up to 2 times
- Client errors (4xx) don't retry
- All errors are logged and can be handled in components

## Configuration

### Query Client Setup

The auth module uses a configured QueryClient with auth-optimized defaults:

```typescript
// main.ts
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        return failureCount < 2
      },
    },
  },
})

app.use(VueQueryPlugin, { queryClient })
```

## Examples

### Login Form
```vue
<script setup>
import { useAuthQuery } from '../composables/useAuthQuery'

const { login, isLoggingIn } = useAuthQuery()

const handleSubmit = async (formData) => {
  try {
    await login(formData)
    // Redirect or show success message
  } catch (error) {
    // Handle error
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <!-- Form fields -->
    <button type="submit" :disabled="isLoggingIn">
      {{ isLoggingIn ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>
```

### User Profile
```vue
<script setup>
import { useAuthQuery } from '../composables/useAuthQuery'

const { user, isLoading, refreshUser } = useAuthQuery()
</script>

<template>
  <div v-if="isLoading">Loading profile...</div>
  <div v-else-if="user">
    <h1>{{ user.name || user.email }}</h1>
    <button @click="refreshUser">Refresh</button>
  </div>
</template>
```

### Protected Route
```vue
<script setup>
import { useAuthQuery } from '../composables/useAuthQuery'
import { useRouter } from 'vue-router'

const { isAuthenticated, isLoading } = useAuthQuery()
const router = useRouter()

// Redirect if not authenticated
if (!isLoading && !isAuthenticated) {
  router.push('/login')
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>Protected content</div>
</template>
```

## Migration from Legacy useAuth

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration instructions.

## TypeScript Support

All functions and types are fully typed:

```typescript
import type { 
  User, 
  LoginCredentials, 
  RegisterCredentials 
} from '../types/user'

const { login } = useAuthQuery()

// TypeScript will infer the correct types
await login({ email: 'user@example.com', password: 'password' })
```

## Best Practices

1. **Use `useAuthQuery` for new components** - It provides better caching and state management
2. **Handle loading states** - Always show loading indicators for better UX
3. **Handle errors gracefully** - Provide meaningful error messages to users
4. **Use optimistic updates** - Update UI immediately for better perceived performance
5. **Leverage caching** - TanStack Query handles caching automatically, but you can customize it
6. **Clean up on logout** - The logout mutation automatically clears all auth-related cache

## Troubleshooting

### Common Issues

1. **User data not updating**: Check if the query is enabled and the token is valid
2. **Infinite refetching**: Check for circular dependencies in your query keys
3. **Stale data**: Ensure proper cache invalidation after mutations
4. **Memory leaks**: Make sure to clean up queries when components unmount

### Debug Mode

Enable TanStack Query devtools for debugging:

```typescript
// In development
import { VueQueryPlugin } from '@tanstack/vue-query'

app.use(VueQueryPlugin, { 
  queryClient,
  devtools: { enabled: true } // Enable in development
})
```