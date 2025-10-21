<script setup lang="ts">
interface Stat {
  value: string | number
  label: string
  colorClass: string
}

interface Props {
  title: string
  stats: Stat[]
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-8 hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-slate-900/40 transition-all duration-300 hover:scale-[1.01]">
    <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-8 text-center">
      {{ title }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="text-center group"
      >
        <div :class="['text-4xl font-bold mb-2 group-hover:scale-110 group-hover:drop-shadow-sm transition-all duration-300', stat.colorClass]">
          {{ stat.value }}
        </div>
        <div class="text-slate-600 dark:text-slate-300 font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </div>
</template>
