<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@registry/components/ui/button'

const { t } = useI18n()
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      {{ t('demo.examples_page.user_example.title') }}
    </h1>
    <div class="space-x-2">
      <RouterLink to="/profile">
        <Button>{{ t('navigation.profile') }}</Button>
      </RouterLink>
      <RouterLink to="/profile/edit">
        <Button variant="outline">
          {{ t('user.profile.edit_button') }}
        </Button>
      </RouterLink>
    </div>
  </div>
</template>


