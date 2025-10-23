<script setup lang="ts">
import AuthenticatedLayout from '@registry/app/layouts/AuthenticatedLayout.vue'
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useAuth } from '@registry/modules/auth/composables/useAuth'
import { changePasswordSchema } from '@registry/modules/auth/validation/changePassword.schema'
import { isValidationError } from '@registry/shared/utils/typeGuards'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChangePasswordData } from '@registry/modules/auth/types/user'

const { t } = useI18n()
const { changePassword, isChangePasswordLoading } = useAuth()

const { handleSubmit, setErrors, resetForm } = useForm({
  validationSchema: toTypedSchema(changePasswordSchema),
  initialValues: {
    currentPassword: '',
    password: '',
    passwordConfirmation: ''
  }
})

const successMessage = ref('')

const onSubmit = handleSubmit(async (values: ChangePasswordData) => {
  try {
    const response = await changePassword(values)
    successMessage.value = response.message
    resetForm()
  } catch (err: unknown) {
    if (isValidationError(err)) {
      setErrors(err.response.data.errors)
    } else {
      // TODO: add toast/sonner notification from shadcn-vue
      // toast.error('Unexpected error occurred in change password process')
      console.error('Change password error:', err)
    }
  }
})
</script>

<template>
  <AuthenticatedLayout>
    <div class="max-w-md mx-auto py-8">
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-foreground">
            {{ t('auth.change_password_page.title') }}
          </h2>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ t('auth.change_password_page.subtitle') }}
          </p>
        </div>

        <div class="bg-card py-8 px-6 shadow-lg rounded-lg space-y-4">
          <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {{ successMessage }}
          </div>

          <form class="space-y-4" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="currentPassword">
              <FormItem>
                <FormLabel>{{ t('auth.current_password') }}</FormLabel>
                <FormControl>
                  <Input type="password" :placeholder="t('auth.form.current_password_placeholder')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>{{ t('auth.new_password') }}</FormLabel>
                <FormControl>
                  <Input type="password" :placeholder="t('auth.form.new_password_placeholder')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="passwordConfirmation">
              <FormItem>
                <FormLabel>{{ t('auth.new_password_confirm') }}</FormLabel>
                <FormControl>
                  <Input type="password" :placeholder="t('auth.form.new_password_confirm_placeholder')" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <Button type="submit" class="w-full" :loading="isChangePasswordLoading">
              {{ t('auth.form.submit_change_password') }}
            </Button>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
