<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'emerald' | 'blue'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = {
  default: 'text-slate-700 dark:text-slate-300',
  emerald: 'text-emerald-800 dark:text-emerald-200',
  blue: 'text-blue-800 dark:text-blue-200'
}
</script>

<template>
  <div
    data-slot="standout-card-content"
    :class="cn('space-y-4 [&_p]:leading-relaxed', variantClasses[variant], props.class)"
  >
    <slot />
  </div>
</template>
