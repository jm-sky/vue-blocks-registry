<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-center mb-4">
      <div
        :class="[
          'w-12 h-12 rounded-lg flex items-center justify-center mr-4',
          iconBgClass
        ]"
      >
        <component
          :is="iconComponent"
          :class="iconClass"
        />
      </div>
      <h3 class="text-xl font-semibold text-gray-900">
        {{ title }}
      </h3>
    </div>
    <p class="text-gray-600 mb-4">
      {{ description }}
    </p>
    <RouterLink
      :to="linkTo"
      class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
    >
      Zobacz komponenty
      <svg
        class="size-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </RouterLink>
  </div>
</template>
