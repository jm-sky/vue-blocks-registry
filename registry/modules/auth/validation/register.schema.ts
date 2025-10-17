// modules/auth/validation/register.schema.ts
import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków'),
  password_confirmation: z.string(),
  name: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Hasła muszą być takie same',
  path: ['password_confirmation'],
})

export type RegisterFormData = z.infer<typeof registerSchema>
