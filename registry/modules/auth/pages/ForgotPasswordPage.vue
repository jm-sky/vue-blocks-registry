<script setup lang="ts">
import { Alert, AlertDescription } from '@registry/components/ui/alert'
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { forgotPasswordSchema } from '@registry/modules/auth/validation/forgotPassword.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { CircleCheck } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ForgotPasswordData } from '@registry/modules/auth/types/user.type'

const { t } = useI18n()
const { forgotPassword, isForgotPasswordLoading } = useAuth()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ForgotPasswordData) => {
  try {
    const response = await forgotPassword(values)
    successMessage.value = response.message
  } catch (err: unknown) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occurred in forgot password process')
      console.error('Forgot password error:', err)
    }
  }
})
</script>

<template>
  <GuestLayoutCentered>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-foreground">
          {{ t('auth.forgot_password_page.title') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ t('auth.forgot_password_page.subtitle') }}
        </p>
      </div>

      <div class="bg-card py-8 px-6 shadow-lg rounded-lg space-y-4">
        <Alert v-if="successMessage" variant="default" class="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CircleCheck class="size-4 text-green-600 dark:text-green-400" />
          <AlertDescription class="text-green-700 dark:text-green-300">
            {{ successMessage }}
          </AlertDescription>
        </Alert>

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

          <Button type="submit" class="w-full" :loading="isForgotPasswordLoading">
            {{ t('auth.form.submit_reset') }}
          </Button>
        </form>
      </div>

      <div class="text-center">
        <RouterLink to="/auth/login" class="text-sm text-primary hover:underline">
          {{ t('auth.forgot_password_page.back_to_login') }}
        </RouterLink>
      </div>
    </div>
  </GuestLayoutCentered>
</template>
