<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="animate-fade-in">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        Layout Components
      </h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
        Komponenty układu i kontenerów (wkrótce)
      </p>
    </div>

    <!-- Coming Soon -->
    <div class="animate-slide-up">
      <ComingSoon
        title="Komponenty układu"
        description="Ta sekcja będzie zawierać komponenty układu, kontenerów, gridów i innych elementów strukturalnych."
        :icon-component="LayoutIcon"
        icon-class="size-8 text-purple-600 dark:text-purple-400"
        icon-bg-class="size-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComingSoon from '@/components/demo/ComingSoon.vue'
import LayoutIcon from '@/components/demo/icons/LayoutIcon.vue'
</script>
