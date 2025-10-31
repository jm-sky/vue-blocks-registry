<script setup lang="ts">
import PageCard from '@registry/components/layout/PageCard.vue'
import AuthenticatedLayout from '@registry/layouts/AuthenticatedLayout.vue'
import ProfileViewPage from '@registry/modules/user/pages/ProfileViewPage.vue'
import { mockUserService } from '@registry/modules/user/services/mockUserService'

</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <ProfileViewPage :service="mockUserService" />
    </PageCard>
  </AuthenticatedLayout>
</template>


