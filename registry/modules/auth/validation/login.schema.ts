// modules/auth/validation/login.schema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków'),
})

export type LoginFormData = z.infer<typeof loginSchema>
