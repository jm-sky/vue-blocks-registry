<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { changePasswordSchema } from '../validation/changePassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { ref } from 'vue'

const { setErrors, resetForm } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
  initialValues: {
    current_password: '',
    password: '',
    password_confirmation: ''
  }
})

const successMessage = ref('')

const onSubmit = async (values: any) => {
  try {
    const response = await authService.changePassword(values)
    successMessage.value = response.message
    resetForm()
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      console.error('Change password error:', err)
    }
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-8">
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">
          Change Password
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Update your password to enhance account security
        </p>
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <Form :onSubmit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="current_password">
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

        <FormField v-slot="{ componentField }" name="password_confirmation">
          <FormItem>
            <FormLabel>Confirm New Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Confirm new password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full">
          Change Password
        </Button>
      </Form>
    </div>
  </div>
</template>
