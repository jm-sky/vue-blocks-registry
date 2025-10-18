<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { resetPasswordSchema } from '../validation/resetPassword.schema'
import { authService } from '../services/authService'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { setErrors, defineField } = useForm({
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

const onSubmit = async (values: any) => {
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
}
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

      <Form :onSubmit="onSubmit" class="space-y-4">
        <input type="hidden" v-model="token" />

        <FormField label="Email">
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Wprowadź email"
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

        <FormField label="Potwierdź hasło">
          <Input
            id="password_confirmation"
            v-model="password_confirmation"
            type="password"
            placeholder="Potwierdź hasło"
          />
        </FormField>

        <Button type="submit" class="w-full">
          Resetuj hasło
        </Button>
      </Form>
    </div>
  </div>
</template>
