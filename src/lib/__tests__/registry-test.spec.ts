import { describe, expect, it } from 'vitest'
import type { RegistryItem } from '../../types/registry'
import registryData from '../../../registry.json'
import { DependencyResolver } from '../dependency-resolver'

describe('registry integration', () => {
  const items = registryData.items as RegistryItem[]

  it('should load registry.json correctly', () => {
    expect(registryData.name).toBe('vue-blocks-registry')
    expect(items).toBeDefined()
    expect(items.length).toBeGreaterThan(0)
  })

  it('should resolve button dependencies correctly', () => {
    const resolver = new DependencyResolver(items)
    const result = resolver.resolve('button')

    // Button depends on utils, so utils should be installed first
    expect(result.installOrder).toEqual(['utils', 'button'])
    expect(result.npmPackages).toContain('reka-ui')
    expect(result.npmPackages).toContain('class-variance-authority')
    expect(result.npmPackages).toContain('clsx')
    expect(result.npmPackages).toContain('tailwind-merge')
  })

  it('should have no circular dependencies', () => {
    const resolver = new DependencyResolver(items)
    expect(resolver.hasCircularDependencies()).toBe(false)
  })

  it('should resolve all items correctly', () => {
    const resolver = new DependencyResolver(items)
    const result = resolver.resolveAll()

    // Utils should come before button
    const utilsIndex = result.installOrder.indexOf('utils')
    const buttonIndex = result.installOrder.indexOf('button')
    expect(utilsIndex).toBeLessThan(buttonIndex)
  })
})
