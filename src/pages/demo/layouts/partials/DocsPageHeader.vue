<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="space-y-2 animate-fade-in">
    <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
      {{ title }}
    </h1>
    <p class="text-lg text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
