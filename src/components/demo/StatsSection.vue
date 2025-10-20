<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8">
    <h3 class="text-xl font-semibold text-slate-900 mb-8 text-center">
      {{ title }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="text-center group"
      >
        <div :class="['text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-200', stat.colorClass]">
          {{ stat.value }}
        </div>
        <div class="text-slate-600 font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </div>
</template>

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
