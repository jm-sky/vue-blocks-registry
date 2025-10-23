<script setup lang="ts">
// import { Badge } from '@registry/components/ui/badge' // TODO: Add badge component to registry

defineProps<{
  title: string
  count?: number
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <!-- Left section: Title + count -->
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-bold text-foreground">
        {{ title }}
      </h1>
      <!-- <Badge v-if="count !== undefined" variant="secondary">
        {{ count }}
      </Badge> -->
      <span v-if="count !== undefined" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        {{ count }}
      </span>
    </div>

    <!-- Right section: Actions slot -->
    <div v-if="$slots.actions" class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>

  <!-- Optional description -->
  <p v-if="description" class="text-sm text-muted-foreground mb-4">
    {{ description }}
  </p>
</template>
