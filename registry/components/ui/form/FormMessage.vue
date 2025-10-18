<script setup lang="ts">
import { cn } from '@registry/lib/utils'
import { useFieldError } from 'vee-validate'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const { errorMessage } = useFieldError()
</script>

<template>
  <p
    v-if="errorMessage"
    :class="cn(
      'text-sm font-medium text-destructive',
      props.class
    )"
  >
    {{ errorMessage }}
  </p>
</template>