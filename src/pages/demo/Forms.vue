<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div class="animate-fade-in">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        Form Components
      </h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
        Komponenty formularzy i pól input (wkrótce)
      </p>
    </div>

    <!-- Coming Soon -->
    <div class="animate-slide-up">
      <ComingSoon
        title="Komponenty formularzy"
        description="Ta sekcja będzie zawierać komponenty formularzy, pól input, selectów i innych elementów formularzy."
        :icon-component="FormIcon"
        icon-class="size-8 text-blue-600 dark:text-blue-400"
        icon-bg-class="size-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComingSoon from '@/components/demo/ComingSoon.vue'
import FormIcon from '@/components/demo/icons/FormIcon.vue'
</script>
