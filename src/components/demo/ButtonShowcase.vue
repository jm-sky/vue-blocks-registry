<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        {{ title }}
      </h2>
      <p class="text-gray-600">
        {{ description }}
      </p>
    </div>

    <!-- Variants Section -->
    <section class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Warianty
        </h3>
        <div class="bg-white rounded-lg shadow-md p-6">
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
    <section class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Wibracje
        </h3>
        <div class="bg-white rounded-lg shadow-md p-6">
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
    <section class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Stany
        </h3>
        <div class="bg-white rounded-lg shadow-md p-6">
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
    <section class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          Przykład użycia
        </h3>
        <div class="bg-gray-900 rounded-lg p-6">
          <pre class="text-green-400 text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
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
