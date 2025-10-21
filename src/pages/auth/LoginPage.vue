<script setup lang="ts">
import Button from '@registry/components/ui/button/Button.vue'
import LoginPage from '@registry/modules/auth/pages/LoginPage.vue'
</script>

<template>
  <LoginPage>
    <template #actions>
      <RouterLink
        v-slot="{ navigate, href }"
        to="/demo"
        custom
      >
        <Button
          as="a"
          variant="ghost"
          :href
          @click="navigate"
        >
          Demo
        </Button>
      </RouterLink>
    </template>
  </LoginPage>
</template>
