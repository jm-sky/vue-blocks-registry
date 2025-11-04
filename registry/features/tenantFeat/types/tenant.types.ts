// features/tenantFeat/types/tenant.types.ts
import type { TDateTime, TULID } from '@registry/shared/types/base.type'

export interface Tenant {
  id: TULID
  name: string
  slug: string              // URL-friendly identyfikator
  externalId?: string       // ID zewnętrzny (np. z innego systemu)
  businessIdentifier?: string // Ogólne pole dla friendly ID (np. taxId, vatId, NIP, etc.)
                             // TODO: Do ustalenia - może być bardziej specyficzne pole
  logo?: string
  description?: string
  isActive: boolean         // status aktywności tenant
  createdAt: TDateTime
  updatedAt: TDateTime
}

export interface TenantUser {
  id: TULID
  tenantId: TULID
  userId: TULID
  role: TenantRole
  joinedAt: TDateTime
}

export enum TenantRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  OWNER = 'owner',
  VIEWER = 'viewer'
}

export interface TenantMembership {
  tenant: Tenant
  role: TenantRole
  permissions: string[]
}

export interface CreateTenantDto {
  name: string
  slug: string
  externalId?: string
  businessIdentifier?: string
  logo?: string
  description?: string
}

export interface UpdateTenantDto {
  name?: string
  slug?: string
  externalId?: string
  businessIdentifier?: string
  logo?: string
  description?: string
  isActive?: boolean
}

export interface SwitchTenantResponse {
  token: string
  tenant: Tenant
}

export interface JWTPayload {
  sub: string        // userId
  email: string
  tid?: string       // tenantId - aktualny tenant context (skrócona nazwa)
  trol?: string      // tenantRole - rola użytkownika w tenant (owner, admin, member, viewer)
  iat: number
  exp: number
}
