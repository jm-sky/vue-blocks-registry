// modules/auth/validation/changePassword.schema.ts
import { z } from 'zod'

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, 'Obecne hasło jest wymagane'),
  password: z.string().min(8, 'Nowe hasło musi mieć minimum 8 znaków'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Hasła muszą być takie same',
  path: ['password_confirmation'],
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
