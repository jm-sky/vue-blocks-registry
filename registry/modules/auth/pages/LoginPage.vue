<script setup lang="ts">
import AuthLayout from '@registry/app/layouts/AuthLayout.vue'
import LoginForm from '@registry/modules/auth/components/LoginForm.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const message: string | null = route.meta.message as string | null
</script>

<template>
  <AuthLayout>
    <template #actions>
      <slot name="actions" />
    </template>

    <div class="max-w-md w-full space-y-8">
      <div class="space-y-4 bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-lg">
        <h2 class="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Zaloguj się
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Lub
          <RouterLink to="/auth/register" class="font-medium text-primary hover:underline">
            utwórz nowe konto
          </RouterLink>
        </p>
        <LoginForm />
      </div>

      <div class="text-center">
        <RouterLink to="/auth/forgot-password" class="text-sm text-gray-600 dark:text-gray-400 hover:underline">
          Zapomniałeś hasła?
        </RouterLink>
      </div>

      <div v-if="message" class="border rounded-lg bg-blue-500/10 p-4 text-sm shadow">
        {{ message }}
      </div>
    </div>
  </AuthLayout>
</template>
