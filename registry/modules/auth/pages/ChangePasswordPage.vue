<script setup lang="ts">
import AuthenticatedLayout from '@registry/app/layouts/AuthenticatedLayout.vue'
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { authService } from '@registry/modules/auth/services/authService'
import { changePasswordSchema } from '@registry/modules/auth/validation/changePassword.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import type { ChangePasswordData } from '@registry/modules/auth/types/user'

const { handleSubmit, setErrors, resetForm, isSubmitting } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
  initialValues: {
    currentPassword: '',
    password: '',
    passwordConfirmation: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ChangePasswordData) => {
  try {
    const response = await authService.changePassword(values)
    successMessage.value = response.message
    resetForm()
  } catch (err: unknown) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occured in change password process')
      console.error('Change password error:', err)
    }
  }
})
</script>

<template>
  <AuthenticatedLayout>
    <div class="max-w-md mx-auto py-8">
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Change Password
          </h2>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Update your password to enhance account security
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-lg space-y-4">
          <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {{ successMessage }}
          </div>

          <form class="space-y-4" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="currentPassword">
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter current password" v-bind="componentField" />
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
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm new password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button type="submit" class="w-full" :loading="isSubmitting">
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
