<template>
  <div class="space-y-8">
    <!-- Page Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        Layout Components
      </h2>
      <p class="text-gray-600">
        Komponenty układu i kontenerów (wkrótce)
      </p>
    </div>

    <!-- Coming Soon -->
    <ComingSoon
      title="Komponenty układu"
      description="Ta sekcja będzie zawierać komponenty układu, kontenerów, gridów i innych elementów strukturalnych."
      :icon-component="LayoutIcon"
      icon-class="size-8 text-purple-600"
      icon-bg-class="size-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
    />
  </div>
</template>

<script setup lang="ts">
import ComingSoon from '@/components/demo/ComingSoon.vue'
import LayoutIcon from '@/components/demo/icons/LayoutIcon.vue'
</script>
