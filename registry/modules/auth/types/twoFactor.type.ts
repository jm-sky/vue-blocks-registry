import type { TDateTime, TULID } from '@registry/shared/types/base.type'

// TOTP Types
export interface TotpSetup {
  secret: string // Secret key for generating codes
  qrCode: string // Data URL for QR code
  backupCodes: string[] // Backup codes for one-time use
}

export interface TotpVerify {
  code: string // 6-digit code from authenticator app
}

export interface TotpStatus {
  enabled: boolean
  createdAt?: TDateTime
  lastUsedAt?: TDateTime
}

// WebAuthn Types
export interface Passkey {
  id: TULID // Credential ID
  name: string // User-given name (e.g., "iPhone", "Laptop")
  createdAt: TDateTime
  lastUsedAt?: TDateTime
}

export interface WebAuthnRegisterRequest {
  name: string // Passkey name
}

export interface WebAuthnRegisterResponse {
  challenge: string // Challenge to sign
  credentialCreationOptions: PublicKeyCredentialCreationOptions
}

export interface WebAuthnVerifyRequest {
  credentialId?: string // Optional credential ID to use for verification
}

export interface WebAuthnVerifyResponse {
  challenge: string
  credentialRequestOptions: PublicKeyCredentialRequestOptions
}

export interface WebAuthnStatus {
  enabled: boolean
  passkeys: Passkey[]
}

// Combined Types
export interface TwoFactorStatus {
  totp: TotpStatus
  webauthn: WebAuthnStatus
  required: boolean // Whether 2FA is required (global setting)
}

export interface TwoFactorVerifyResponse {
  verified: boolean
  method: 'totp' | 'webauthn'
  accessToken: string // New access token with tfaVerified=true in payload
  refreshToken?: string
}

// JWT Payload Extension (for decoding JWT)
export interface TwoFactorJWTPayload {
  tfaPending?: boolean // Whether 2FA verification is required
  tfaVerified?: boolean // Whether 2FA has been verified
  tfaMethod?: 'totp' | 'webauthn' | null // 2FA method
}

// Service interface
export interface ITwoFactorService {
  // TOTP
  setupTotp(): Promise<TotpSetup>
  verifyTotp(code: string): Promise<{ verified: boolean }>
  disableTotp(): Promise<void>
  getTotpStatus(): Promise<TotpStatus>

  // WebAuthn
  registerPasskey(request: WebAuthnRegisterRequest): Promise<WebAuthnRegisterResponse>
  completePasskeyRegistration(
    name: string,
    credential: PublicKeyCredential
  ): Promise<Passkey>
  verifyPasskey(): Promise<WebAuthnVerifyResponse>
  completePasskeyVerification(credential: PublicKeyCredential): Promise<TwoFactorVerifyResponse>
  listPasskeys(): Promise<Passkey[]>
  deletePasskey(passkeyId: string): Promise<void>
  getWebAuthnStatus(): Promise<WebAuthnStatus>

  // Combined
  getTwoFactorStatus(): Promise<TwoFactorStatus>
}
