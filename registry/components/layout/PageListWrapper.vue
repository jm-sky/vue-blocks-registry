<script setup lang="ts">
import PageCard from './PageCard.vue'
import PageListHeader from './PageListHeader.vue'

defineProps<{
  title: string
  count?: number
  description?: string
}>()
</script>

<template>
  <PageCard>
    <PageListHeader
      :title="title"
      :count="count"
      :description="description"
    >
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </PageListHeader>

    <!-- Content slot -->
    <slot />
  </PageCard>
</template>
