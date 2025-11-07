<script setup lang="ts">
import PageCard from '@registry/components/layout/PageCard.vue'
import AuthenticatedLayout from '@registry/layouts/AuthenticatedLayout.vue'
import { mockAuthService } from '@registry/modules/auth/services/mockAuthService'
import { mockTwoFactorService } from '@registry/modules/auth/services/mockTwoFactorService'
import SettingsPage from '@registry/modules/settings/pages/SettingsPage.vue'
import { mockSettingsService } from '@registry/modules/settings/services/mockSettingsService'
</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <SettingsPage
        :service="mockSettingsService"
        :two-factor-service="mockTwoFactorService"
        :auth-service="mockAuthService"
      />
    </PageCard>
  </AuthenticatedLayout>
</template>


