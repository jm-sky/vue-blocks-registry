<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordSchema } from '../validation/resetPassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { handleSubmit, errors, setErrors, defineField } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    email: route.query.email as string || '',
    token: route.query.token as string || '',
  }
})

const [email] = defineField('email')
const [token] = defineField('token')
const [password] = defineField('password')
const [password_confirmation] = defineField('password_confirmation')
const successMessage = ref('')

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await authService.resetPassword(values)
    successMessage.value = response.message
    setTimeout(() => router.push('/login'), 2000)
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      console.error('Reset password error:', err)
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Ustaw nowe hasło
        </h2>
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <input type="hidden" v-model="token" />

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

        <div>
          <label for="password" class="block text-sm font-medium mb-1">Nowe hasło</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': errors.password }"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium mb-1">Potwierdź hasło</label>
          <input
            id="password_confirmation"
            v-model="password_confirmation"
            type="password"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': errors.password_confirmation }"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
        </div>

        <Button type="submit" class="w-full">
          Resetuj hasło
        </Button>
      </form>
    </div>
  </div>
</template>
