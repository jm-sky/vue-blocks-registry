<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from '../validation/register.schema'
import { useAuth } from '../composables/useAuth'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = useAuth()

const { handleSubmit, setErrors, defineField } = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const [email] = defineField('email')
const [password] = defineField('password')
const [password_confirmation] = defineField('password_confirmation')
const [name] = defineField('name')

const onSubmit = async (values: any) => {
  try {
    await register(values)
    router.push('/dashboard')
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      console.error('Register error:', err)
    }
  }
}
</script>

<template>
  <Form :onSubmit="onSubmit" class="space-y-4">
    <FormField label="Imię (opcjonalne)">
      <Input
        id="name"
        v-model="name"
        type="text"
        placeholder="Wprowadź imię"
      />
    </FormField>

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

    <FormField label="Potwierdź hasło">
      <Input
        id="password_confirmation"
        v-model="password_confirmation"
        type="password"
        placeholder="Potwierdź hasło"
      />
    </FormField>

    <Button type="submit" class="w-full">
      Zarejestruj się
    </Button>
  </Form>
</template>
