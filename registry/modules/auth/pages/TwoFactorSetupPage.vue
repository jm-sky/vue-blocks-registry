<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@registry/components/ui/tabs'
import PasskeyList from '@registry/modules/auth/components/PasskeyList.vue'
import TotpSetupForm from '@registry/modules/auth/components/TotpSetupForm.vue'
import WebAuthnRegisterForm from '@registry/modules/auth/components/WebAuthnRegisterForm.vue'
import { useDisableTotp } from '@registry/modules/auth/composables/useTotp'
import { useTotpStatus, useTwoFactorStatus, useWebAuthnStatus } from '@registry/modules/auth/composables/useTwoFactor'
import { CheckCircle2, Shield } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const { t } = useI18n()
const router = useRouter()

const { data: twoFactorStatus } = useTwoFactorStatus(props.service)
const { data: totpStatus, refetch: refetchTotpStatus } = useTotpStatus(props.service)
const { data: webauthnStatus, refetch: refetchWebAuthnStatus } = useWebAuthnStatus(props.service)
const { mutateAsync: disableTotp, isPending: isDisabling } = useDisableTotp(props.service)

const showTotpSetup = ref(false)
const showPasskeyRegister = ref(false)

const handleTotpSetupSuccess = async () => {
  showTotpSetup.value = false
  await refetchTotpStatus()
}

const handlePasskeyRegisterSuccess = async () => {
  showPasskeyRegister.value = false
  await refetchWebAuthnStatus()
}

const handleDisableTotp = async () => {
  if (!confirm(t('auth.two_factor.totp.disable_confirm'))) {
    return
  }

  try {
    await disableTotp()
    toast.success(t('auth.two_factor.totp.disable_success'))
    await refetchTotpStatus()
  } catch (err) {
    toast.error(t('errors.generic'))
    console.error('Disable TOTP error:', err)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <Shield :size="24" />
        <h1 class="text-3xl font-bold">
          {{ t('auth.two_factor.title') }}
        </h1>
      </div>
      <p class="text-muted-foreground">
        {{ t('auth.two_factor.subtitle') }}
      </p>
    </div>

    <div class="space-y-6 max-w-2xl mx-auto">
      <!-- Tabs for TOTP and WebAuthn -->
      <Tabs default-value="totp" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="totp">
            {{ t('auth.two_factor.totp.title') }}
          </TabsTrigger>
          <TabsTrigger value="webauthn">
            {{ t('auth.two_factor.webauthn.title') }}
          </TabsTrigger>
        </TabsList>

        <!-- TOTP Tab -->
        <TabsContent value="totp" class="space-y-4">
          <!-- TOTP Status Card -->
          <Card v-if="totpStatus?.enabled">
            <CardHeader>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <CheckCircle2 :size="20" class="text-success" />
                  <CardTitle>{{ t('auth.two_factor.totp.enabled') }}</CardTitle>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  :disabled="isDisabling"
                  @click="handleDisableTotp"
                >
                  {{ t('auth.two_factor.totp.disable') }}
                </Button>
              </div>
              <CardDescription>{{ t('auth.two_factor.totp.enabled_description') }}</CardDescription>
            </CardHeader>
          </Card>

          <!-- TOTP Setup -->
          <div v-if="!totpStatus?.enabled">
            <TotpSetupForm v-if="showTotpSetup" :service @success="handleTotpSetupSuccess" />
            <Card v-else>
              <CardHeader>
                <CardTitle>{{ t('auth.two_factor.totp.title') }}</CardTitle>
                <CardDescription>{{ t('auth.two_factor.totp.description') }}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button @click="showTotpSetup = true">
                  {{ t('auth.two_factor.totp.setup') }}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <!-- WebAuthn Tab -->
        <TabsContent value="webauthn" class="space-y-4">
          <!-- Passkeys List -->
          <PasskeyList :service />

          <!-- Add Passkey -->
          <div v-if="showPasskeyRegister">
            <WebAuthnRegisterForm :service @success="handlePasskeyRegisterSuccess" />
          </div>
          <Button v-else class="w-full" @click="showPasskeyRegister = true">
            {{ t('auth.two_factor.webauthn.add_passkey') }}
          </Button>
        </TabsContent>
      </Tabs>

      <!-- Back Button -->
      <div class="flex justify-start">
        <Button variant="outline" @click="router.push('/settings')">
          {{ t('common.back') }}
        </Button>
      </div>
    </div>
  </div>
</template>
