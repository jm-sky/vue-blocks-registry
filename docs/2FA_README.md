# Two-Factor Authentication (2FA) - Implementation Guide

## Overview

Vue Blocks Registry provides a complete, production-ready Two-Factor Authentication (2FA) system with support for:

- **TOTP (Time-based One-Time Password)** - Authenticator apps like Google Authenticator, Authy, Microsoft Authenticator
- **WebAuthn Passkeys** - Biometric authentication (Face ID, Touch ID) and hardware security keys (YubiKey)
- **JWT-based verification** - Secure token-based 2FA status tracking
- **Multi-language support** - English and Polish translations included
- **Mock service for demos** - Works out of the box without backend

## Features

### TOTP (Authenticator Apps)
✅ QR code generation for easy setup
✅ Manual secret entry option
✅ 6-digit code verification
✅ 10 backup codes for account recovery
✅ Enable/disable functionality
✅ Multi-step wizard for user-friendly setup

### WebAuthn (Passkeys)
✅ Register multiple passkeys with custom names
✅ Biometric authentication (fingerprint, face recognition)
✅ Hardware security key support (YubiKey, etc.)
✅ Manage registered passkeys
✅ Track last usage
✅ Cross-platform compatibility

### Security
✅ JWT-based 2FA status (`tfaPending`, `tfaVerified`, `tfaMethod` flags)
✅ Router guard enforcement
✅ Separate verification flow
✅ Mock tokens for demo mode
✅ LocalStorage persistence for demo

## Quick Start

### Installation

Install the complete 2FA bundle:

```bash
npx vue-blocks-registry add twoFactorFull
```

Or install only the core functionality (no UI):

```bash
npx vue-blocks-registry add twoFactorFeat
```

### Required Dependencies

The following npm packages will be automatically installed:

```json
{
  "qrcode": "^1.5.4",
  "@simplewebauthn/browser": "^13.2.2",
  "@types/qrcode": "^1.5.6"
}
```

### Router Setup

Add the 2FA guard to your router (after auth guard):

```typescript
// router/index.ts
import { createRouter } from 'vue-router'
import { protectRoutes } from '@/modules/auth/guards/authGuard'
import { protectRoutesWithTwoFactor } from '@/modules/auth/guards/twoFactorGuard'

const router = createRouter({
  // your routes...
})

// Apply guards in order
protectRoutes(router)
protectRoutesWithTwoFactor(router) // MUST be after auth guard

export default router
```

### Add Routes

Import and register 2FA routes:

```typescript
// router/index.ts
import { authRoutes } from '@/modules/auth/config/routes'

const routes = [
  // your routes...
  ...authRoutes, // includes /auth/2fa/setup and /auth/2fa/verify
]
```

## Usage

### User Setup Flow

1. User navigates to `/settings`
2. Clicks "Enable 2FA" in the Security card
3. Redirected to `/auth/2fa/setup`
4. Chooses between TOTP or Passkeys
5. Follows setup wizard
6. 2FA is now enabled

### Login Flow with 2FA

1. User logs in with email/password
2. Backend returns JWT with `tfaPending: true`
3. Router guard redirects to `/auth/2fa/verify`
4. User completes 2FA verification
5. Backend returns new JWT with `tfaVerified: true`
6. User is redirected to intended page

## Architecture

### JWT Payload Structure

The 2FA system uses JWT token payload to track verification status:

```typescript
interface TwoFactorJWTPayload {
  tfaPending?: boolean    // true after login, false after verify
  tfaVerified?: boolean   // true after successful 2FA verify
  tfaMethod?: 'totp' | 'webauthn' | null  // which method is active
}
```

**Mock Token Example:**
```
mock_jwt_user@example.com_tfa_pending_1234567890
mock_jwt_user@example.com_tfa_verified_totp_1234567890
```

### File Structure

```
registry/modules/auth/
├── types/
│   └── twoFactor.type.ts           # TypeScript types
├── lib/
│   └── jwtDecoder.ts               # JWT decoder with 2FA flags
├── services/
│   ├── twoFactorService.ts         # Real API service
│   └── mockTwoFactorService.ts     # Mock service for demo
├── validation/
│   ├── totp.schema.ts              # TOTP validation
│   └── webauthn.schema.ts          # Passkey validation
├── composables/
│   ├── useTwoFactor.ts             # Main composable
│   ├── useTotp.ts                  # TOTP operations
│   └── useWebAuthn.ts              # WebAuthn operations
├── components/
│   ├── TotpQrCode.vue              # QR code display
│   ├── TotpSetupForm.vue           # TOTP setup wizard
│   ├── TotpVerifyForm.vue          # TOTP verification
│   ├── WebAuthnRegisterForm.vue    # Passkey registration
│   ├── WebAuthnVerifyForm.vue      # Passkey verification
│   └── PasskeyList.vue             # Manage passkeys
├── pages/
│   ├── TwoFactorSetupPage.vue      # Setup page
│   └── TwoFactorVerifyPage.vue     # Verification page
└── guards/
    └── twoFactorGuard.ts           # Router guard
```

## Components API

### TotpSetupForm

Multi-step wizard for TOTP setup.

