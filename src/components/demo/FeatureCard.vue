<script setup lang="ts">
import CardHoverGradient from './CardHoverGradient.vue'
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
  <div class="group relative isolate overflow-hidden rounded-lg border bg-card p-5 hover:shadow-lg hover:border-border transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]">
    <!-- Subtle hover gradient -->
    <CardHoverGradient />

    <div class="relative flex items-center gap-3 mb-3">
      <div v-if="iconComponent" :class="['size-10 rounded-lg flex items-center justify-center shadow-sm', iconBgClass]">
        <component :is="iconComponent" :class="iconClass" />
      </div>
      <h3 class="text-base font-semibold tracking-tight">
        {{ title }}
      </h3>
    </div>
    <ul class="relative space-y-1.5 text-sm text-muted-foreground">
      <li v-for="(item, index) in items" :key="index" class="flex items-start">
        <span class="mr-2">•</span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

