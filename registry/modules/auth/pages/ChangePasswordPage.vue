<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { changePasswordSchema } from '../validation/changePassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { ref } from 'vue'

const { handleSubmit, errors, setErrors, defineField, resetForm } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
})

const [current_password] = defineField('current_password')
const [password] = defineField('password')
const [password_confirmation] = defineField('password_confirmation')
const successMessage = ref('')

const onSubmit = handleSubmit(async (values) => {
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
})
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

      <form @submit="onSubmit" class="space-y-4">
        <div>
          <label for="current_password" class="block text-sm font-medium mb-1">Obecne hasło</label>
          <input
            id="current_password"
            v-model="current_password"
            type="password"
            class="w-full px-3 py-2 border rounded-md"
            :class="{ 'border-red-500': errors.current_password }"
          />
          <p v-if="errors.current_password" class="text-red-500 text-sm mt-1">{{ errors.current_password }}</p>
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
          <label for="password_confirmation" class="block text-sm font-medium mb-1">Potwierdź nowe hasło</label>
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
          Zmień hasło
        </Button>
      </form>
    </div>
  </div>
</template>
