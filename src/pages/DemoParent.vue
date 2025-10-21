<script setup lang="ts">
import Header from '@/components/pages/demo/Header.vue'
import NavbarTop from '@/components/pages/demo/NavbarTop.vue'

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
      <footer class="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-700/60 shadow-sm">
        <div class="container mx-auto px-6 py-8 max-w-7xl">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-slate-600 dark:text-slate-300 text-sm">
              © 2024 Vue Blocks Registry. Wszystkie prawa zastrzeżone.
            </div>
            <div class="flex gap-6 text-sm">
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Dokumentacja
              </a>
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                Licencja
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
