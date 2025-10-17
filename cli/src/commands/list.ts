import { Command } from 'commander'
import ora from 'ora'
import { logger } from '../utils/logger'
import { fetchRegistry } from '../utils/registry'

export const list = new Command()
  .name('list')
  .description('List all available components')
  .option('-c, --category <category>', 'Filter by category')
  .action(async (options) => {
    try {
      const spinner = ora('Fetching registry...').start()

      const registry = await fetchRegistry()

      if (!registry?.items) {
        spinner.fail('Failed to fetch registry')
        return
      }

      spinner.succeed('Registry loaded')

      let items = registry.items

      // Filter by category if specified
      if (options.category) {
        items = items.filter(item =>
          item.categories?.includes(options.category)
        )
      }

      // Group by type
      const grouped = new Map<string, typeof items>()
      for (const item of items) {
        const type = item.type.replace('registry:', '')
        if (!grouped.has(type)) {
          grouped.set(type, [])
        }
        grouped.get(type)!.push(item)
      }

      logger.break()
      logger.info('Available components:\n')

      // Display grouped items
      for (const [type, typeItems] of grouped.entries()) {
        logger.info(`📦 ${type.toUpperCase()}`)
        for (const item of typeItems) {
          const categories = item.categories ? ` (${item.categories.join(', ')})` : ''
          logger.success(`  • ${item.name}${categories}`)
          if (item.description) {
            logger.info(`    ${item.description}`)
          }
        }
        logger.break()
      }

      logger.info(`Total: ${items.length} items`)
    }
    catch (error) {
      logger.error('Error:', error instanceof Error ? error.message : 'Unknown error')
      process.exit(1)
    }
  })
