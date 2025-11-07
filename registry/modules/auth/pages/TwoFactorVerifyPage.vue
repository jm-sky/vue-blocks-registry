<script setup lang="ts">
import GuestLayoutCard from '@registry/components/layout/GuestLayoutCard.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@registry/components/ui/tabs'
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import TotpVerifyForm from '@registry/modules/auth/components/TotpVerifyForm.vue'
import WebAuthnVerifyForm from '@registry/modules/auth/components/WebAuthnVerifyForm.vue'
import { useTotpStatus, useWebAuthnStatus } from '@registry/modules/auth/composables/useTwoFactor'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { Shield } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const { data: totpStatus } = useTotpStatus(props.service)
const { data: webauthnStatus } = useWebAuthnStatus(props.service)

// Determine available 2FA methods
const hasTOTP = computed(() => totpStatus.value?.enabled ?? false)
const hasWebAuthn = computed(() => (webauthnStatus.value?.passkeys.length ?? 0) > 0)

// Get preferred method from user, with fallback logic
const defaultMethod = computed(() => {
  const preferred = authStore.user?.preferredTwoFactorMethod

  // If user has a preferred method and it's available, use it
  if (preferred === 'totp' && hasTOTP.value) {
    return 'totp'
  }
  if (preferred === 'webauthn' && hasWebAuthn.value) {
    return 'webauthn'
  }

  // Fallback to TOTP if available, otherwise WebAuthn
  return hasTOTP.value ? 'totp' : 'webauthn'
})

const handleVerificationSuccess = async (accessToken: string) => {
  // Store new token with tfaVerified flag
  localStorage.setItem('vbr_access_token', accessToken)

  // Redirect to dashboard or intended page
  await router.push('/dashboard')
}
</script>

<template>
  <GuestLayoutCentered>
    <GuestLayoutCard :title="t('auth.two_factor.verify_page.title')">
      <template #icon>
        <Shield :size="24" />
      </template>

      <template #header-description>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ t('auth.two_factor.verify_page.subtitle') }}
        </p>
      </template>

      <!-- Show tabs only if both methods are available -->
      <Tabs v-if="hasTOTP && hasWebAuthn" :default-value="defaultMethod" class="w-full">
        <TabsList class="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="totp">
            {{ t('auth.two_factor.totp.title') }}
          </TabsTrigger>
          <TabsTrigger value="webauthn">
            {{ t('auth.two_factor.webauthn.title') }}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="totp">
          <TotpVerifyForm :service @success="handleVerificationSuccess" />
        </TabsContent>

        <TabsContent value="webauthn">
          <WebAuthnVerifyForm :service @success="handleVerificationSuccess" />
        </TabsContent>
      </Tabs>

      <!-- Show single form if only one method is available -->
      <TotpVerifyForm v-else-if="hasTOTP" :service @success="handleVerificationSuccess" />
      <WebAuthnVerifyForm v-else-if="hasWebAuthn" :service @success="handleVerificationSuccess" />

      <!-- Fallback if no methods configured (shouldn't happen) -->
      <div v-else class="text-center text-muted-foreground py-4">
        {{ t('auth.two_factor.no_methods_configured') }}
      </div>
    </GuestLayoutCard>
  </GuestLayoutCentered>
</template>
