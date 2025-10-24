<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LogoIcon from '@/components/brand/LogoIcon.vue'
import LogoText from '@/components/brand/LogoText.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import { RoutePaths } from '@/router/route-names'
import ButtonLinkExternal from '@registry/components/ui/button-link/ButtonLinkExternal.vue'
import HoverLink from '@registry/components/ui/hover-link/HoverLink.vue'
import DarkModeToggle from '@registry/shared/components/DarkModeToggle.vue'
import LocaleToggle from '@registry/shared/i18n/components/LocaleToggle.vue'

const { t } = useI18n()

defineProps<{
  showSidebarTrigger?: boolean
}>()

const emit = defineEmits<{
  toggleSidebar: []
}>()

const links = computed(() => [
  {
    to: RoutePaths.DEMO_INTRODUCTION,
    label: t('navigation.docs')
  },
  {
    to: RoutePaths.DEMO_COMPONENTS,
    label: t('navigation.components')
  },
  {
    to: RoutePaths.DEMO_EXAMPLES,
    label: t('navigation.examples')
  }
])
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="mx-auto flex h-14 max-w-screen-2xl items-center px-4">
      <div class="mr-4 flex items-center gap-2 md:mr-6">
        <RouterLink :to="RoutePaths.DEMO" class="flex items-center gap-2 hover:scale-[102%] hover:brightness-80 transition-all duration-300">
          <LogoIcon class="size-6" />
          <LogoText class="hidden md:inline" />
        </RouterLink>
        <button
          v-if="showSidebarTrigger"
          class="ml-2 md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          @click="emit('toggleSidebar')"
        >
          <Menu class="size-5" />
        </button>
        <nav class="hidden md:flex items-center gap-6 text-sm ml-6">
          <template v-for="link in links" :key="link.to">
            <HoverLink :to="link.to">
              {{ link.label }}
            </HoverLink>
          </template>
        </nav>
      </div>

      <div class="flex flex-1 items-center justify-end space-x-2">
        <nav class="flex items-center space-x-2">
          <ButtonLinkExternal href="https://github.com/jm-sky/vue-blocks-registry" size="icon">
            <GithubIcon class="size-4" />
          </ButtonLinkExternal>
          <LocaleToggle />
          <DarkModeToggle />
        </nav>
      </div>
    </div>
  </header>
</template>
