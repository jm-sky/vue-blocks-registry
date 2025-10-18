<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordSchema } from '../validation/resetPassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ResetPasswordData } from '../types/user'

const route = useRoute()
const router = useRouter()

const { handleSubmit, setErrors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    email: route.query.email as string || '',
    token: route.query.token as string || '',
    password: '',
    passwordConfirmation: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ResetPasswordData) => {
  try {
    const response = await authService.resetPassword(values)
    successMessage.value = response.message
    setTimeout(() => router.push('/login'), 2000)
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occured in reset password process')
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
          Set New Password
        </h2>
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="token">
          <FormItem>
            <FormControl>
              <Input type="hidden" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter new password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="passwordConfirmation">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Confirm password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :loading="isSubmitting">
          Reset Password
        </Button>
      </form>
    </div>
  </div>
</template>
