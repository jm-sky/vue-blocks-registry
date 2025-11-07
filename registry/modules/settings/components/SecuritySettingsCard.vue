<script setup lang="ts">
import Badge from '@registry/components/ui/badge/Badge.vue'
import { Button } from '@registry/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@registry/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@registry/components/ui/select'
import { useTwoFactorStatus, useUpdatePreferredMethod } from '@registry/modules/auth/composables/useTwoFactor'
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { CheckCircle2, Shield, ShieldEllipsisIcon, TabletIcon, XCircle } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'

const props = defineProps<{
  service?: ITwoFactorService
}>()

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const { data: twoFactorStatus, isLoading } = useTwoFactorStatus(props.service)
const updatePreferredMethodMutation = useUpdatePreferredMethod(props.service)

const has2FAEnabled = computed(() => {
  if (!twoFactorStatus.value) return false
  return twoFactorStatus.value.totp.enabled || twoFactorStatus.value.webauthn.enabled
})

const passkeyCount = computed(() => {
  return twoFactorStatus.value?.webauthn.passkeys.length ?? 0
})

// Get preferred method from current user
const preferredMethod = ref<string | null>(authStore.user?.preferredTwoFactorMethod ?? null)

// Convert null to 'none' for select value
const selectedMethod = computed({
  get: () => preferredMethod.value ?? 'none',
  set: (value: string) => {
    const newMethod = value === 'none' ? null : (value as 'totp' | 'webauthn')

    updatePreferredMethodMutation.mutateAsync({
      preferredMethod: newMethod,
    })
      .then(() => {
        preferredMethod.value = newMethod

        // Update auth store user
        if (authStore.user) {
          authStore.user.preferredTwoFactorMethod = newMethod
        }

        toast.success(t('settings.security.preferred_method.saved'))
      })
      .catch((error: unknown) => {
        toast.error(t('settings.security.preferred_method.error'))
        console.error('Failed to update preferred method:', error)
      })
  },
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
          <div class="flex items-center gap-3 flex-1">
            <div>
              <TabletIcon :size="20" />
            </div>
            <div class="flex-1">
              <p class="font-medium text-sm">
                {{ t('settings.security.totp.title') }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ twoFactorStatus?.totp.enabled ? t('settings.security.totp.enabled') : t('settings.security.totp.disabled') }}
              </p>
            </div>
            <Badge v-if="twoFactorStatus?.totp.enabled" variant="success-outline" class="py-1">
              <CheckCircle2 class="size-4! text-success" />
              {{ t('settings.security.totp.enabled') }}
            </Badge>
            <Badge v-else variant="outline" class="py-1 border-muted-foreground/50 opacity-50">
              <XCircle class="size-4! text-muted-foreground" />
              {{ t('settings.security.totp.disabled') }}
            </Badge>
          </div>
        </div>

        <!-- WebAuthn Status -->
        <div class="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div class="flex items-center gap-3 flex-1">
            <div>
              <ShieldEllipsisIcon :size="20" />
            </div>
            <div class="flex-1">
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
            <Badge v-if="twoFactorStatus?.webauthn.enabled" variant="success-outline" class="py-1">
              <CheckCircle2 class="size-4! text-success" />
              {{ t('settings.security.passkeys.enabled') }}
            </Badge>
            <Badge v-else variant="outline" class="py-1 border-muted-foreground/50 opacity-50">
              <XCircle class="size-4! text-muted-foreground" />
              {{ t('settings.security.passkeys.disabled') }}
            </Badge>
          </div>
        </div>

        <!-- Preferred Method Selector (only show if both methods are enabled) -->
        <div v-if="twoFactorStatus?.totp.enabled && twoFactorStatus?.webauthn.enabled" class="border-t pt-4 mt-4">
          <div class="space-y-3">
            <div>
              <p class="font-medium text-sm">
                {{ t('settings.security.preferred_method.title') }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                {{ t('settings.security.preferred_method.description') }}
              </p>
            </div>

            <Select v-model="selectedMethod" class="w-48">
              <SelectTrigger>
                <SelectValue :placeholder="t('settings.security.preferred_method.placeholder')" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{{ t('settings.security.preferred_method.label') }}</SelectLabel>
                  <SelectItem value="none">
                    {{ t('settings.security.preferred_method.options.none') }}
                  </SelectItem>
                  <SelectItem value="totp">
                    {{ t('settings.security.preferred_method.options.totp') }}
                  </SelectItem>
                  <SelectItem value="webauthn">
                    {{ t('settings.security.preferred_method.options.webauthn') }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
