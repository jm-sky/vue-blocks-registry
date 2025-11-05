<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@registry/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@registry/components/ui/form'
import { Input } from '@registry/components/ui/input'
import { useSetupTotp, useVerifyTotp } from '@registry/modules/auth/composables/useTotp'
import { totpVerifySchema } from '@registry/modules/auth/validation/totp.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { CheckCircle2, Shield } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import TotpQrCode from './TotpQrCode.vue'
import type { ITwoFactorService, TotpSetup } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const emit = defineEmits<{
  success: []
}>()

const { t } = useI18n()
const { mutateAsync: setupTotp, isPending: isSettingUp } = useSetupTotp(props.service)
const { mutateAsync: verifyTotp, isPending: isVerifying } = useVerifyTotp(props.service)

const step = ref<'start' | 'scan' | 'verify' | 'complete'>('start')
const setupData = ref<TotpSetup | null>(null)

const { handleSubmit, setErrors } = useForm({
  validationSchema: toTypedSchema(totpVerifySchema),
})

const handleSetup = async () => {
  try {
    setupData.value = await setupTotp()
    step.value = 'scan'
  } catch (err) {
    toast.error(t('errors.generic'))
    console.error('TOTP setup error:', err)
  }
}

const handleContinueToVerify = () => {
  step.value = 'verify'
}

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await verifyTotp(values.code)

    if (!result.verified) {
      setErrors({ code: t('auth.two_factor.totp.invalid_code') })
      toast.error(t('auth.two_factor.totp.invalid_code'))
      return
    }

    step.value = 'complete'
    toast.success(t('auth.two_factor.totp.setup_success'))
  } catch (err) {
    toast.error(t('errors.generic'))
    console.error('TOTP verification error:', err)
  }
})

const handleComplete = () => {
  emit('success')
}
</script>

<template>
  <Card>
    <!-- Start Step -->
    <template v-if="step === 'start'">
      <CardHeader>
        <div class="flex items-center gap-2">
          <Shield :size="20" />
          <CardTitle>{{ t('auth.two_factor.totp.title') }}</CardTitle>
        </div>
        <CardDescription>{{ t('auth.two_factor.totp.description') }}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button :loading="isSettingUp" class="w-full" @click="handleSetup">
          {{ t('auth.two_factor.totp.setup') }}
        </Button>
      </CardFooter>
    </template>

    <!-- Scan QR Code Step -->
    <template v-if="step === 'scan' && setupData">
      <CardHeader>
        <CardTitle>{{ t('auth.two_factor.totp.scan_step_title') }}</CardTitle>
        <CardDescription>{{ t('auth.two_factor.totp.scan_step_description') }}</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <TotpQrCode :qr-code="setupData.qrCode" :secret="setupData.secret" />
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="handleContinueToVerify">
          {{ t('auth.two_factor.totp.continue_to_verify') }}
        </Button>
      </CardFooter>
    </template>

    <!-- Verify Code Step -->
    <template v-if="step === 'verify'">
      <form class="space-y-4" @submit="onSubmit">
        <CardHeader>
          <CardTitle>{{ t('auth.two_factor.totp.verify_step_title') }}</CardTitle>
          <CardDescription>{{ t('auth.two_factor.totp.verify_step_description') }}</CardDescription>
        </CardHeader>
        <CardContent>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter>
          <Button type="submit" :loading="isVerifying" class="w-full">
            {{ t('auth.two_factor.totp.verify_button') }}
          </Button>
        </CardFooter>
      </form>
    </template>

    <!-- Complete Step -->
    <template v-if="step === 'complete' && setupData">
      <CardHeader>
        <div class="flex items-center gap-2 text-success">
          <CheckCircle2 :size="20" />
          <CardTitle>{{ t('auth.two_factor.totp.setup_complete') }}</CardTitle>
        </div>
        <CardDescription>{{ t('auth.two_factor.totp.backup_codes_description') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="bg-muted p-4 rounded space-y-2">
          <p class="text-sm font-medium">
            {{ t('auth.two_factor.totp.backup_codes') }}
          </p>
          <div class="grid grid-cols-2 gap-2">
            <code v-for="(code, i) in setupData.backupCodes" :key="i" class="text-sm bg-background p-2 rounded text-center">
              {{ code }}
            </code>
          </div>
          <p class="text-xs text-muted-foreground mt-2">
            {{ t('auth.two_factor.totp.backup_codes_warning') }}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="handleComplete">
          {{ t('common.done') }}
        </Button>
      </CardFooter>
    </template>
  </Card>
</template>
