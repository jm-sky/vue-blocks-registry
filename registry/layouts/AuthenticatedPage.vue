<script setup lang="ts">
import PageCard from '@registry/components/layout/PageCard.vue'
import AuthenticatedLayout from '@registry/layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <PageCard>
      <slot />
    </PageCard>
  </AuthenticatedLayout>
</template>