```vue
<template>
  <TotpSetupForm :service="twoFactorService" @success="handleSuccess" />
</template>
```

**Props:**
- `service?: ITwoFactorService` - Optional custom service (defaults to mock)

**Events:**
- `success` - Emitted when TOTP is successfully enabled

### TotpVerifyForm

Verification form for login flow.

```vue
<template>
  <TotpVerifyForm :service="twoFactorService" @success="handleSuccess" />
</template>
```

**Props:**
- `service?: ITwoFactorService` - Optional custom service

**Events:**
- `success: (accessToken: string)` - Emitted with new verified token

### WebAuthnRegisterForm

Passkey registration form.

```vue
<template>
  <WebAuthnRegisterForm :service="twoFactorService" @success="handleSuccess" />
</template>
```

**Props:**
- `service?: ITwoFactorService` - Optional custom service

**Events:**
- `success` - Emitted when passkey is registered

### PasskeyList

Manage registered passkeys.

```vue
<template>
  <PasskeyList :service="twoFactorService" />
</template>
```

**Props:**
- `service?: ITwoFactorService` - Optional custom service

### SecuritySettingsCard

Settings page integration showing 2FA status.

```vue
<template>
  <SecuritySettingsCard :service="twoFactorService" />
</template>
```

**Props:**
- `service?: ITwoFactorService` - Optional custom service

## Composables API

### useTwoFactorStatus

Get overall 2FA status.

```typescript
const { data: status, isLoading } = useTwoFactorStatus()

// status: {
//   totp: { enabled: boolean, createdAt?: string, lastUsedAt?: string }
//   webauthn: { enabled: boolean, passkeys: Passkey[] }
//   required: boolean
// }
```

### useSetupTotp

Initialize TOTP setup.

```typescript
const { mutateAsync: setupTotp, isPending } = useSetupTotp()

const result = await setupTotp()
// result: { secret: string, qrCode: string, backupCodes: string[] }
```

### useVerifyTotp

Verify TOTP code.

```typescript
const { mutateAsync: verifyTotp, isPending } = useVerifyTotp()

const result = await verifyTotp('123456')
// result: { verified: boolean }
```

### useRegisterPasskey

Register a new passkey.

```typescript
const { mutateAsync: registerPasskey, isPending } = useRegisterPasskey()

await registerPasskey({ name: 'My iPhone' })
// Triggers WebAuthn browser API
```

### useVerifyPasskey

Verify with a passkey.

```typescript
const { mutateAsync: verifyPasskey, isPending } = useVerifyPasskey()

const result = await verifyPasskey()
// result: { verified: true, method: 'webauthn', accessToken: string, ... }
```

## Backend Integration

### API Endpoints

Your backend should implement these endpoints:

```
POST   /auth/2fa/totp/setup          # Initialize TOTP
POST   /auth/2fa/totp/verify         # Verify TOTP code
DELETE /auth/2fa/totp                # Disable TOTP
GET    /auth/2fa/totp/status         # Get TOTP status

POST   /auth/2fa/webauthn/register   # Start passkey registration
POST   /auth/2fa/webauthn/complete   # Complete registration
POST   /auth/2fa/webauthn/verify     # Start verification
POST   /auth/2fa/webauthn/verify/complete  # Complete verification
GET    /auth/2fa/webauthn/passkeys   # List passkeys
DELETE /auth/2fa/webauthn/passkeys/:id  # Delete passkey

GET    /auth/2fa/status              # Get all 2FA status
```

### JWT Token Requirements

**After login (if user has 2FA enabled):**
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "tfaPending": true,
  "tfaMethod": "totp",
  "exp": 1234567890
}
```

**After 2FA verification:**
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "tfaVerified": true,
  "tfaMethod": "totp",
  "exp": 1234567890
}
```

### Service Implementation

Replace mock service with real implementation:

```typescript
// composables/useTwoFactor.ts
import { twoFactorService } from '@/modules/auth/services/twoFactorService'

export function useTwoFactorStatus() {
  return useQuery({
    queryKey: twoFactorQueryKeys.status(),
    queryFn: () => twoFactorService.getTwoFactorStatus(), // Use real service
    staleTime: 5 * 60 * 1000,
  })
}
```

## Testing

### Demo Mode (Mock Service)

The system works out of the box with mock service:

1. **TOTP**: Accepts any 6-digit code or backup codes
2. **WebAuthn**: Simulates passkey registration/verification
3. **Storage**: Uses localStorage for demo persistence

### Testing TOTP

```bash
# Setup TOTP
1. Navigate to /auth/2fa/setup
2. Scan QR code with Google Authenticator
3. Enter the 6-digit code
4. Save backup codes

# Verify TOTP
1. Login normally
2. Enter TOTP code when prompted
3. Access granted
```

### Testing WebAuthn

**Requirements:**
- HTTPS or localhost
- Compatible browser (Chrome, Safari, Edge)
- Device with biometric authentication or security key

```bash
# Register Passkey
1. Navigate to /auth/2fa/setup
2. Click "Passkeys" tab
3. Enter passkey name
4. Click "Register Passkey"
5. Complete biometric prompt

# Verify with Passkey
1. Login normally
2. Click "Use Passkey"
3. Complete biometric prompt
4. Access granted
```

