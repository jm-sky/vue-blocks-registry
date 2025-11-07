<script setup lang="ts">
import DeleteAccountCard from '@registry/modules/settings/components/DeleteAccountCard.vue'
import PreferencesSettingsCard from '@registry/modules/settings/components/PreferencesSettingsCard.vue'
import SecuritySettingsCard from '@registry/modules/settings/components/SecuritySettingsCard.vue'
import { useI18n } from 'vue-i18n'
import type { IAuthService } from '@registry/modules/auth/types/auth.type'
import type { ITwoFactorService } from '@registry/modules/auth/types/twoFactor.type'
import type { ISettingsService } from '@registry/modules/settings/types/settings.type'

const props = defineProps<{
  service?: ISettingsService
  twoFactorService?: ITwoFactorService
  authService?: IAuthService
}>()

const { t } = useI18n()
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-1">
      <h1 class="text-3xl font-bold tracking-tight">
        {{ t('settings.page.title') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ t('settings.page.subtitle') }}
      </p>
    </div>

    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Preferences Settings -->
      <PreferencesSettingsCard :service="props.service" />

      <!-- Security Settings -->
      <SecuritySettingsCard :service="props.twoFactorService" />

      <!-- Delete Account Section (Danger Zone) -->
      <DeleteAccountCard :auth-service="props.authService" />
    </div>
  </div>
</template>

