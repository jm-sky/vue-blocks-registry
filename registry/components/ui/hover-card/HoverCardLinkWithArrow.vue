<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  linkTo: string
  label: string
}>()
</script>

<template>
  <RouterLink
    :to="linkTo"
    class="group inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-all duration-200"
  >
    {{ label }}
    <svg
      aria-hidden="true"
      class="block size-4 ml-2 translate-x-0 group-hover:translate-x-2 transition-transform duration-500 ease-in-out"
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
</template>
