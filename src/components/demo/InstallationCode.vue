<script setup lang="ts">
import ToClipboard from '@registry/components/ui/ToClipboard.vue'

defineProps<{
  code: string
}>()
</script>

<template>
  <div class="group relative bg-slate-900 dark:bg-slate-950 rounded-lg border border-slate-700/60 p-4">
    <pre class="text-emerald-400 dark:text-emerald-300 text-sm font-mono"><slot>{{ code }}</slot></pre>
    <ToClipboard
      :text="code"
      class="absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-all duration-300"
      copied-class="!opacity-100 !text-emerald-400 dark:!text-emerald-300"
    />
  </div>
</template>
