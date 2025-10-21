<script setup lang="ts">
import AuthLayout from '@registry/app/layouts/AuthLayout.vue'
import Button from '@registry/components/ui/button/Button.vue'
import LoginFormOfficial from '@registry/modules/auth/components/LoginFormOfficial.vue'
</script>

<template>
  <AuthLayout>
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

    <LoginFormOfficial class="max-w-md w-full space-y-8" />
  </AuthLayout>
</template>
