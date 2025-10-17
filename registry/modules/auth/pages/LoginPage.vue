<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Zaloguj się do konta
        </h2>
      </div>
      <LoginForm />
      <div class="text-center">
        <router-link to="/register" class="text-sm text-primary hover:underline">
          Nie masz konta? Zarejestruj się
        </router-link>
      </div>
      <div class="text-center">
        <router-link to="/forgot-password" class="text-sm text-gray-600 hover:underline">
          Zapomniałeś hasła?
        </router-link>
      </div>
    </div>
  </div>
</template>
