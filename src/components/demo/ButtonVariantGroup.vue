<script setup lang="ts">
import { Button, type ButtonVariants } from '@registry/components/ui/button'

interface Props {
  title: string
  variant?: ButtonVariants['variant']
  vibe?: ButtonVariants['vibe']
  sizes?: ButtonVariants['size'][]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sizes: () => ['default', 'sm', 'lg'],
  disabled: false
})

const getSizeLabel = (size: ButtonVariants['size']) => {
  if (size === 'sm') return 'Small'
  if (size === 'lg') return 'Large'
  return props.title
}
</script>

<template>
  <div class="space-y-3">
    <h4 class="font-medium tracking-tight text-slate-700 dark:text-slate-300">
      {{ title }}
    </h4>
    <div class="flex flex-wrap gap-2">
      <Button
        v-for="size in sizes"
        :key="String(size)"
        :variant="variant"
        :vibe="vibe"
        :size="size ?? undefined"
        :disabled="disabled"
      >
        {{ getSizeLabel(size) }}
      </Button>
    </div>
  </div>
</template>

