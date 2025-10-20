<script setup lang="ts">
import AuthLayout from '@registry/app/layouts/AuthLayout.vue'
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <AuthLayout>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Zaloguj się do konta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Lub
          <router-link to="/auth/register" class="font-medium text-primary hover:underline">
            utwórz nowe konto
          </router-link>
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-lg rounded-lg">
        <LoginForm />
      </div>

      <div class="text-center">
        <router-link to="/auth/forgot-password" class="text-sm text-gray-600 hover:underline">
          Zapomniałeś hasła?
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>
