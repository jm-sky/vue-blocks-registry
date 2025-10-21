<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  status?: 'mock-api' | 'production' | 'beta'
}

const props = withDefaults(defineProps<Props>(), {
  status: 'mock-api'
})

const statusConfig = {
  'mock-api': {
    text: 'Mock API',
    classes: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  },
  'production': {
    text: 'Production',
    classes: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  'beta': {
    text: 'Beta',
    classes: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
  }
}

const config = statusConfig[props.status]
</script>

<template>
  <div
    :class="
      cn(
        'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md',
        config.classes,
        props.class
      )
    "
  >
    <svg
      class="size-3"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        :d="config.icon"
        clip-rule="evenodd"
      />
    </svg>
    {{ config.text }}
  </div>
</template>
