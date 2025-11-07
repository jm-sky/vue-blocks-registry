// modules/auth/services/twoFactorService.ts
import { apiClient } from '@registry/shared/services/apiClient'
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

class TwoFactorService implements ITwoFactorService {
  // TOTP Methods
  async setupTotp(): Promise<TotpSetup> {
    const response = await apiClient.post<TotpSetup>('/auth/2fa/totp/setup')
    return response.data
  }

  async verifyTotp(code: string): Promise<{ verified: boolean }> {
    const response = await apiClient.post<{ verified: boolean }>('/auth/2fa/totp/verify', { code })
    return response.data
  }

  async disableTotp(): Promise<void> {
    await apiClient.delete('/auth/2fa/totp')
  }

  async getTotpStatus(): Promise<TotpStatus> {
    const response = await apiClient.get<TotpStatus>('/auth/2fa/totp/status')
    return response.data
  }

  // WebAuthn Methods
  async registerPasskey(request: WebAuthnRegisterRequest): Promise<WebAuthnRegisterResponse> {
    const response = await apiClient.post<WebAuthnRegisterResponse>(
      '/auth/2fa/webauthn/register',
      request
    )
    return response.data
  }

  async completePasskeyRegistration(
    name: string,
    credential: PublicKeyCredential
  ): Promise<Passkey> {
    // Convert credential to JSON-serializable format
    const credentialJSON = {
      id: credential.id,
      rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
      response: {
        clientDataJSON: btoa(
          String.fromCharCode(...new Uint8Array((credential.response as AuthenticatorAttestationResponse).clientDataJSON))
        ),
        attestationObject: btoa(
          String.fromCharCode(...new Uint8Array((credential.response as AuthenticatorAttestationResponse).attestationObject))
        ),
      },
      type: credential.type,
    }

    const response = await apiClient.post<Passkey>('/auth/2fa/webauthn/complete', {
      name,
      credential: credentialJSON,
    })
    return response.data
  }

  async verifyPasskey(): Promise<WebAuthnVerifyResponse> {
    const response = await apiClient.post<WebAuthnVerifyResponse>('/auth/2fa/webauthn/verify')
    return response.data
  }

  async completePasskeyVerification(credential: PublicKeyCredential): Promise<TwoFactorVerifyResponse> {
    // Convert credential to JSON-serializable format
    const credentialJSON = {
      id: credential.id,
      rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
      response: {
        clientDataJSON: btoa(
          String.fromCharCode(...new Uint8Array((credential.response as AuthenticatorAssertionResponse).clientDataJSON))
        ),
        authenticatorData: btoa(
          String.fromCharCode(...new Uint8Array((credential.response as AuthenticatorAssertionResponse).authenticatorData))
        ),
        signature: btoa(
          String.fromCharCode(...new Uint8Array((credential.response as AuthenticatorAssertionResponse).signature))
        ),
        userHandle: (credential.response as AuthenticatorAssertionResponse).userHandle
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ? btoa(String.fromCharCode(...new Uint8Array((credential.response as AuthenticatorAssertionResponse).userHandle!)))
          : null,
      },
      type: credential.type,
    }

    const response = await apiClient.post<TwoFactorVerifyResponse>('/auth/2fa/webauthn/verify/complete', {
      credential: credentialJSON,
    })
    return response.data
  }

  async listPasskeys(): Promise<Passkey[]> {
    const response = await apiClient.get<Passkey[]>('/auth/2fa/webauthn/passkeys')
    return response.data
  }

  async deletePasskey(passkeyId: string): Promise<void> {
    await apiClient.delete(`/auth/2fa/webauthn/passkeys/${passkeyId}`)
  }

  async getWebAuthnStatus(): Promise<WebAuthnStatus> {
    const response = await apiClient.get<WebAuthnStatus>('/auth/2fa/webauthn/status')
    return response.data
  }

  // Combined Methods
  async getTwoFactorStatus(): Promise<TwoFactorStatus> {
    const response = await apiClient.get<TwoFactorStatus>('/auth/2fa/status')
    return response.data
  }

  async updatePreferredMethod(
    request: UpdatePreferredMethodRequest
  ): Promise<{ preferredMethod: 'totp' | 'webauthn' | null }> {
    const response = await apiClient.patch<{ preferredMethod: 'totp' | 'webauthn' | null }>(
      '/auth/2fa/preferred-method',
      request
    )
    return response.data
  }
}

export const twoFactorService = new TwoFactorService()
