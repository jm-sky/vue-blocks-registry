<template>
  <FormItem>
    <FormLabel v-if="label">{{ label }}</FormLabel>
    <FormControl>
      <slot />
    </FormControl>
    <FormMessage />
  </FormItem>
</template>

<script setup lang="ts">
import FormItem from './FormItem.vue'
import FormLabel from './FormLabel.vue'
import FormControl from './FormControl.vue'
import FormMessage from './FormMessage.vue'

interface Props {
  label?: string
}

defineProps<Props>()
</script>