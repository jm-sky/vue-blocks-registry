<script setup lang="ts">
import AuthLayout from '@registry/app/layouts/AuthLayout.vue'
import RegisterForm from '@registry/modules/auth/components/RegisterForm.vue'
</script>

<template>
  <AuthLayout>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Utwórz nowe konto
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Lub
          <RouterLink to="/auth/login" class="font-medium text-primary hover:underline">
            zaloguj się na istniejące konto
          </RouterLink>
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-lg">
        <RegisterForm />
      </div>
    </div>
  </AuthLayout>
</template>
