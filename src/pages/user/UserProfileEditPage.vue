<script setup lang="ts">
import PageCard from '@registry/components/layout/PageCard.vue'
import AuthenticatedLayout from '@registry/layouts/AuthenticatedLayout.vue'
import ProfileEditPage from '@registry/modules/user/pages/ProfileEditPage.vue'
import { mockUserService } from '@registry/modules/user/services/mockUserService'
</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <ProfileEditPage :service="mockUserService" />
    </PageCard>
  </AuthenticatedLayout>
</template>


