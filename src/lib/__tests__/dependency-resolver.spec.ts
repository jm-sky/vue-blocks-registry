import { describe, expect, it } from 'vitest'
import type { RegistryItem } from '../../types/registry'
import { DependencyResolver } from '../dependency-resolver'

describe('dependencyResolver', () => {
  describe('simple dependencies', () => {
    it('should resolve single item with no dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'button',
          type: 'registry:ui',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('button')

      expect(result.installOrder).toEqual(['button'])
      expect(result.npmPackages).toEqual([])
      expect(result.circularDependencies).toBeUndefined()
      expect(result.missingDependencies).toBeUndefined()
    })

    it('should resolve item with npm dependencies', () => {
      const items: RegistryItem[] = [
        {
          dependencies: ['axios', 'zod'],
          files: [],
          name: 'api-client',
          type: 'registry:lib',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('api-client')

      expect(result.npmPackages).toContain('axios')
      expect(result.npmPackages).toContain('zod')
    })

    it('should resolve item with registry dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'utils',
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'button',
          registryDependencies: ['utils'],
          type: 'registry:ui',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('button')

      expect(result.installOrder).toEqual(['utils', 'button'])
    })
  })

  describe('complex dependencies', () => {
    it('should resolve nested dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'utils',
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'api-client',
          registryDependencies: ['utils'],
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'auth-service',
          registryDependencies: ['api-client'],
          type: 'registry:lib',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('auth-service')

      expect(result.installOrder).toEqual(['utils', 'api-client', 'auth-service'])
    })

    it('should resolve multiple dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'utils',
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'button',
          type: 'registry:ui',
        },
        {
          files: [],
          name: 'form',
          registryDependencies: ['button', 'utils'],
          type: 'registry:component',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('form')

      expect(result.installOrder).toContain('utils')
      expect(result.installOrder).toContain('button')
      expect(result.installOrder).toContain('form')
      expect(result.installOrder.indexOf('form')).toBeGreaterThan(
        result.installOrder.indexOf('button')
      )
      expect(result.installOrder.indexOf('form')).toBeGreaterThan(
        result.installOrder.indexOf('utils')
      )
    })
  })

  describe('circular dependencies', () => {
    it('should detect circular dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'a',
          registryDependencies: ['b'],
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'b',
          registryDependencies: ['a'],
          type: 'registry:lib',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('a')

      expect(result.circularDependencies).toBeDefined()
      expect(result.circularDependencies?.length).toBeGreaterThan(0)
    })

    it('should detect complex circular dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'a',
          registryDependencies: ['b'],
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'b',
          registryDependencies: ['c'],
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'c',
          registryDependencies: ['a'],
          type: 'registry:lib',
        },
      ]

      const resolver = new DependencyResolver(items)
      expect(resolver.hasCircularDependencies()).toBe(true)
    })
  })

  describe('missing dependencies', () => {
    it('should detect missing dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'button',
          registryDependencies: ['utils'],
          type: 'registry:ui',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolve('button')

      expect(result.missingDependencies).toContain('utils')
    })
  })

  describe('resolve all', () => {
    it('should resolve all items in correct order', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'utils',
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'button',
          registryDependencies: ['utils'],
          type: 'registry:ui',
        },
        {
          files: [],
          name: 'form',
          registryDependencies: ['button'],
          type: 'registry:component',
        },
      ]

      const resolver = new DependencyResolver(items)
      const result = resolver.resolveAll()

      expect(result.installOrder).toEqual(['utils', 'button', 'form'])
    })
  })

  describe('get all dependencies', () => {
    it('should get all nested dependencies', () => {
      const items: RegistryItem[] = [
        {
          files: [],
          name: 'utils',
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'api-client',
          registryDependencies: ['utils'],
          type: 'registry:lib',
        },
        {
          files: [],
          name: 'auth-service',
          registryDependencies: ['api-client'],
          type: 'registry:lib',
        },
      ]

      const resolver = new DependencyResolver(items)
      const deps = resolver.getAllDependencies('auth-service')

      expect(deps).toContain('api-client')
      expect(deps).toContain('utils')
    })
  })
})
