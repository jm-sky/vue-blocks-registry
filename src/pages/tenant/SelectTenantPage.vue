<script setup lang="ts">
import SelectTenantPage from '@registry/features/tenantFeat/pages/SelectTenantPage.vue'
import { mockTenantService } from '@registry/features/tenantFeat/services/mockTenantService'
</script>

<template>
  <SelectTenantPage :tenant-service="mockTenantService" />
</template>
