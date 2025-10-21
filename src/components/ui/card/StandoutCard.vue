<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'emerald' | 'blue'
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  animate: true
})

const variantClasses = {
  default: 'bg-white/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60',
  emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/60',
  blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/60'
}
</script>

<template>
  <div
    data-slot="standout-card"
    :class="
      cn(
        'backdrop-blur-sm rounded-2xl border shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]',
        variantClasses[variant],
        animate && 'animate-slide-up',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
