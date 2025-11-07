// modules/auth/services/mockTwoFactorService.ts
import { delay, generateMockJWT, getCurrentUserEmailFromMockJWT } from '@registry/shared/utils/mockHelpers'
import QRCode from 'qrcode'
import type {
  ITwoFactorService,
  Passkey,
  TotpSetup,
  TotpStatus,
  TwoFactorStatus,
  TwoFactorVerifyResponse,
  UpdatePreferredMethodRequest,
  WebAuthnRegisterRequest,
  WebAuthnRegisterResponse,
  WebAuthnStatus,
  WebAuthnVerifyResponse,
} from '@registry/modules/auth/types/twoFactor.type'

// Storage keys
const TOTP_SECRET_KEY = 'vbr_totp_secret'
const TOTP_STATUS_KEY = 'vbr_totp_status'
const TOTP_BACKUP_CODES_KEY = 'vbr_totp_backup_codes'
const PASSKEYS_KEY = 'vbr_passkeys'
const WEBAUTHN_STATUS_KEY = 'vbr_webauthn_status'
const PREFERRED_METHOD_KEY = 'vbr_preferred_2fa_method'

// Helper to generate random string
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567' // Base32 characters
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Helper to generate backup codes
function generateBackupCodes(count = 10): string[] {
  const codes: string[] = []
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    codes.push(code)
  }
  return codes
}

// Helper to generate ULID-like ID
function generateULID(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 15)
  return `pky_${timestamp}${randomPart}`
}

// Mock TOTP verification (accepts any 6-digit code in demo mode)
function verifyTotpCode(secret: string, code: string): boolean {
  // In demo mode, accept any valid 6-digit code
  return /^\d{6}$/.test(code)
}

// Mock JWT token generation with 2FA flags
function generateMockToken(email: string, tfaPending?: boolean, tfaVerified?: boolean, tfaMethod?: 'totp' | 'webauthn'): string {
  return generateMockJWT({ email, tfaPending, tfaVerified, tfaMethod })
}

class MockTwoFactorService implements ITwoFactorService {
  // TOTP Methods
  async setupTotp(): Promise<TotpSetup> {
    await delay()

    const email = getCurrentUserEmailFromMockJWT()
    const secret = generateRandomString(32) // Base32 encoded secret
    const backupCodes = generateBackupCodes()

    // Generate QR code data URL
    const otpauthUrl = `otpauth://totp/VueBlocksRegistry:${email}?secret=${secret}&issuer=VueBlocksRegistry&algorithm=SHA1&digits=6&period=30`
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)

    // Store secret and backup codes (in real app, this would be on backend)
    localStorage.setItem(TOTP_SECRET_KEY, secret)
    localStorage.setItem(TOTP_BACKUP_CODES_KEY, JSON.stringify(backupCodes))

