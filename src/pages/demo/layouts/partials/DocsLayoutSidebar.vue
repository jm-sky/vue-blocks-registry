<script setup lang="ts">
import { FileText, Home, LayoutDashboard, Link2, MousePointerClick, Table } from 'lucide-vue-next'
import { RoutePaths } from '@/router/route-names'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

const sidebarNav = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Overview', href: RoutePaths.DEMO, icon: Home },
      { title: 'Introduction', href: RoutePaths.DEMO_INTRODUCTION, icon: FileText },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Button', href: RoutePaths.DEMO_COMPONENTS_BUTTON, icon: MousePointerClick },
      { title: 'Links', href: RoutePaths.DEMO_COMPONENTS_LINKS, icon: Link2 },
      { title: 'Layout', href: RoutePaths.DEMO_COMPONENTS_LAYOUT, icon: LayoutDashboard },
      { title: 'Data Table', href: RoutePaths.DEMO_COMPONENTS_DATA_TABLE, icon: Table },
    ],
  },
  {
    title: 'Examples',
    items: [
      { title: 'Dashboard', href: RoutePaths.DEMO_EXAMPLES_DASHBOARD, icon: LayoutDashboard },
      { title: 'Authentication', href: RoutePaths.DEMO_EXAMPLES_AUTH, icon: FileText },
    ],
  },
]
</script>

<template>
  <div class="h-full overflow-auto py-6 pl-2 pr-6 lg:py-8">
    <SidebarMenu v-for="group in sidebarNav" :key="group.title" class="pb-4">
      <SidebarGroup>
        <SidebarGroupLabel class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          {{ group.title }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem v-for="item in group.items" :key="item.title">
            <SidebarMenuButton as-child>
              <RouterLink
                :to="item.href"
                class="group flex w-full items-center rounded-md border border-transparent px-3 py-2 hover:bg-primary/5 hover:shadow-md transition-all duration-300"
                exact-active-class="bg-primary/10 !border-primary/30 shadow-sm"
              >
                <component :is="item.icon" class="mr-2 size-4" />
                {{ item.title }}
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  </div>
</template>
