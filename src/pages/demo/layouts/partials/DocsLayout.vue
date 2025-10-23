<script setup lang="ts">
import { ref } from 'vue'
import DocsLayoutSidebar from './DocsLayoutSidebar.vue'

const sidebarRef = ref()

const toggleSidebar = () => {
  sidebarRef.value?.toggleMobileMenu()
}

defineExpose({
  toggleSidebar
})
</script>

<template>
  <div class="mx-auto max-w-screen-2xl px-4">
    <div class="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <!-- Sidebar -->
      <DocsLayoutSidebar ref="sidebarRef" />

      <!-- Main Content -->
      <main class="relative py-6 lg:gap-10 lg:py-8">
        <div class="mx-auto w-full min-w-0">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
