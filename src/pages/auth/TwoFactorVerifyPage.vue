<script setup lang="ts">
import TwoFactorVerifyPage from '@registry/modules/auth/pages/TwoFactorVerifyPage.vue'
import { mockTwoFactorService } from '@registry/modules/auth/services/mockTwoFactorService'
</script>

<template>
  <TwoFactorVerifyPage :service="mockTwoFactorService" />
</template>
