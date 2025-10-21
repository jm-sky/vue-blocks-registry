<script setup lang="ts">
import ButtonVariantGroup from './ButtonVariantGroup.vue'
import type { ButtonVariants } from '@registry/components/ui/button'

interface Props {
  title: string
  description: string
}

defineProps<Props>()

const variants: { name: string; value: ButtonVariants['variant'] }[] = [
  { name: 'Primary', value: 'primary' },
  { name: 'Outline', value: 'outline' },
  { name: 'Destructive', value: 'destructive' },
  { name: 'Secondary', value: 'secondary' },
  { name: 'Ghost', value: 'ghost' },
  { name: 'Link', value: 'link' }
]

const vibes: { name: string; value: ButtonVariants['vibe'] }[] = [
  { name: 'Primary Vibe', value: 'primary' },
  { name: 'Outline Vibe', value: 'outline' },
  { name: 'Underline Vibe', value: 'underline' }
]
</script>

<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="animate-fade-in">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        {{ title }}
      </h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Variants Section -->
    <section class="space-y-6 animate-slide-up">
      <div>
        <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          Warianty
        </h3>
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ButtonVariantGroup
              v-for="variant in variants"
              :key="variant.name"
              :title="variant.name"
              :variant="variant.value"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Vibes Section -->
    <section class="space-y-6 animate-slide-up">
      <div>
        <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          Wibracje
        </h3>
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ButtonVariantGroup
              v-for="vibe in vibes"
              :key="vibe.name"
              :title="vibe.name"
              :vibe="vibe.value"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- States Section -->
    <section class="space-y-6 animate-slide-up">
      <div>
        <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          Stany
        </h3>
        <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ButtonVariantGroup
              title="Normalne"
              variant="primary"
              :sizes="['default']"
            />
            <ButtonVariantGroup
              title="Disabled"
              variant="primary"
              :sizes="['default']"
              :disabled="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="space-y-6 animate-scale-in">
      <div>
        <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
          Przykład użycia
        </h3>
        <div class="bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-700/60 p-6 shadow-lg">
          <pre class="text-emerald-400 dark:text-emerald-300 text-sm overflow-x-auto font-mono"><code>&lt;script setup lang="ts"&gt;
import { Button } from '@registry/components/ui/button'
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="space-x-2"&gt;
    &lt;Button variant="primary"&gt;Primary&lt;/Button&gt;
    &lt;Button variant="outline"&gt;Outline&lt;/Button&gt;
    &lt;Button variant="destructive"&gt;Destructive&lt;/Button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>
