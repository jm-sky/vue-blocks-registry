<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema } from '../validation/login.schema'
import { useAuth } from '../composables/useAuth'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const { handleSubmit, setErrors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = async (values: any) => {
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
}
</script>

<template>
  <Form :onSubmit="onSubmit" class="space-y-4">
    <FormField label="Email">
      <Input
        id="email"
        v-model="email"
        type="email"
        placeholder="Wprowadź email"
      />
    </FormField>

    <FormField label="Hasło">
      <Input
        id="password"
        v-model="password"
        type="password"
        placeholder="Wprowadź hasło"
      />
    </FormField>

    <Button type="submit" class="w-full">
      Zaloguj się
    </Button>
  </Form>
</template>
