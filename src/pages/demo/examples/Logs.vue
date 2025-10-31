<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from '@registry/components/ui/button'

const { t } = useI18n()
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      {{ t('demo.examples_page.logs_example.title') }}
    </h1>
    <p class="text-muted-foreground">
      {{ t('demo.examples_page.logs_example.description') }}
    </p>
    <RouterLink to="/logs">
      <Button>{{ t('demo.examples_page.logs_example.title') }}</Button>
    </RouterLink>
  </div>
</template>


