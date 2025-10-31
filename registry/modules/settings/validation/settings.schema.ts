// modules/settings/validation/settings.schema.ts
import { z } from 'zod'

export const settingsSchema = z.object({
  darkMode: z.enum(['light', 'dark']),
  locale: z.enum(['en', 'pl']),
})

export type SettingsFormData = z.infer<typeof settingsSchema>


