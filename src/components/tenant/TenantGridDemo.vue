<script setup lang="ts">
import { isAxiosError } from 'axios'
import { onMounted } from 'vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { Input } from '@registry/components/ui/input'
import TenantCard from '@registry/features/tenantFeat/components/TenantCard.vue'
import { useTenant } from '@registry/features/tenantFeat/composables/useTenant'
import { useTenantList } from '@registry/features/tenantFeat/composables/useTenantList'
import { useTenantSwitch } from '@registry/features/tenantFeat/composables/useTenantSwitch'
import { TenantRoutePaths } from '@registry/features/tenantFeat/config/routes'
import { mockTenantService } from '@registry/features/tenantFeat/services/mockTenantService'
import { useTenantStore } from '@registry/features/tenantFeat/store/useTenantStore'
import type { Tenant } from '@registry/features/tenantFeat/types/tenant.types'

const router = useRouter()
const tenantStore = useTenantStore()
const { tenants, isLoading } = useTenantList(mockTenantService)
const { switchTenant: switchTenantMutation, isSwitching } = useTenantSwitch()
const { tenantId } = useTenant(mockTenantService)

const searchQuery = ref('')

const filteredTenants = computed<Tenant[]>(() => {
  if (!searchQuery.value.trim()) {
    return tenants.value ?? []
  }

  const query = searchQuery.value.toLowerCase()
  return tenants.value?.filter(tenant =>
    tenant.name.toLowerCase().includes(query) ||
    tenant.slug.toLowerCase().includes(query) ||
    (tenant.description?.toLowerCase().includes(query) ?? false) ||
    (tenant.businessIdentifier?.toLowerCase().includes(query) ?? false)
  ) ?? []
})

const handleTenantSelect = async (tenant: Tenant) => {
  if (tenantId.value === tenant.id) {
    // Already selected, just navigate to dashboard
    await router.push(TenantRoutePaths.dashboard)
    return
  }

  // Switch to selected tenant
  switchTenantMutation(tenant.id, {
    onSuccess: () => {
      toast.success(`Switched to ${tenant.name}`)
      void router.push(TenantRoutePaths.dashboard)
    },
    onError: (error: unknown) => {
      toast.error(isAxiosError(error) ? error.response?.data?.message ?? 'Failed to switch tenant' : 'Failed to switch tenant')
      console.error('Switch tenant error:', error)
    },
  })
}

// Set mock service in store for useTenantSwitch
onMounted(() => {
  tenantStore.setService(mockTenantService)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Search Input -->
    <div class="relative">
      <Input
        v-model="searchQuery"
        type="search"
        placeholder="Search tenants..."
        class="pl-9 w-full"
      />
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-muted-foreground">
        Loading tenants...
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!filteredTenants.length" class="flex flex-col items-center justify-center py-12 text-center">
      <p class="text-muted-foreground">
        {{ searchQuery ? 'No tenants found matching your search.' : 'No tenants available.' }}
      </p>
    </div>

    <!-- Tenants Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <TenantCard
        v-for="tenant in filteredTenants"
        :key="tenant.id"
        :tenant="tenant"
        :is-selected="tenantId === tenant.id"
        :disabled="isSwitching"
        @click="handleTenantSelect(tenant)"
      />
    </div>
  </div>
</template>
