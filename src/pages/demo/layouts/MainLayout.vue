<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import DocsLayout from './partials/DocsLayout.vue'
import LandingLayout from './partials/LandingLayout.vue'
import MainLayoutFooter from './partials/MainLayoutFooter.vue'
import MainLayoutHeaderNav from './partials/MainLayoutHeaderNav.vue'

const route = useRoute()
const docsLayoutRef = ref()

// Check if we should show the docs layout (with sidebar)
const showDocsLayout = computed(() => {
  const path = route.path
  return path.includes('/introduction') ||
         path.includes('/components') ||
         path.includes('/examples')
})

const toggleSidebar = () => {
  docsLayoutRef.value?.toggleSidebar()
}
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-background">
    <!-- Background patterns -->
    <div class="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

    <!-- Sticky Header -->
    <MainLayoutHeaderNav
      :show-sidebar-trigger="showDocsLayout"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Main Content -->
    <main class="flex-1">
      <!-- Docs Layout (with sidebar) or Landing Layout -->
      <DocsLayout v-if="showDocsLayout" ref="docsLayoutRef">
        <RouterView />
      </DocsLayout>
      <LandingLayout v-else>
        <RouterView />
      </LandingLayout>
    </main>

    <!-- Footer -->
    <MainLayoutFooter />
  </div>
</template>
