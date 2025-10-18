<template>
  <p
    :class="cn(
      'text-sm text-muted-foreground',
      props.class
    )"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
import { cn } from '@registry/lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})
</script>