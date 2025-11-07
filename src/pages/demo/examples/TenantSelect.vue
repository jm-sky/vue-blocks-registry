<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { useI18n } from 'vue-i18n'
import InstallationCode from '@/components/demo/InstallationCode.vue'
import TenantGridDemo from '@/components/tenant/TenantGridDemo.vue'
import DemoBadge from '@/components/ui/badge/DemoBadge.vue'
import StatusBadge from '@/components/ui/badge/StatusBadge.vue'
import DocsPageHeader from '../layouts/partials/DocsPageHeader.vue'

const { t } = useI18n()

const installCodeFull = 'npx vue-blocks-registry add tenantFeat'

// Capture errors to prevent page crash
onErrorCaptured((err, instance, info) => {
  console.error('TenantSelect error:', err, info)
  return false // Prevent error from propagating
})
</script>

<template>
  <div class="space-y-8">
    <DocsPageHeader
      :title="t('demo.tenant_example.title', 'Multi-Tenancy')"
      :description="t('demo.tenant_example.description', 'Complete multi-tenancy feature with tenant selection and switching')"
    />

    <div class="flex flex-wrap gap-2">
      <DemoBadge variant="info">
        {{ t('demo.badges.feature', 'Feature') }}
      </DemoBadge>
      <StatusBadge status="beta">
        {{ t('demo.badges.beta', 'Beta') }}
      </StatusBadge>
    </div>

    <InstallationCode :code="installCodeFull" />

    <div class="rounded-lg border border-border bg-card p-6">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <h2 class="text-2xl font-bold text-foreground">
            Select Tenant
          </h2>
          <p class="text-muted-foreground">
            Choose a tenant to continue
          </p>
        </div>

        <div class="min-h-[400px]">
          <TenantGridDemo />
        </div>
      </div>
    </div>
  </div>
</template>
