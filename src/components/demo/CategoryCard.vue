<script setup lang="ts">
import HoverCard from '@registry/components/ui/hover-card/HoverCard.vue'
import type { Component } from 'vue'

interface Props {
  title: string
  description: string
  linkTo: string
  iconComponent: Component
  iconClass: string
  iconBgClass: string
}

defineProps<Props>()
</script>

<template>
  <HoverCard
    :title="title"
    :description="description"
    :link-to="linkTo"
    :icon-component="(iconComponent as Component)"
    :icon-class="iconClass"
    :icon-bg-class="iconBgClass"
    link-label="Zobacz komponenty"
  />
</template>
