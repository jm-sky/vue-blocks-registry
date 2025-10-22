<script setup lang="ts">
import LinkWithArrow from './LinkWithArrow.vue'
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
  <div class="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-8 hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:border-slate-300/80 dark:hover:border-slate-600/80 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
    <div class="flex items-start mb-6">
      <div
        :class="[
          'size-14 rounded-2xl flex items-center justify-center mr-5',
          iconBgClass
        ]"
      >
        <component
          :is="iconComponent"
          :class="iconClass"
        />
      </div>
      <div class="flex-1">
        <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
          {{ title }}
        </h3>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
    <LinkWithArrow :link-to="linkTo" label="Zobacz komponenty" />
  </div>
</template>
