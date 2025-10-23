<script setup lang="ts">
import ButtonLinkExternal from '@registry/components/ui/button-link/ButtonLinkExternal.vue'
import HoverLink from '@registry/components/ui/hover-link/HoverLinkExternal.vue'
</script>

<template>
  <footer class="border-t py-6 md:py-0">
    <div class="mx-auto max-w-screen-2xl px-4">
      <div class="flex h-16 items-center justify-between text-sm text-muted-foreground">
        <p>
          © 2025 |
          <HoverLink href="https://dev-made.it">
            DEV Made IT
          </HoverLink>
        </p>
        <p>
          <ButtonLinkExternal href="https://github.com/jm-sky/vue-blocks-registry">
            GitHub
          </ButtonLinkExternal>
        </p>
      </div>
    </div>
  </footer>
</template>