## Registry Items

### Available Items

- `two-factor-types` - TypeScript types
- `two-factor-jwt-decoder` - JWT decoder
- `two-factor-service` - Service layer
- `two-factor-validation` - Zod schemas
- `two-factor-composables` - Composables
- `two-factor-components` - UI components
- `two-factor-pages` - Pages
- `two-factor-guards` - Router guards
- `two-factor-config` - Route configuration
- `two-factor-i18n` - Translations
- `security-settings-card` - Settings integration
- **`twoFactorFeat`** - Core bundle (no UI)
- **`twoFactorFull`** - Complete bundle (with UI)

### Installation Options

```bash
# Full bundle (recommended for most users)
npx vue-blocks-registry add twoFactorFull

# Core only (if you want custom UI)
npx vue-blocks-registry add twoFactorFeat

# Individual components
npx vue-blocks-registry add two-factor-components
npx vue-blocks-registry add two-factor-pages
npx vue-blocks-registry add security-settings-card
```

## Customization

### Custom Styling

All components use shadcn-vue components and Tailwind CSS:

```vue
<!-- Override button styles -->
<TotpSetupForm class="custom-class" />

<!-- Use custom card styling -->
<SecuritySettingsCard class="border-2 border-primary" />
```

### Custom Translations

Add or override translations:

```typescript
// i18n config
import { authEn } from '@/modules/auth/i18n'

const messages = {
  en: {
    ...authEn.auth,
    two_factor: {
      ...authEn.auth.two_factor,
      title: 'Enhanced Security', // Custom title
    }
  }
}
```

### Custom Service

Implement your own service:

```typescript
// myTwoFactorService.ts
import { ITwoFactorService } from '@/modules/auth/types/twoFactor.type'

class MyTwoFactorService implements ITwoFactorService {
  async setupTotp() {
    // Your implementation
  }
  // ... other methods
}

export const myTwoFactorService = new MyTwoFactorService()
```

Use it in components:

```vue
<TotpSetupForm :service="myTwoFactorService" />
```

## Troubleshooting

### QR Code Not Displaying

**Issue**: QR code doesn't show up
**Solution**: Ensure `qrcode` package is installed:
```bash
pnpm add qrcode @types/qrcode
```

### WebAuthn Not Working

**Issue**: Passkey registration fails
**Possible causes:**
- Not using HTTPS or localhost
- Browser doesn't support WebAuthn
- Device doesn't have biometric authentication

**Solution**: Test on supported environment (Chrome + HTTPS + Touch ID/Face ID)

### Guard Not Redirecting

**Issue**: twoFactorGuard doesn't redirect
**Solution**: Ensure guard is registered AFTER authGuard:

```typescript
protectRoutes(router)          // Auth guard first
protectRoutesWithTwoFactor(router)  // 2FA guard second
```

### Translation Missing

**Issue**: Some translations show as keys
**Solution**: Ensure i18n is properly configured:

```typescript
import { authEn } from '@/modules/auth/i18n'

const i18n = createI18n({
  messages: {
    en: {
      ...authEn, // Import auth translations
    }
  }
})
```

## Security Considerations

1. **HTTPS Required**: WebAuthn requires HTTPS (or localhost for development)
2. **Token Security**: JWT tokens should be stored securely (httpOnly cookies recommended)
3. **Backup Codes**: Users should store backup codes securely offline
4. **Rate Limiting**: Implement rate limiting on verification endpoints
5. **Session Timeout**: Consider implementing session timeout after 2FA verification
6. **Passkey Names**: Users can identify their devices through custom names

## Browser Compatibility

### TOTP
✅ All modern browsers

### WebAuthn
✅ Chrome 67+
✅ Safari 13+
✅ Firefox 60+
✅ Edge 18+
❌ IE (not supported)

## Examples

### Complete Integration Example

```typescript
// router/index.ts
import { createRouter } from 'vue-router'
import { protectRoutes } from '@/modules/auth/guards/authGuard'
import { protectRoutesWithTwoFactor } from '@/modules/auth/guards/twoFactorGuard'
import { authRoutes } from '@/modules/auth/config/routes'

const router = createRouter({
  routes: [
    ...authRoutes,
    { path: '/settings', component: SettingsPage },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  ]
})

protectRoutes(router)
protectRoutesWithTwoFactor(router)

export default router
```

### Settings Page with 2FA Card

```vue
<template>
  <div class="space-y-6">
    <h1>Settings</h1>

    <!-- Other settings... -->

    <!-- 2FA Security Card -->
    <SecuritySettingsCard />
  </div>
</template>

<script setup lang="ts">
import SecuritySettingsCard from '@/modules/settings/components/SecuritySettingsCard.vue'
</script>
```

## Contributing

Found a bug or have a feature request? Please open an issue on GitHub:
https://github.com/jm-sky/vue-blocks-registry/issues

## License

MIT License - See LICENSE file for details

---

**Need help?** Check the [main README](../README.md) or [open an issue](https://github.com/jm-sky/vue-blocks-registry/issues).
