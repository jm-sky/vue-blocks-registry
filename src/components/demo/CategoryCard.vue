<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Component } from 'vue'

interface Props {
  title: string
  description: string
  linkTo: string
  iconComponent: Component
  iconClass: string
  iconBgClass: string
}

defineProps<Props>()
</script>

<template>
  <div class="group bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300/60 transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-start mb-6">
      <div
        :class="[
          'w-14 h-14 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300',
          iconBgClass
        ]"
      >
        <component
          :is="iconComponent"
          :class="iconClass"
        />
      </div>
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
          {{ title }}
        </h3>
        <p class="text-slate-600 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
    <RouterLink
      :to="linkTo"
      class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:gap-3 transition-all duration-200"
    >
      Zobacz komponenty
      <svg
        class="size-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </RouterLink>
  </div>
</template>
