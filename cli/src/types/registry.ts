/**
 * Registry type definitions based on shadcn-vue registry system
 * Extended with custom types for features and bundles
 */

export type RegistryType =
  | 'registry:ui'
  | 'registry:component'
  | 'registry:block'
  | 'registry:lib'
  | 'registry:hook'
  | 'registry:page'
  | 'registry:file'
  | 'registry:feature' // Custom type for feature packages
  | 'registry:layout' // Layout components
  | 'registry:bundle' // Complete module bundles

export type FileType =
  | 'registry:ui'
  | 'registry:component'
  | 'registry:block'
  | 'registry:lib'
  | 'registry:hook'
  | 'registry:page'
  | 'registry:file'

export interface RegistryFile {
  /**
   * Path to the file in the registry
   */
  path: string

  /**
   * Type of the file
   */
  type: FileType

  /**
   * Target path where the file should be installed
   * Required for registry:page and registry:file types
   * Uses ~ to reference project root
   */
  target?: string

  /**
   * File content (for generated registry JSON)
   */
  content?: string
}

export interface CSSVars {
  theme?: Record<string, string>
  light?: Record<string, string>
  dark?: Record<string, string>
}

export interface RegistryItem {
  /**
   * Schema reference
   */
  $schema?: string

  /**
   * Unique identifier for the registry item
   */
  name: string

  /**
   * Type of the registry item
   */
  type: RegistryType

  /**
   * Human-readable title
   */
  title?: string

  /**
   * Detailed description
   */
  description?: string

  /**
   * Author information
   */
  author?: string

  /**
   * NPM package dependencies
   */
  dependencies?: string[]

  /**
   * Registry dependencies (other registry items)
   * Can be:
   * - Item name: 'button'
   * - Namespaced: '@acme/input-form'
   * - URL: 'https://example.com/r/hello-world.json'
   */
  registryDependencies?: string[]

  /**
   * Files included in this registry item
   */
  files: RegistryFile[]

  /**
   * CSS variables configuration
   */
  cssVars?: CSSVars

  /**
   * Custom CSS rules
   */
  css?: string[]

  /**
   * Installation documentation
   */
  docs?: string

  /**
   * Categories for organization
   */
  categories?: string[]

  /**
   * Custom metadata
   */
  meta?: Record<string, unknown>

  /**
   * @deprecated Use cssVars instead
   */
  tailwind?: {
    config?: Record<string, unknown>
  }
}

export interface Registry {
  /**
   * Schema reference
   */
  $schema?: string

  /**
   * Name of the registry
   */
  name: string

  /**
   * Version of the registry
   */
  version: string

  /**
   * Description of the registry
   */
  description?: string

  /**
   * Homepage URL
   */
  homepage?: string

  /**
   * Registry items
   */
  items?: RegistryItem[]

  /**
   * Legacy structure - organized by type
   * @deprecated Use items array instead
   */
  components?: Record<string, Omit<RegistryItem, 'name'>>
  features?: Record<string, Omit<RegistryItem, 'name'>>
  bundles?: Record<string, Omit<RegistryItem, 'name'>>
}

/**
 * Dependency graph node
 */
export interface DependencyNode {
  name: string
  type: RegistryType
  dependencies: string[]
  registryDependencies: string[]
  resolved: boolean
}

/**
 * Dependency resolution result
 */
export interface DependencyResolution {
  /**
   * Items in installation order
   */
  installOrder: string[]

  /**
   * NPM packages to install
   */
  npmPackages: string[]

  /**
   * Circular dependencies detected
   */
  circularDependencies?: string[][]

  /**
   * Missing dependencies
   */
  missingDependencies?: string[]
}
