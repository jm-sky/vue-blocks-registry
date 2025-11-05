export type JWTTwoFactorMethod = 'totp' | 'webauthn'

export interface JWTPayloadOptions {
  email: string
  tid?: string
  trol?: string
  tfaPending?: boolean // Whether 2FA verification is required
  tfaVerified?: boolean // Whether 2FA has been verified
  tfaMethod?: JWTTwoFactorMethod | null // 2FA method
}

export interface JWTPayload {
  sub: string    // Subject (User ID)
  email: string  // User Email
  tid?: string   // Tenant ID
  trol?: string  // Tenant Role
  iat: number    // Issued At
  exp: number    // Expiration
  aud?: string   // Audience
  tfaPending?: boolean // Whether 2FA verification is required
  tfaVerified?: boolean // Whether 2FA has been verified
  tfaMethod?: JWTTwoFactorMethod | null // 2FA method
}
