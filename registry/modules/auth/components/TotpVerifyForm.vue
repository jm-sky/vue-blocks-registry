<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useVerifyTotp } from '@registry/modules/auth/composables/useTotp'
import { totpVerifySchema } from '@registry/modules/auth/validation/totp.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const emit = defineEmits<{
  success: [accessToken: string]
}>()

const { t } = useI18n()
const { mutateAsync: verifyTotp, isPending: isVerifying } = useVerifyTotp(props.service)

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(totpVerifySchema),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await verifyTotp(values.code)

    if (!result.verified) {
      setErrors({ code: t('auth.two_factor.totp.invalid_code') })
      toast.error(t('auth.two_factor.totp.invalid_code'))
      return
    }

    // In real implementation, backend would return new token
    // For now, emit success
    emit('success', 'new_token_with_tfa_verified')
    toast.success(t('auth.two_factor.verification_success'))
  } catch (err) {
    toast.error(t('errors.generic'))
    console.error('TOTP verification error:', err)
  }
})
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="code">
      <FormItem>
        <FormLabel required>
          {{ t('auth.two_factor.totp.code_label') }}
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            inputmode="numeric"
            pattern="[0-9]{6}"
            maxlength="6"
            :placeholder="t('auth.two_factor.totp.code_placeholder')"
            v-bind="componentField"
            autofocus
          />
        </FormControl>
        <FormMessage />
        <p class="text-sm text-muted-foreground">
          {{ t('auth.two_factor.totp.enter_code_help') }}
        </p>
      </FormItem>
    </FormField>

    <Button type="submit" class="w-full" :loading="isVerifying">
      {{ t('auth.two_factor.verify_button') }}
    </Button>
  </form>
</template>
