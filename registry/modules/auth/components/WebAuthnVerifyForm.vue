<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { useVerifyPasskey } from '@registry/modules/auth/composables/useWebAuthn'
import { Fingerprint } from 'lucide-vue-next'
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
const { mutateAsync: verifyPasskey, isPending: isVerifying } = useVerifyPasskey(props.service)

const handleVerify = async () => {
  try {
    const result = await verifyPasskey()
    emit('success', result.accessToken)
    toast.success(t('auth.two_factor.verification_success'))
  } catch (err: unknown) {
    // Handle WebAuthn errors
    if (err instanceof Error && err.name === 'NotAllowedError') {
      toast.error(t('auth.two_factor.webauthn.user_cancelled'))
    } else if (err instanceof Error && err.name === 'NotSupportedError') {
      toast.error(t('auth.two_factor.webauthn.not_supported'))
    } else {
      toast.error(t('errors.generic'))
    }
    console.error('Passkey verification error:', err)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="text-center space-y-2">
      <Fingerprint :size="48" class="mx-auto text-primary" />
      <p class="text-sm text-muted-foreground">
        {{ t('auth.two_factor.webauthn.verify_instruction') }}
      </p>
    </div>

    <Button :loading="isVerifying" class="w-full" @click="handleVerify">
      {{ t('auth.two_factor.webauthn.verify') }}
    </Button>
  </div>
</template>
