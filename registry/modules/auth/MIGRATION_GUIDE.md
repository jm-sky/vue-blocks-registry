# Migration Guide: TanStack Query Integration

This guide explains how to migrate from the original auth implementation to the new TanStack Query-powered auth system.

## What's New

### 1. TanStack Query Integration
- Automatic caching and synchronization of user data
- Optimistic updates and background refetching
- Better error handling and retry logic
- Loading states for all operations

### 2. New Composable: `useAuthQuery`
The new `useAuthQuery` composable provides all the same functionality as the original `useAuth` but with TanStack Query benefits.

### 3. Separate Query Hooks
Individual hooks for specific operations:
- `useCurrentUser()` - Fetch current user data
- `useLogin()` - Login mutation
- `useRegister()` - Registration mutation
- `useLogout()` - Logout mutation
- `useForgotPassword()` - Forgot password mutation
- `useResetPassword()` - Reset password mutation
- `useChangePassword()` - Change password mutation

## Migration Steps

### Step 1: Update Imports
```typescript
// Before
import { useAuth } from '../composables/useAuth'

// After
import { useAuthQuery } from '../composables/useAuthQuery'
```

### Step 2: Update Composable Usage
```typescript
// Before
const { login, register, fetchUser, user, isAuthenticated } = useAuth()

// After
const { 
  login, 
  register, 
  user, 
  isAuthenticated, 
  isLoading, 
  isError,
  refreshUser,
  isLoggingIn,
  isRegistering 
} = useAuthQuery()
```

### Step 3: Handle Loading States
```vue
<!-- Before -->
<Button :loading="isSubmitting">Login</Button>

<!-- After -->
<Button :loading="isLoggingIn">Login</Button>
```

### Step 4: Use New Features
```typescript
// Refresh user data
await refreshUser()

// Check loading states
if (isLoggingIn.value) {
  // Show loading indicator
}

// Handle errors
if (isError.value) {
  // Show error message
}
```

## Benefits

### 1. Automatic Caching
User data is automatically cached and synchronized across components.

### 2. Background Updates
User data is automatically refetched when the window regains focus or network reconnects.

### 3. Optimistic Updates
UI updates immediately while the request is in progress.

### 4. Better Error Handling
Automatic retry logic with exponential backoff for failed requests.

### 5. Loading States
Granular loading states for each operation.

## Example Migration

### Before (Original useAuth)
```vue
<script setup>
import { useAuth } from '../composables/useAuth'

const { login, user, isAuthenticated } = useAuth()

const handleLogin = async (credentials) => {
  try {
    await login(credentials)
    // Handle success
  } catch (error) {
    // Handle error
  }
}
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      Welcome, {{ user?.name || user?.email }}!
    </div>
    <button @click="handleLogin">Login</button>
  </div>
</template>
```

### After (useAuthQuery)
```vue
<script setup>
import { useAuthQuery } from '../composables/useAuthQuery'

const { 
  login, 
  user, 
  isAuthenticated, 
  isLoading, 
  isLoggingIn 
} = useAuthQuery()

const handleLogin = async (credentials) => {
  try {
    await login(credentials)
    // Handle success
  } catch (error) {
    // Handle error
  }
}
</script>

<template>
  <div>
    <div v-if="isLoading">Loading user data...</div>
    <div v-else-if="isAuthenticated">
      Welcome, {{ user?.name || user?.email }}!
    </div>
    <button @click="handleLogin" :disabled="isLoggingIn">
      {{ isLoggingIn ? 'Logging in...' : 'Login' }}
    </button>
  </div>
</template>
```

## Backward Compatibility

The original `useAuth` composable is still available for backward compatibility, but it's recommended to migrate to `useAuthQuery` for new components.

## Query Keys

The auth module uses the following query keys for cache management:
- `['auth']` - All auth-related queries
- `['auth', 'user']` - User-related queries
- `['auth', 'me']` - Current user query

These keys are exported from `useAuthQuery` as `authQueryKeys` for advanced usage.