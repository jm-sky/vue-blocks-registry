import type { sidebarMenuButtonVariants } from '.'
import type { VariantProps } from 'class-variance-authority'
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>

export interface SidebarMenuButtonProps extends PrimitiveProps {
  variant?: SidebarMenuButtonVariants['variant']
  size?: SidebarMenuButtonVariants['size']
  isActive?: boolean
  class?: HTMLAttributes['class']
}

