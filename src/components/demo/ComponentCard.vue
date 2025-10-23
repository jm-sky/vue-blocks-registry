<script setup lang="ts">
interface Props {
  title: string
  description: string
  to: string
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group block rounded-lg border border-border bg-card p-6 hover:shadow-md transition-all hover:-translate-y-0.5 duration-300"
  >
    <h3 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
      {{ title }}
    </h3>
    <p class="mt-1 text-sm text-muted-foreground">
      {{ description }}
    </p>
  </RouterLink>
</template>
