<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { forgotPasswordSchema } from '../validation/forgotPassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { ref } from 'vue'

const { handleSubmit, errors, setErrors, defineField } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
})

const [email] = defineField('email')
const successMessage = ref('')

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await authService.forgotPassword(values)
    successMessage.value = response.message
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      console.error('Forgot password error:', err)
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Resetuj hasło
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Podaj swój adres email, a wyślemy Ci link do resetu hasła
        </p>
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <Button type="submit" class="w-full">
          Wyślij link resetujący
        </Button>
      </form>

      <div class="text-center">
        <router-link to="/login" class="text-sm text-primary hover:underline">
          Powrót do logowania
        </router-link>
      </div>
    </div>
  </div>
</template>
