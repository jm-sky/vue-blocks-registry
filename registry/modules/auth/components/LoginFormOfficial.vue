<script setup lang="ts">
import Alert from '@registry/components/ui/alert/Alert.vue'
import AlertDescription from '@registry/components/ui/alert/AlertDescription.vue'
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
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { LoginCredentials } from '@registry/modules/auth/types/user'
import type { HTMLAttributes } from 'vue'

const { t } = useI18n()

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
    email: import.meta.env.VITE_DEFAULT_USER_EMAIL ?? '',
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
        <CardTitle>{{ t('auth.sign_in_to_account') }}</CardTitle>
        <CardDescription>
          {{ t('auth.official_form.description') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <div class="flex flex-col gap-6">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>{{ t('auth.email') }}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    :placeholder="t('auth.form.email_placeholder')"
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
                  <FormLabel>{{ t('auth.password') }}</FormLabel>
                  <RouterLink
                    to="/auth/forgot-password"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {{ t('auth.forgot_password') }}
                  </RouterLink>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    :placeholder="t('auth.form.password_placeholder')"
                    v-bind="componentField"
                    required
                  />
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
                {{ isSubmitting ? t('common.loading') : t('auth.form.submit_login') }}
              </Button>
              <Button variant="outline" class="w-full" :disabled="isSubmitting">
                {{ t('auth.login_with_google') }}
              </Button>
            </div>
          </div>

          <div class="mt-4 text-center text-sm">
            {{ t('auth.dont_have_account') }}
            <RouterLink to="/auth/register" class="underline underline-offset-4 hover:text-primary">
              {{ t('auth.sign_up') }}
            </RouterLink>
          </div>
        </form>
      </CardContent>
    </Card>

    <Alert v-if="message" variant="info">
      <AlertDescription>{{ message }}</AlertDescription>
    </Alert>
  </div>
</template>