    return {
      secret,
      qrCode: qrCodeDataUrl,
      backupCodes,
    }
  }

  async verifyTotp(code: string): Promise<{ verified: boolean }> {
    await delay(300)

    const secret = localStorage.getItem(TOTP_SECRET_KEY)
    if (!secret) {
      throw new Error('TOTP not set up')
    }

    // Check backup codes first
    const backupCodesJson = localStorage.getItem(TOTP_BACKUP_CODES_KEY)
    if (backupCodesJson) {
      const backupCodes = JSON.parse(backupCodesJson) as string[]
      const codeIndex = backupCodes.indexOf(code.toUpperCase())
      if (codeIndex !== -1) {
        // Remove used backup code
        backupCodes.splice(codeIndex, 1)
        localStorage.setItem(TOTP_BACKUP_CODES_KEY, JSON.stringify(backupCodes))

        // Enable TOTP if this is first verification
        if (!localStorage.getItem(TOTP_STATUS_KEY)) {
          const status: TotpStatus = {
            enabled: true,
            createdAt: new Date().toISOString(),
            lastUsedAt: new Date().toISOString(),
          }
          localStorage.setItem(TOTP_STATUS_KEY, JSON.stringify(status))
        }

        return { verified: true }
      }
    }

    // Verify TOTP code
    const verified = verifyTotpCode(secret, code)

    if (verified) {
      // Enable TOTP if this is first verification
      if (!localStorage.getItem(TOTP_STATUS_KEY)) {
        const status: TotpStatus = {
          enabled: true,
          createdAt: new Date().toISOString(),
          lastUsedAt: new Date().toISOString(),
        }
        localStorage.setItem(TOTP_STATUS_KEY, JSON.stringify(status))
      } else {
        // Update last used time
        const statusJson = localStorage.getItem(TOTP_STATUS_KEY)
        if (statusJson) {
          const status = JSON.parse(statusJson) as TotpStatus
          status.lastUsedAt = new Date().toISOString()
          localStorage.setItem(TOTP_STATUS_KEY, JSON.stringify(status))
        }
      }
    }

    return { verified }
  }

  async disableTotp(): Promise<void> {
    await delay()

    localStorage.removeItem(TOTP_SECRET_KEY)
    localStorage.removeItem(TOTP_STATUS_KEY)
    localStorage.removeItem(TOTP_BACKUP_CODES_KEY)
  }

  async getTotpStatus(): Promise<TotpStatus> {
    await delay(200)

    const statusJson = localStorage.getItem(TOTP_STATUS_KEY)
    if (!statusJson) {
      return { enabled: false }
    }

    return JSON.parse(statusJson)
  }

  // WebAuthn Methods
  async registerPasskey(request: WebAuthnRegisterRequest): Promise<WebAuthnRegisterResponse> {
    console.log('[mockTwoFactorService][registerPasskey] request:', request)
    await delay()

    const email = getCurrentUserEmailFromMockJWT()

    // Generate mock challenge
    const challenge = generateRandomString(32)

    // Create mock CredentialCreationOptions
    const credentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge: new TextEncoder().encode(challenge),
      rp: {
        name: 'Vue Blocks Registry',
        id: window.location.hostname,
      },
      user: {
        id: new TextEncoder().encode(email),
        name: email,
        displayName: email.split('@')[0] ?? 'User',
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' }, // ES256
        { alg: -257, type: 'public-key' }, // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        requireResidentKey: false,
        userVerification: 'preferred',
      },
      timeout: 60000,
      attestation: 'none',
    }

    return {
      challenge,
      credentialCreationOptions,
    }
  }

  async completePasskeyRegistration(name: string, credential: PublicKeyCredential): Promise<Passkey> {
    console.log('[mockTwoFactorService][completePasskeyRegistration] credential:', credential)
    await delay()

    // Create new passkey
    const passkey: Passkey = {
      id: generateULID(),
      name,
      createdAt: new Date().toISOString(),
    }

    // Get existing passkeys
    const passkeysJson = localStorage.getItem(PASSKEYS_KEY)
    const passkeys: Passkey[] = passkeysJson ? JSON.parse(passkeysJson) : []

    // Add new passkey
    passkeys.push(passkey)
    localStorage.setItem(PASSKEYS_KEY, JSON.stringify(passkeys))

    // Update WebAuthn status
    const status: WebAuthnStatus = {
      enabled: true,
      passkeys,
    }
    localStorage.setItem(WEBAUTHN_STATUS_KEY, JSON.stringify(status))

    return passkey
  }

  async verifyPasskey(): Promise<WebAuthnVerifyResponse> {
    await delay()

    // Get passkeys to include in challenge
    const passkeys = await this.listPasskeys()
    if (passkeys.length === 0) {
      throw new Error('No passkeys registered')
    }

    // Generate mock challenge
    const challenge = generateRandomString(32)

    // Create mock CredentialRequestOptions
    const credentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge: new TextEncoder().encode(challenge),
      rpId: window.location.hostname,
      allowCredentials: passkeys.map(pk => ({
        id: new TextEncoder().encode(pk.id),
        type: 'public-key' as const,
        transports: ['internal', 'hybrid'] as AuthenticatorTransport[],
      })),
      userVerification: 'preferred',
      timeout: 60000,
    }

    return {
      challenge,
      credentialRequestOptions,
    }
  }

  async completePasskeyVerification(credential: PublicKeyCredential): Promise<TwoFactorVerifyResponse> {
    console.log('[mockTwoFactorService][completePasskeyVerification] credential:', credential)
    await delay()

    const email = getCurrentUserEmailFromMockJWT()

    // Update last used time for the passkey (in real app, would match by credential.id)
    const passkeysJson = localStorage.getItem(PASSKEYS_KEY)
    if (passkeysJson) {
      const passkeys: Passkey[] = JSON.parse(passkeysJson)
      if (passkeys.length > 0 && passkeys[0]) {
        passkeys[0].lastUsedAt = new Date().toISOString()
        localStorage.setItem(PASSKEYS_KEY, JSON.stringify(passkeys))
      }
    }

    // Generate new JWT with tfaVerified flag
    const accessToken = generateMockToken(email, false, true, 'webauthn')

    return {
      verified: true,
      method: 'webauthn',
      accessToken,
      refreshToken: `refresh_${accessToken}`,
    }
  }

  async listPasskeys(): Promise<Passkey[]> {
    await delay(200)

    const passkeysJson = localStorage.getItem(PASSKEYS_KEY)
    return passkeysJson ? JSON.parse(passkeysJson) : []
  }

  async deletePasskey(passkeyId: string): Promise<void> {
    await delay()

    const passkeysJson = localStorage.getItem(PASSKEYS_KEY)
    if (!passkeysJson) {
      return
    }

    let passkeys: Passkey[] = JSON.parse(passkeysJson)
    passkeys = passkeys.filter(pk => pk.id !== passkeyId)

    if (passkeys.length === 0) {
      // No more passkeys, disable WebAuthn
      localStorage.removeItem(PASSKEYS_KEY)
      localStorage.removeItem(WEBAUTHN_STATUS_KEY)
    } else {
      localStorage.setItem(PASSKEYS_KEY, JSON.stringify(passkeys))

      // Update status
      const status: WebAuthnStatus = {
        enabled: true,
        passkeys,
      }
      localStorage.setItem(WEBAUTHN_STATUS_KEY, JSON.stringify(status))
    }
  }

  async getWebAuthnStatus(): Promise<WebAuthnStatus> {
    await delay(200)

    const statusJson = localStorage.getItem(WEBAUTHN_STATUS_KEY)
    if (!statusJson) {
      return { enabled: false, passkeys: [] }
    }

    return JSON.parse(statusJson)
  }

  // Combined Methods
  async getTwoFactorStatus(): Promise<TwoFactorStatus> {
    await delay(200)

    const [totp, webauthn] = await Promise.all([
      this.getTotpStatus(),
      this.getWebAuthnStatus(),
    ])

    return {
      totp,
      webauthn,
      required: false, // 2FA is optional in demo
    }
  }

  async updatePreferredMethod(
    request: UpdatePreferredMethodRequest
  ): Promise<{ preferredMethod: 'totp' | 'webauthn' | null }> {
    await delay(300)

    // Store preferred method
    if (request.preferredMethod) {
      localStorage.setItem(PREFERRED_METHOD_KEY, request.preferredMethod)
    } else {
      localStorage.removeItem(PREFERRED_METHOD_KEY)
    }

    // Also update in auth store if exists
    const currentUser = localStorage.getItem('vbr_current_user')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      user.preferredTwoFactorMethod = request.preferredMethod
      localStorage.setItem('vbr_current_user', JSON.stringify(user))
    }

    return {
      preferredMethod: request.preferredMethod,
    }
  }
}

export const mockTwoFactorService = new MockTwoFactorService()
