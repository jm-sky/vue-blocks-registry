// modules/auth/validation/register.schema.ts
import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirmation: z.string(),
  name: z.string().optional(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords must match',
  path: ['passwordConfirmation'],
})

export type RegisterFormData = z.infer<typeof registerSchema>
