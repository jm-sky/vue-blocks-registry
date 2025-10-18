<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema } from '../validation/register.schema'
import { useAuth } from '../composables/useAuth'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { Button } from '@registry/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useRouter } from 'vue-router'
import type { RegisterCredentials } from '../types/user'

const router = useRouter()
const { register, isRegistering } = useAuth()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }
})

const onSubmit = handleSubmit(async (values: RegisterCredentials) => {
  try {
    await register(values)
    router.push('/dashboard')
  } catch (err: any) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occured in register process')
      console.error('Register error:', err)
    }
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name (optional)</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
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
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Enter your password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="passwordConfirmation">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Confirm your password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full" :loading="isRegistering">
      Sign Up
    </Button>
  </form>
</template>
