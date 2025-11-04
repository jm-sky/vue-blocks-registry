// features/tenantFeat/store/useTenantStore.ts
import { useAuthStore } from '@registry/modules/auth/store/useAuthStore'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Tenant, TenantMembership, TenantRole } from '../types/tenant.types'
import { getTenantIdFromToken, getTenantRoleFromToken } from '../lib/jwtDecoder'

export const useTenantStore = defineStore('tenant', () => {
  const authStore = useAuthStore()
  const currentTenant = ref<Tenant | null>(null)
  const availableTenants = ref<Tenant[]>([])
  const tenantMembership = ref<TenantMembership | null>(null)

  /**
   * Get current tenant ID from JWT token
   */
  const currentTenantId = computed<string | null>(() => {
    if (!authStore.token) return null
    return getTenantIdFromToken(authStore.token)
  })

  /**
   * Get current tenant role from JWT token
   */
  const currentTenantRole = computed<TenantRole | null>(() => {
    if (!authStore.token) return null
    const role = getTenantRoleFromToken(authStore.token)
    return role as TenantRole | null
  })

  const setTenant = (tenant: Tenant) => {
    currentTenant.value = tenant
  }

  /**
   * Clear tenant data
   */
  function clearTenant() {
    currentTenant.value = null
    tenantMembership.value = null
  }

  /**
   * Clear all tenant data including available tenants
   */
  function clearAll() {
    clearTenant()
    availableTenants.value = []
  }

  return {
    currentTenant,
    availableTenants,
    tenantMembership,
    currentTenantId,
    currentTenantRole,
    setTenant,
    clearTenant,
    clearAll,
  }
})
