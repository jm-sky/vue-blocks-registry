<script setup lang="ts">
import { Button, type ButtonProps } from '@registry/components/ui/button'
import type { HTMLAttributes } from 'vue'

interface Props extends Omit<ButtonProps, 'as'> {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  download?: string | boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'default',
  target: '_blank',
  rel: 'noopener noreferrer',
  loading: false,
  disabled: false
})

// Automatically add noopener noreferrer for _blank targets
const computedRel = props.target === '_blank' && !props.rel
  ? 'noopener noreferrer'
  : props.rel
</script>

<template>
  <Button
    as="a"
    v-bind="props"
    :rel="computedRel"
    class="inline-flex items-center justify-center"
  >
    <slot />
  </Button>
</template>

