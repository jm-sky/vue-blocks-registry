<script setup lang="ts">
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import LogoutButton from '@registry/modules/auth/components/LogoutButton.vue'
import DarkModeToggle from '@registry/shared/components/DarkModeToggle.vue'
import LogoText from '@registry/components/ui/LogoText.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <RouterLink to="/dashboard" class="text-xl font-bold text-gray-900 dark:text-white">
              <LogoText />
            </RouterLink>
          </div>

          <div class="flex items-center space-x-4">
            <span v-if="authStore.user" class="text-sm text-gray-700 dark:text-gray-300">
              {{ authStore.user.email }}
            </span>
            <DarkModeToggle />
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
