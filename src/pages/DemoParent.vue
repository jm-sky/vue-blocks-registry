<script setup lang="ts">
import DemoFooter from '@/components/pages/demo/DemoFooter.vue'
import Header from '@/components/pages/demo/Header.vue'
import NavbarTop from '@/components/pages/demo/NavbarTop.vue'
import ScrollToTop from '@registry/components/ui/scroll-to-top/ScrollToTop.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden flex flex-col">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 dark:from-blue-900/20 via-transparent to-transparent" />
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-100/30 dark:from-slate-800/30 via-transparent to-transparent" />
    <!-- Content layer -->
    <div class="relative z-10 flex flex-col flex-1">
      <!-- Header -->
      <Header />

      <!-- Navigation -->
      <NavbarTop />

      <!-- Main Content -->
      <main class="container mx-auto px-6 py-12 max-w-7xl flex-1">
        <RouterView />
      </main>

      <!-- Footer -->
      <DemoFooter />
    </div>

    <!-- Scroll to Top Button -->
    <ScrollToTop />
  </div>
</template>
