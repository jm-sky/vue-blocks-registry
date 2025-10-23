<script setup lang="ts">
import type { Component } from 'vue'

export interface NavLink {
  to: string
  label: string
  icon?: Component
}

defineProps<{
  links: NavLink[]
}>()
</script>

<template>
  <nav class="flex items-center space-x-6">
    <RouterLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary border-b-2 border-transparent hover:border-primary py-2"
      active-class="text-primary border-primary"
    >
      <component :is="link.icon" v-if="link.icon" class="size-4" />
      {{ link.label }}
    </RouterLink>
  </nav>
</template>
