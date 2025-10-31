// modules/user/validation/profile.schema.ts
import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
})

export type ProfileFormData = z.infer<typeof profileSchema>

