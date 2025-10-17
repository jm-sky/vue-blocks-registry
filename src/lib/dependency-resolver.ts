import type { DependencyNode, DependencyResolution, RegistryItem } from '../types/registry'

/**
 * Dependency resolver for registry items
 * Handles topological sorting and circular dependency detection
 */
export class DependencyResolver {
  private nodes = new Map<string, DependencyNode>()
  private registry = new Map<string, RegistryItem>()

  constructor(items: RegistryItem[]) {
    // Build registry map
    for (const item of items) {
      this.registry.set(item.name, item)
    }

    // Build dependency graph
    for (const item of items) {
      this.nodes.set(item.name, {
        dependencies: item.dependencies ?? [],
        name: item.name,
        registryDependencies: item.registryDependencies ?? [],
        resolved: false,
        type: item.type,
      })
    }
  }

  /**
   * Resolve dependencies for a given item
   * Returns items in installation order
   */
  resolve(itemName: string): DependencyResolution {
    const installOrder: string[] = []
    const npmPackages = new Set<string>()
    const visited = new Set<string>()
    const visiting = new Set<string>()
    const circularDependencies: string[][] = []
    const missingDependencies: string[] = []

    const visit = (name: string, path: string[] = []): void => {
      // Check if item exists
      const node = this.nodes.get(name)
      if (!node) {
        if (!missingDependencies.includes(name)) {
          missingDependencies.push(name)
        }
        return
      }

      // Check for circular dependency
      if (visiting.has(name)) {
        const cycle = [...path, name]
        circularDependencies.push(cycle)
        return
      }

      // Already resolved
      if (visited.has(name)) {
        return
      }

      visiting.add(name)

      // Add npm packages
      for (const dep of node.dependencies) {
        npmPackages.add(dep)
      }

      // Visit registry dependencies first
      for (const dep of node.registryDependencies) {
        // Skip external URLs for now
        if (dep.startsWith('http://') || dep.startsWith('https://')) {
          continue
        }

        // Handle namespaced dependencies (@scope/name)
        const depName = dep.startsWith('@') ? dep : dep

        visit(depName, [...path, name])
      }

      visiting.delete(name)
      visited.add(name)
      installOrder.push(name)
    }

    visit(itemName)

    return {
      circularDependencies: circularDependencies.length > 0 ? circularDependencies : undefined,
      installOrder,
      missingDependencies: missingDependencies.length > 0 ? missingDependencies : undefined,
      npmPackages: Array.from(npmPackages),
    }
  }

  /**
   * Resolve all dependencies in the registry
   * Returns all items in installation order
   */
  resolveAll(): DependencyResolution {
    const installOrder: string[] = []
    const npmPackages = new Set<string>()
    const visited = new Set<string>()
    const circularDependencies: string[][] = []

    // Topological sort using DFS
    const visit = (name: string, path: string[] = []): void => {
      const node = this.nodes.get(name)
      if (!node || visited.has(name)) {
        return
      }

      // Check for circular dependency
      if (path.includes(name)) {
        const cycle = [...path, name]
        circularDependencies.push(cycle)
        return
      }

      // Add npm packages
      for (const dep of node.dependencies) {
        npmPackages.add(dep)
      }

      // Visit dependencies first
      for (const dep of node.registryDependencies) {
        if (!dep.startsWith('http://') && !dep.startsWith('https://')) {
          visit(dep, [...path, name])
        }
      }

      visited.add(name)
      installOrder.push(name)
    }

    // Visit all nodes
    for (const name of this.nodes.keys()) {
      visit(name)
    }

    return {
      circularDependencies: circularDependencies.length > 0 ? circularDependencies : undefined,
      installOrder,
      npmPackages: Array.from(npmPackages),
    }
  }

  /**
   * Get all dependencies (recursive) for a given item
   */
  getAllDependencies(itemName: string): string[] {
    const result = new Set<string>()
    const visited = new Set<string>()

    const visit = (name: string): void => {
      if (visited.has(name)) {
        return
      }

      visited.add(name)
      const node = this.nodes.get(name)
      if (!node) {
        return
      }

      for (const dep of node.registryDependencies) {
        if (!dep.startsWith('http://') && !dep.startsWith('https://')) {
          result.add(dep)
          visit(dep)
        }
      }
    }

    visit(itemName)
    return Array.from(result)
  }

  /**
   * Check if there are circular dependencies
   */
  hasCircularDependencies(): boolean {
    const visited = new Set<string>()
    const visiting = new Set<string>()

    const hasCycle = (name: string): boolean => {
      if (visiting.has(name)) {
        return true
      }

      if (visited.has(name)) {
        return false
      }

      visiting.add(name)
      const node = this.nodes.get(name)

      if (node) {
        for (const dep of node.registryDependencies) {
          if (!dep.startsWith('http://') && !dep.startsWith('https://')) {
            if (hasCycle(dep)) {
              return true
            }
          }
        }
      }

      visiting.delete(name)
      visited.add(name)
      return false
    }

    for (const name of this.nodes.keys()) {
      if (hasCycle(name)) {
        return true
      }
    }

    return false
  }
}
