<script setup lang="ts">
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import LogoutButton from '@registry/modules/auth/components/LogoutButton.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/dashboard" class="text-xl font-bold text-gray-900">
              MyApp
            </RouterLink>
          </div>

          <div class="flex items-center space-x-4">
            <span v-if="authStore.user" class="text-sm text-gray-700">
              {{ authStore.user.email }}
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
