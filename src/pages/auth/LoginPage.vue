<script setup lang="ts">
import LoginPage from '@registry/modules/auth/pages/LoginPage.vue'
import { mockAuthService } from '@registry/modules/auth/services/mockAuthService'

</script>

<template>
  <LoginPage :auth-service="mockAuthService" default-email="demo@example.com" />
</template>
