<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
</script>

<template>
  <Card class="fixed right-0 top-1/2 -translate-y-1/2 z-20 min-w-48 bg-card/80 backdrop-blur-sm rounded-r-none">
    <CardHeader>
      <CardTitle>
        Warianty
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="space-y-2 text-sm -mx-2">
        <li>
          <RouterLink to="/auth/login" class="block p-2 rounded-md text-muted-foreground hover:bg-accent" exact-active-class="bg-accent">
            Login Standard
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/auth/login/official" class="block p-2 rounded-md text-muted-foreground hover:bg-accent" exact-active-class="bg-accent">
            Login Official
          </RouterLink>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
