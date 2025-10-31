<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { resetPasswordSchema } from '@registry/modules/auth/validation/resetPassword.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { ResetPasswordData } from '@registry/modules/auth/types/user.type'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { resetPassword, isResetPasswordLoading } = useAuth()

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    email: (route.query.email as string | null) ?? '',
    token: (route.query.token as string | null) ?? '',
    password: '',
    passwordConfirmation: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ResetPasswordData) => {
  try {
    const response = await resetPassword(values)
    successMessage.value = response.message
    setTimeout(() => router.push('/auth/login'), 2000)
  } catch (err: unknown) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occurred in reset password process')
      console.error('Reset password error:', err)
    }
  }
})
</script>

<template>
  <GuestLayoutCentered>
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-foreground">
          {{ t('auth.reset_password_page.title') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ t('auth.reset_password_page.subtitle') }}
        </p>
      </div>

      <div class="bg-card py-8 px-6 shadow-lg rounded-lg space-y-4">
        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {{ successMessage }}
        </div>

        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="token">
            <FormItem>
              <FormControl>
                <Input type="hidden" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>

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
                {{ t('auth.new_password') }}
              </FormLabel>
              <FormControl>
                <Input type="password" :placeholder="t('auth.form.new_password_placeholder')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="passwordConfirmation">
            <FormItem>
              <FormLabel required>
                {{ t('auth.password_confirm') }}
              </FormLabel>
              <FormControl>
                <Input type="password" :placeholder="t('auth.form.password_confirm_placeholder')" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :loading="isResetPasswordLoading">
            {{ t('auth.form.submit_reset_password') }}
          </Button>
        </form>
      </div>

      <div class="text-center">
        <RouterLink to="/auth/login" class="text-sm text-primary hover:underline">
          {{ t('auth.reset_password_page.back_to_login') }}
        </RouterLink>
      </div>
    </div>
  </GuestLayoutCentered>
</template>
