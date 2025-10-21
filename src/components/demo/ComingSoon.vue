<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  description: string
  iconComponent: Component
  iconClass: string
  iconBgClass: string
}>()
</script>

<template>
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-12 text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
    <div
      :class="[
        'size-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300',
        iconBgClass
      ]"
    >
      <component
        :is="iconComponent"
        :class="iconClass"
      />
    </div>
    <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
      {{ title }}
    </h3>
    <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
