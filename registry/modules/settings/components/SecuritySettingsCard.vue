<script setup lang="ts">
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import { useTwoFactorStatus } from '@registry/modules/auth/composables/useTwoFactor'
import { CheckCircle2, Shield, XCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const { t } = useI18n()
const router = useRouter()
const { data: twoFactorStatus, isLoading } = useTwoFactorStatus(props.service)

const has2FAEnabled = computed(() => {
  if (!twoFactorStatus.value) return false
  return twoFactorStatus.value.totp.enabled || twoFactorStatus.value.webauthn.enabled
})

const passkeyCount = computed(() => {
  return twoFactorStatus.value?.webauthn.passkeys.length ?? 0
})

const handleManage2FA = async () => {
  await router.push('/auth/2fa/setup')
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Shield :size="20" />
          <CardTitle>{{ t('settings.security.title') }}</CardTitle>
        </div>
        <Button variant="outline" size="sm" @click="handleManage2FA">
          {{ has2FAEnabled ? t('settings.security.manage') : t('settings.security.setup') }}
        </Button>
      </div>
      <CardDescription>{{ t('settings.security.description') }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="space-y-2">
        <div class="h-4 w-3/4 bg-muted rounded animate-pulse" />
        <div class="h-4 w-1/2 bg-muted rounded animate-pulse" />
      </div>

      <div v-else class="space-y-4">
        <!-- TOTP Status -->
        <div class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div class="flex items-center gap-3">
            <div v-if="twoFactorStatus?.totp.enabled" class="text-success">
              <CheckCircle2 :size="20" />
            </div>
            <div v-else class="text-muted-foreground">
              <XCircle :size="20" />
            </div>
            <div>
              <p class="font-medium text-sm">
                {{ t('settings.security.totp.title') }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ twoFactorStatus?.totp.enabled ? t('settings.security.totp.enabled') : t('settings.security.totp.disabled') }}
              </p>
            </div>
          </div>
        </div>

        <!-- WebAuthn Status -->
        <div class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div class="flex items-center gap-3">
            <div v-if="twoFactorStatus?.webauthn.enabled" class="text-success">
              <CheckCircle2 :size="20" />
            </div>
            <div v-else class="text-muted-foreground">
              <XCircle :size="20" />
            </div>
            <div>
              <p class="font-medium text-sm">
                {{ t('settings.security.passkeys.title') }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ twoFactorStatus?.webauthn.enabled
                  ? t('settings.security.passkeys.count', { count: passkeyCount })
                  : t('settings.security.passkeys.disabled')
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Overall Status -->
        <div v-if="!has2FAEnabled" class="text-sm text-muted-foreground pt-2 border-t">
          {{ t('settings.security.not_configured') }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>
