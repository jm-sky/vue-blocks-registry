import fs from 'fs-extra'
import path from 'path'

export interface InjectRoutesOptions {
  projectRoot: string
  routesFileRelative?: string // default: src/router/routes.ts
  routerIndexRelative?: string // default: src/router/index.ts
  importLines?: string[]
  spreadLines?: string[]
  guardBlock?: string
}

const ROUTES_IMPORT_ANCHOR = '// @vbr-insert-routes:imports'
const ROUTES_SPREAD_ANCHOR = '// @vbr-insert-routes:spread'
const ROUTER_GUARDS_ANCHOR = '// @vbr-insert-guards'

export async function injectRoutesAndGuards(options: InjectRoutesOptions): Promise<void> {
  const routesPath = path.join(options.projectRoot, options.routesFileRelative ?? 'src/router/routes.ts')
  const routerIndexPath = path.join(options.projectRoot, options.routerIndexRelative ?? 'src/router/index.ts')

  const importLines = (options.importLines ?? []).filter(Boolean)
  const spreadLines = (options.spreadLines ?? []).filter(Boolean)
  const guardBlock = options.guardBlock?.trim()

  // Inject into routes.ts
  if (await fs.pathExists(routesPath)) {
    let content = await fs.readFile(routesPath, 'utf-8')

    if (importLines.length > 0 && content.includes(ROUTES_IMPORT_ANCHOR)) {
      content = content.replace(
        ROUTES_IMPORT_ANCHOR,
        `${ROUTES_IMPORT_ANCHOR}\n${importLines.join('\n')}`,
      )
    }

    if (spreadLines.length > 0 && content.includes(ROUTES_SPREAD_ANCHOR)) {
      content = content.replace(
        ROUTES_SPREAD_ANCHOR,
        `${ROUTES_SPREAD_ANCHOR}\n  ${spreadLines.join('\n  ')}`,
      )
    }

    await fs.writeFile(routesPath, content, 'utf-8')
  }

  // Inject into router/index.ts
  if (guardBlock && (await fs.pathExists(routerIndexPath))) {
    let content = await fs.readFile(routerIndexPath, 'utf-8')

    if (content.includes(ROUTER_GUARDS_ANCHOR) && !content.includes(guardBlock)) {
      content = content.replace(
        ROUTER_GUARDS_ANCHOR,
        `${ROUTER_GUARDS_ANCHOR}\n${guardBlock}\n`,
      )

      await fs.writeFile(routerIndexPath, content, 'utf-8')
    }
  }
}

