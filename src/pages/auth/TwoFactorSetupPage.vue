<script setup lang="ts">
import PageCard from '@registry/components/layout/PageCard.vue'
import AuthenticatedLayout from '@registry/layouts/AuthenticatedLayout.vue'
import TwoFactorSetupPage from '@registry/modules/auth/pages/TwoFactorSetupPage.vue'
import { mockTwoFactorService } from '@registry/modules/auth/services/mockTwoFactorService'
</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <TwoFactorSetupPage :service="mockTwoFactorService" />
    </PageCard>
  </AuthenticatedLayout>
</template>
