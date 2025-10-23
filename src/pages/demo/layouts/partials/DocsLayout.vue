<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DocsLayoutSidebar from './DocsLayoutSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <div class="mx-auto max-w-screen-2xl">
      <div class="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <!-- Sidebar -->
        <Sidebar>
          <SidebarContent>
            <DocsLayoutSidebar />
          </SidebarContent>
        </Sidebar>

        <!-- Main Content -->
        <SidebarInset>
          <main class="relative py-6 lg:gap-10 lg:py-8">
            <div class="mx-auto w-full min-w-0 px-4 md:px-0">
              <slot />
            </div>
          </main>
        </SidebarInset>
      </div>
    </div>
  </SidebarProvider>
</template>
