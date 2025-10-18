<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@registry/lib/utils'
import { type ButtonVariants, buttonVariants } from '.'
import type { HTMLAttributes } from 'vue'
import { Loader2 } from 'lucide-vue-next'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  vibe?: ButtonVariants['vibe']
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :disabled="loading || disabled"
    :class="cn(buttonVariants({ variant, size, vibe }), props.class)"
  >
    <Loader2 v-if="loading" class="mr-1 size-4 animate-spin" />
    <slot />
  </Primitive>
</template>
