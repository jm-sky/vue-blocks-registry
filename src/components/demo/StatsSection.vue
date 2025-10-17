<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">
      {{ title }}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="text-center"
      >
        <div :class="['text-2xl font-bold', stat.colorClass]">
          {{ stat.value }}
        </div>
        <div class="text-sm text-gray-600">
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
