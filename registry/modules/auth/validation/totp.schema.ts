// modules/auth/validation/totp.schema.ts
import { z } from 'zod'

export const totpVerifySchema = z.object({
  code: z
    .string()
    .length(6, 'Code must be 6 digits')
    .regex(/^\d{6}$/, 'Code must contain only digits'),
})

export type TotpVerifyFormData = z.infer<typeof totpVerifySchema>
