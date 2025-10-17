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
  <div class="bg-white rounded-lg shadow-md p-12 text-center">
    <div
      :class="[
        'size-16 rounded-full flex items-center justify-center mx-auto mb-4',
        iconBgClass
      ]"
    >
      <component
        :is="iconComponent"
        :class="iconClass"
      />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-600">
      {{ description }}
    </p>
  </div>
</template>
