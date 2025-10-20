<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-primary-400">
        404
      </p>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
        Page not found
      </h1>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink v-slot="{ navigate, href }" to="/" custom>
          <Button as="a" :href="href" @click="navigate">
            Go back home
          </Button>
        </RouterLink>
      </div>
    </div>
  </main>
</template>
