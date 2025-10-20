<script setup lang="ts">
import AuthLayout from '@registry/app/layouts/AuthLayout.vue'
import RegisterForm from '../components/RegisterForm.vue'
</script>

<template>
  <AuthLayout>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Utwórz nowe konto
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Lub
          <router-link to="/auth/login" class="font-medium text-primary hover:underline">
            zaloguj się na istniejące konto
          </router-link>
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-lg rounded-lg">
        <RegisterForm />
      </div>
    </div>
  </AuthLayout>
</template>
