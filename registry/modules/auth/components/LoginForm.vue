<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { loginSchema } from '@registry/modules/auth/validation/login.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { isAxiosError } from 'axios'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { IAuthService } from '@registry/modules/auth/types/auth.type'
import type { LoginCredentials } from '@registry/modules/auth/types/user.type'

const { authService, defaultEmail } = defineProps<{
  authService?: IAuthService
  defaultEmail?: string
}>()

const { t } = useI18n()
const router = useRouter()
const { login, isLoggingIn } = useAuth(authService)

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: defaultEmail ?? import.meta.env.VITE_DEFAULT_USER_EMAIL ?? '',
    password: import.meta.env.VITE_DEFAULT_USER_PASSWORD ?? ''
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
      setErrors({
        email: t('auth.invalid_credentials'),
        password: t('auth.invalid_credentials'),
      })
    }
    toast.error(isAxiosError(err) ? err.response?.data.detail : t('errors.generic'))
    console.error('Login error:', err)
  }
})
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel required>
          {{ t('auth.email') }}
        </FormLabel>
        <FormControl>
          <Input type="email" :placeholder="t('auth.form.email_placeholder')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel required>
          {{ t('auth.password') }}
        </FormLabel>
        <FormControl>
          <Input type="password" :placeholder="t('auth.form.password_placeholder')" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full" :loading="isLoggingIn">
      {{ t('auth.form.submit_login') }}
    </Button>
  </form>
</template>
