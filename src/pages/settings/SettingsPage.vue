<script setup lang="ts">
import PageCard from '@registry/components/layout/PageCard.vue'
import AuthenticatedLayout from '@registry/layouts/AuthenticatedLayout.vue'
import SettingsPage from '@registry/modules/settings/pages/SettingsPage.vue'
import { mockSettingsService } from '@registry/modules/settings/services/mockSettingsService'
</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <SettingsPage :service="mockSettingsService" />
    </PageCard>
  </AuthenticatedLayout>
</template>


