<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { forgotPasswordSchema } from '../validation/forgotPassword.schema'
import { useAuth } from '../composables/useAuth'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { ref } from 'vue'
import type { ForgotPasswordData } from '../types/user'

const { forgotPassword, isForgotPasswordLoading } = useAuth()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ForgotPasswordData) => {
  try {
    const response = await forgotPassword(values)
    successMessage.value = response.message
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occurred in forgot password process')
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
          Reset Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a password reset link
        </p>
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :loading="isForgotPasswordLoading">
          Send Reset Link
        </Button>
      </form>

      <div class="text-center">
        <router-link to="/login" class="text-sm text-primary hover:underline">
          Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>
