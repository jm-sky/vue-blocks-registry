import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Updater } from '@tanstack/vue-table'
import type { ClassValue } from 'clsx'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility for TanStack Table updaters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function valueUpdater(updaterOrValue: Updater<any>, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}
