// modules/auth/validation/resetPassword.schema.ts
import { z } from 'zod'

export const resetPasswordSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  token: z.string().min(1, 'Token jest wymagany'),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Hasła muszą być takie same',
  path: ['password_confirmation'],
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
