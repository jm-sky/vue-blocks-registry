<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Utwórz nowe konto
        </h2>
      </div>
      <RegisterForm />
      <div class="text-center">
        <router-link to="/login" class="text-sm text-primary hover:underline">
          Masz już konto? Zaloguj się
        </router-link>
      </div>
    </div>
  </div>
</template>
