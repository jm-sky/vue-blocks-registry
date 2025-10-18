<script setup lang="ts">
import { ref } from 'vue'
import { useAuthQuery } from '../composables/useAuthQuery'
import { Button } from '@registry/components/ui/button'
import { Input } from '@registry/components/ui/input'
import type { LoginCredentials, RegisterCredentials } from '../types/user'

const { 
  user, 
  isAuthenticated, 
  isLoading, 
  isError,
  login, 
  register, 
  logout, 
  refreshUser,
  isLoggingIn,
  isRegistering,
  isLoggingOut 
} = useAuthQuery()

// Form data
const loginForm = ref<LoginCredentials>({
  email: '',
  password: ''
})

const registerForm = ref<RegisterCredentials>({
  email: '',
  password: '',
  passwordConfirmation: '',
  name: ''
})

// Handlers
const handleLogin = async () => {
  try {
    await login(loginForm.value)
    console.log('Login successful!')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const handleRegister = async () => {
  try {
    await register(registerForm.value)
    console.log('Registration successful!')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const handleLogout = async () => {
  try {
    await logout()
    console.log('Logout successful!')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const handleRefreshUser = async () => {
  try {
    await refreshUser()
    console.log('User data refreshed!')
  } catch (error) {
    console.error('Refresh failed:', error)
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-8">
    <h1 class="text-3xl font-bold text-center">Auth with TanStack Query</h1>
    
    <!-- User Status -->
    <div class="bg-gray-100 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">User Status</h2>
      <div class="space-y-2">
        <p><strong>Authenticated:</strong> {{ isAuthenticated ? 'Yes' : 'No' }}</p>
        <p><strong>Loading:</strong> {{ isLoading ? 'Yes' : 'No' }}</p>
        <p><strong>Error:</strong> {{ isError ? 'Yes' : 'No' }}</p>
        <p v-if="user"><strong>User:</strong> {{ user.name || user.email }}</p>
      </div>
    </div>

    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="bg-blue-50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Login</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <Input 
            v-model="loginForm.email" 
            type="email" 
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <Input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="Enter your password"
          />
        </div>
        <Button 
          @click="handleLogin" 
          :loading="isLoggingIn"
          class="w-full"
        >
          Login
        </Button>
      </div>
    </div>

    <!-- Register Form -->
    <div v-if="!isAuthenticated" class="bg-green-50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Register</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <Input 
            v-model="registerForm.name" 
            type="text" 
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <Input 
            v-model="registerForm.email" 
            type="email" 
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <Input 
            v-model="registerForm.password" 
            type="password" 
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Confirm Password</label>
          <Input 
            v-model="registerForm.passwordConfirmation" 
            type="password" 
            placeholder="Confirm your password"
          />
        </div>
        <Button 
          @click="handleRegister" 
          :loading="isRegistering"
          class="w-full"
        >
          Register
        </Button>
      </div>
    </div>

    <!-- Authenticated Actions -->
    <div v-if="isAuthenticated" class="bg-yellow-50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">Authenticated Actions</h2>
      <div class="space-y-4">
        <div class="flex gap-2">
          <Button 
            @click="handleRefreshUser"
            variant="outline"
          >
            Refresh User Data
          </Button>
          <Button 
            @click="handleLogout" 
            :loading="isLoggingOut"
            variant="destructive"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>

    <!-- User Data Display -->
    <div v-if="user" class="bg-gray-50 p-4 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">User Data</h2>
      <pre class="text-sm bg-white p-3 rounded border overflow-auto">{{ JSON.stringify(user, null, 2) }}</pre>
    </div>
  </div>
</template>