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

const { setErrors, defineField, resetForm } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
})

const [current_password] = defineField('current_password')
const [password] = defineField('password')
const [password_confirmation] = defineField('password_confirmation')
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
          Zmień hasło
        </h2>
        <p class="mt-1 text-sm text-gray-600">
          Zaktualizuj swoje hasło, aby zwiększyć bezpieczeństwo konta
        </p>
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <Form :onSubmit="onSubmit" class="space-y-4">
        <FormField label="Obecne hasło">
          <Input
            id="current_password"
            v-model="current_password"
            type="password"
            placeholder="Wprowadź obecne hasło"
          />
        </FormField>

        <FormField label="Nowe hasło">
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Wprowadź nowe hasło"
          />
        </FormField>

        <FormField label="Potwierdź nowe hasło">
          <Input
            id="password_confirmation"
            v-model="password_confirmation"
            type="password"
            placeholder="Potwierdź nowe hasło"
          />
        </FormField>

        <Button type="submit" class="w-full">
          Zmień hasło
        </Button>
      </Form>
    </div>
  </div>
</template>
