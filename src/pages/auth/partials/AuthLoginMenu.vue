<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'

const { t } = useI18n()
</script>

<template>
  <Card class="fixed right-0 top-1/2 -translate-y-1/2 z-20 min-w-48 bg-card/80 backdrop-blur-sm rounded-r-none">
    <CardHeader>
      <CardTitle>
        {{ t('auth.menu.variants') }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="space-y-2 text-sm -mx-2">
        <li>
          <RouterLink to="/auth/login" class="block px-4 py-2 rounded-md text-muted-foreground hover:bg-accent" exact-active-class="bg-accent">
            {{ t('auth.menu.login_standard') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/auth/login/official" class="block px-4 py-2 rounded-md text-muted-foreground hover:bg-accent" exact-active-class="bg-accent">
            {{ t('auth.menu.login_official') }}
          </RouterLink>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
