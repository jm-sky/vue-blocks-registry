<script setup lang="ts">
interface Props {
  title: string
  description?: string
  id?: string
}

defineProps<Props>()
</script>

<template>
  <section :id="id" class="space-y-4 animate-slide-up">
    <div>
      <h2 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        {{ title }}
      </h2>
      <p v-if="description" class="text-slate-600 dark:text-slate-400">
        {{ description }}
      </p>
    </div>
    <slot />
  </section>
</template>
