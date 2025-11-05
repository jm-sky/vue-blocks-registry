<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@registry/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useRegisterPasskey } from '@registry/modules/auth/composables/useWebAuthn'
import { passkeyNameSchema } from '@registry/modules/auth/validation/webauthn.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { Fingerprint } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const emit = defineEmits<{
  success: []
}>()

const { t } = useI18n()
const { mutateAsync: registerPasskey, isPending: isRegistering } = useRegisterPasskey(props.service)

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(passkeyNameSchema),
  initialValues: {
    name: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await registerPasskey({ name: values.name })
    toast.success(t('auth.two_factor.webauthn.register_success'))
    emit('success')
  } catch (err: unknown) {
    // Handle WebAuthn errors
    if (err instanceof Error && err.name === 'NotAllowedError') {
      toast.error(t('auth.two_factor.webauthn.user_cancelled'))
    } else if (err instanceof Error && err.name === 'NotSupportedError') {
      toast.error(t('auth.two_factor.webauthn.not_supported'))
    } else {
      toast.error(t('errors.generic'))
    }
    console.error('Passkey registration error:', err)
  }
})
</script>

<template>
  <Card>
    <form @submit="onSubmit">
      <CardHeader>
        <div class="flex items-center gap-2">
          <Fingerprint :size="20" />
          <CardTitle>{{ t('auth.two_factor.webauthn.register_title') }}</CardTitle>
        </div>
        <CardDescription>{{ t('auth.two_factor.webauthn.register_description') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel required>
              {{ t('auth.two_factor.webauthn.passkey_name') }}
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="t('auth.two_factor.webauthn.passkey_name_placeholder')"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
            <p class="text-sm text-muted-foreground">
              {{ t('auth.two_factor.webauthn.passkey_name_help') }}
            </p>
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter>
        <Button type="submit" :loading="isRegistering" class="w-full">
          {{ t('auth.two_factor.webauthn.register') }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
