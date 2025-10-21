<script lang="ts" setup>
import AuthLoginMenu from './auth/partials/AuthLoginMenu.vue'
</script>

<template>
  <div class="relative">
    <RouterView />

    <AuthLoginMenu />
  </div>
</template>
