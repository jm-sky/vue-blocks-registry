<!-- features/tenantFeat/pages/SelectTenantPage.vue -->
<script setup lang="ts">
import GuestLayoutCard from '@registry/components/layout/GuestLayoutCard.vue'
import ButtonLink from '@registry/components/ui/button-link/ButtonLink.vue'
import GuestLayoutCentered from '@registry/layouts/GuestLayoutCentered.vue'
import { useLogout } from '@registry/modules/auth/composables/useLogout'
import { AuthRoutePaths } from '@registry/modules/auth/config/routes'
import { useI18n } from 'vue-i18n'
import type { ITenantService } from '../types/tenantService.type'
import TenantGrid from '../components/TenantGrid.vue'

const { t } = useI18n()

const { tenantService } = defineProps<{
  tenantService?: ITenantService
}>()

const { logout } = useLogout()
</script>

<template>
  <GuestLayoutCentered>
    <GuestLayoutCard
      :title="t('tenant.select_tenant')"
      :description="t('tenant.select_tenant_description')"
    >
      <TenantGrid :tenant-service />

      <template #footer>
        <ButtonLink variant="outline" :to="AuthRoutePaths.login" @click="logout">
          {{ t('auth.logout') }}
        </ButtonLink>
      </template>
    </GuestLayoutCard>
  </GuestLayoutCentered>
</template>
