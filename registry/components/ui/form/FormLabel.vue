<script lang="ts" setup>
import { Label } from '@registry/components/ui/label'
import { cn } from '@registry/lib/utils'
import { useFormField } from './useFormField'
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<LabelProps & {
  class?: HTMLAttributes['class']
  label?: string
  required?: boolean
}>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="cn(
      'data-[error=true]:text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <slot>
      {{ label }}
    </slot>
    <span v-if="required" class="text-destructive">*</span>
  </Label>
</template>
