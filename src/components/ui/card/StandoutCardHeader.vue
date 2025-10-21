<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'emerald' | 'blue'
  icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  icon: false
})

const variantClasses = {
  default: 'text-slate-900 dark:text-slate-100',
  emerald: 'text-emerald-900 dark:text-emerald-100',
  blue: 'text-blue-900 dark:text-blue-100'
}
</script>

<template>
  <div
    data-slot="standout-card-header"
    :class="cn('mb-6', props.class)"
  >
    <h3
      :class="
        cn(
          'text-xl font-semibold tracking-tight flex items-center gap-2',
          variantClasses[variant]
        )
      "
    >
      <slot name="icon" />
      <slot />
    </h3>
    <slot name="description" />
  </div>
</template>
