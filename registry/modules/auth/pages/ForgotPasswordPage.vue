<script setup lang="ts">
import AuthLayout from '@registry/app/layouts/AuthLayout.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { forgotPasswordSchema } from '../validation/forgotPassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { ref } from 'vue'
import type { ForgotPasswordData } from '../types/user'

const { handleSubmit, setErrors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ForgotPasswordData) => {
  try {
    const response = await authService.forgotPassword(values)
    successMessage.value = response.message
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occured in forgot password process')
      console.error('Forgot password error:', err)
    }
  }
})
</script>

<template>
  <AuthLayout>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a password reset link
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-lg space-y-4">
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

          <Button type="submit" class="w-full" :loading="isSubmitting">
            Send Reset Link
          </Button>
        </form>
      </div>

      <div class="text-center">
        <RouterLink to="/auth/login" class="text-sm text-primary hover:underline">
          Back to Login
        </RouterLink>
      </div>
    </div>
  </AuthLayout>
</template>
