// modules/auth/validation/forgotPassword.schema.ts
import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
