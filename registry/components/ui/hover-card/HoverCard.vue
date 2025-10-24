<script setup lang="ts">
import { cn } from '@registry/lib/utils'
import { type Component, computed } from 'vue'
import HoverCardGradientOverlay from './HoverCardGradientOverlay.vue'
import HoverCardLinkWithArrow from './HoverCardLinkWithArrow.vue'

const { variant = 'default', class: className, contentClass } = defineProps<{
  title?: string
  description?: string
  class?: string
  items?: string[]
  iconComponent?: Component
  iconClass?: string
  iconBgClass?: string
  contentClass?: string
  titleClass?: string
  linkTo?: string
  linkLabel?: string
  dense?: boolean
  variant?: 'default' | 'emerald' | 'blue'
  animate?: boolean
  noHover?: boolean
}>()

const variantClasses = {
  default: 'bg-white/90 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:border-slate-300/80 dark:hover:border-slate-600/80 hover:bg-white/90 dark:hover:bg-slate-800/90',
  emerald: 'bg-emerald-50/90 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/60 hover:shadow-emerald-200/60 dark:hover:shadow-emerald-900/60 hover:border-emerald-300/80 dark:hover:border-emerald-600/80',
  blue: 'bg-blue-50/90 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/60 hover:shadow-blue-200/60 dark:hover:shadow-blue-900/60 hover:border-blue-300/80 dark:hover:border-blue-600/80',
}

const variantContentClasses = {
  default: 'text-slate-800 dark:text-slate-200',
  emerald: 'text-emerald-800 dark:text-emerald-200',
  blue: 'text-blue-800 dark:text-blue-200',
}

const hoverClass = 'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl'

const contentClassComputed = computed<string>(() => {
  return cn(variantContentClasses[variant], contentClass)
})
</script>

<template>
  <div
    class="group flex flex-col relative isolate transition-all duration-500"
    :class="cn(
      'bg-card rounded-xl border border-border',
      !noHover && hoverClass,
      dense ? 'p-6' : 'p-8',
      variantClasses[variant],
      animate && 'animate-slide-up',
      className,
    )"
  >
    <HoverCardGradientOverlay />

    <div class="flex flex-col gap-4 flex-1 items-start">
      <div v-if="title || iconComponent" class="flex items-center gap-5">
        <div v-if="iconComponent" :class="cn('p-3 rounded-2xl flex items-center justify-center aspect-square', iconBgClass)">
          <component :is="iconComponent" :class="iconClass" />
        </div>
        <h3 v-if="title" :class="cn('text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100', titleClass)">
          {{ title }}
        </h3>
      </div>

      <div :class="cn('flex flex-col gap-4 flex-1 w-full text-sm', contentClassComputed)">
        <p v-if="description" class="leading-relaxed">
          {{ description }}
        </p>

        <div v-if="$slots.default" class="space-y-4">
          <slot />
        </div>

        <ul v-if="items" class="relative space-y-1.5">
          <li v-for="(item, index) in items" :key="index" class="flex items-start">
            <span class="mr-2">•</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <HoverCardLinkWithArrow
      v-if="linkTo && linkLabel"
      :link-to="linkTo"
      :label="linkLabel"
      class="mt-4"
    />
  </div>
</template>
