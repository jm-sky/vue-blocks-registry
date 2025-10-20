<script setup lang="ts">
import Header from '@/components/pages/demo/Header.vue'
import NavbarTop from '@/components/pages/demo/NavbarTop.vue'

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
    <!-- Header -->
    <Header />

    <!-- Navigation -->
    <NavbarTop />

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-12 max-w-7xl">
      <RouterView />
    </main>
  </div>
</template>
