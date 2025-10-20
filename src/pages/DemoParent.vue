<script setup lang="ts">
import Header from '@/components/pages/demo/Header.vue'
import NavbarTop from '@/components/pages/demo/NavbarTop.vue'

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <Header />

    <!-- Navigation -->
    <NavbarTop />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
