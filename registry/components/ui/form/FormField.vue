<template>
  <slot />
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
</script>