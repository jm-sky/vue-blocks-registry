<template>
  <form v-bind="$attrs" @submit="onSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'

interface Props {
  onSubmit?: (values: any) => void | Promise<void>
}

const props = defineProps<Props>()

const { handleSubmit } = useForm()

const onSubmit = handleSubmit((values) => {
  props.onSubmit?.(values)
})
</script>