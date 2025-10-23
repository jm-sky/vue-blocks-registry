<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  download?: string | boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  target: '_blank',
  rel: 'noopener noreferrer',
})

// Automatically add noopener noreferrer for _blank targets
const computedRel = props.target === '_blank' && !props.rel
  ? 'noopener noreferrer'
  : props.rel
</script>

<template>
  <a v-bind="props" :rel="computedRel">
    <slot />
  </a>
</template>

