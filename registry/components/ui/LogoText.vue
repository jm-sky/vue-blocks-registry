<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-violet-500', props.class)">
    My SaaS App
  </span>
</template>
