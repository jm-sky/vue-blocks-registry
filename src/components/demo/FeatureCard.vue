<script setup lang="ts">
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import type { Component } from 'vue'

interface Props {
  title: string
  items: string[]
  iconComponent?: Component
  iconClass?: string
  iconBgClass?: string
}

defineProps<Props>()
</script>

<template>
  <HoverCard
    :title="title"
    :items="items"
    title-class="text-base font-semibold tracking-tight"
    :icon-component="(iconComponent as Component)"
    :icon-class="iconClass"
    :icon-bg-class="iconBgClass"
  />
</template>

