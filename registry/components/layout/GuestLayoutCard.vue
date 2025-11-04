<script setup lang="ts">
import { cn } from '@registry/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  withHeader?: boolean
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('max-w-md w-full space-y-8', props.class)">
    <div class="space-y-4 bg-card/80 py-8 px-6 shadow-lg rounded-lg">
      <slot v-if="withHeader" name="header">
        <h2 v-if="title" class="text-center text-2xl font-bold text-card-foreground">
          {{ title }}
        </h2>
        <slot name="header-description">
          <p v-if="description" class="mt-2 text-center text-sm text-muted-foreground">
            {{ description }}
          </p>
        </slot>
      </slot>
      <slot />
    </div>

    <div v-if="$slots.footer" class="text-center">
      <slot name="footer" />
    </div>

    <slot name="after" />
  </div>
</template>
