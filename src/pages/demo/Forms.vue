<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Form Components
      </h2>
      <p class="text-gray-600">
        Komponenty formularzy i pól input (wkrótce)
      </p>
    </div>

    <!-- Coming Soon -->
    <ComingSoon
      title="Komponenty formularzy"
      description="Ta sekcja będzie zawierać komponenty formularzy, pól input, selectów i innych elementów formularzy."
      :icon-component="FormIcon"
      icon-class="size-8 text-blue-600"
      icon-bg-class="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
    />
  </div>
</template>

<script setup lang="ts">
import ComingSoon from '@/components/demo/ComingSoon.vue'
import FormIcon from '@/components/demo/icons/FormIcon.vue'
</script>
