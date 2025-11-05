// modules/auth/validation/webauthn.schema.ts
import { z } from 'zod'

export const passkeyNameSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Name can only contain letters, numbers, spaces, hyphens, and underscores'),
})

export type PasskeyNameFormData = z.infer<typeof passkeyNameSchema>
