<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { cn } from '@registry/lib/utils'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { loginSchema } from '@registry/modules/auth/validation/login.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import type { LoginCredentials } from '@registry/modules/auth/types/user'
import type { HTMLAttributes } from 'vue'

const router = useRouter()
const route = useRoute()
const message: string | null = route.meta.message as string | null

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { login } = useAuth()

const { handleSubmit, setErrors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: ''
  }
})

const onSubmit = handleSubmit(async (values: LoginCredentials) => {
  try {
    await login(values)
    await router.push('/dashboard')
  } catch (err: unknown) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occured in login process')
      console.error('Login error:', err)
    }
  }
})
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <div class="flex flex-col gap-6">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    v-bind="componentField"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <div class="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <RouterLink
                    to="/auth/forgot-password"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </RouterLink>
                </div>
                <FormControl>
                  <Input type="password" v-bind="componentField" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex flex-col gap-3">
              <Button
                type="submit"
                class="w-full"
                :disabled="isSubmitting"
                :loading="isSubmitting"
              >
                {{ isSubmitting ? 'Logging in...' : 'Login' }}
              </Button>
              <Button variant="outline" class="w-full" :disabled="isSubmitting">
                Login with Google
              </Button>
            </div>
          </div>

          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <RouterLink to="/auth/register" class="underline underline-offset-4 hover:text-primary">
              Sign up
            </RouterLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <div v-if="message" class="border rounded-lg bg-blue-500/10 p-4 text-sm shadow">
      {{ message }}
    </div>
  </div>
</template>
