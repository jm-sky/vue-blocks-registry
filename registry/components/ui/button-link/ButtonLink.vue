<script setup lang="ts">
import { Button, type ButtonProps } from '@registry/components/ui/button'
import { cn } from '@registry/lib/utils'
import { type RouteLocationRaw, RouterLink } from 'vue-router'

interface Props extends Omit<ButtonProps, 'as'> {
  to: RouteLocationRaw
  replace?: boolean
  activeClass?: string
  exactActiveClass?: string
  custom?: boolean
  ariaCurrentValue?: 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  replace: false,
  custom: false,
  loading: false,
  disabled: false
})

// Merge RouterLink props with Button props
const linkProps = {
  to: props.to,
  replace: props.replace,
  activeClass: props.activeClass,
  exactActiveClass: props.exactActiveClass,
  custom: props.custom,
  ariaCurrentValue: props.ariaCurrentValue
}

const buttonProps: Omit<ButtonProps, 'as'> = {
  variant: props.variant,
  size: props.size,
  vibe: props.vibe,
  loading: props.loading,
  disabled: props.disabled,
  class: cn(props.class)
}
</script>

<template>
  <RouterLink
    v-bind="linkProps"
    class="inline-block"
  >
    <Button
      v-bind="buttonProps"
      as="span"
    >
      <slot />
    </Button>
  </RouterLink>
</template>