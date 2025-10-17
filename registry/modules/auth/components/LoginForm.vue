<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema } from '../validation/login.schema'
import { useAuth } from '../composables/useAuth'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const { handleSubmit, errors, setErrors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await login(values)
    router.push('/dashboard')
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      console.error('Login error:', err)
    }
  }
})
</script>

<template>
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

    <div>
      <label for="password" class="block text-sm font-medium mb-1">Hasło</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="w-full px-3 py-2 border rounded-md"
        :class="{ 'border-red-500': errors.password }"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <Button type="submit" class="w-full">
      Zaloguj się
    </Button>
  </form>
</template>
