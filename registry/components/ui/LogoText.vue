<script setup lang="ts">
import { cn } from '@registry/lib/utils'
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  as?: PrimitiveProps['as']
  class?: HTMLAttributes['class']
}>(), {
  as: 'span',
})
</script>

<template>
  <component :is="props.as" :class="cn('text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-violet-500', props.class)">
    My SaaS App
  </component>
</template>
