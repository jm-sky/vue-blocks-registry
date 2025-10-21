# Versioning and Release Workflow

This document describes the versioning and release process for vue-blocks-registry.

## Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): New functionality in a backward-compatible manner
- **PATCH** version (0.0.X): Backward-compatible bug fixes

## Release Process

### 1. Make Your Changes

Develop your feature, fix, or enhancement on a feature branch.

### 2. Update CHANGELOG.md

Before bumping the version, update `CHANGELOG.md`:

1. Move items from `[Unreleased]` section to a new version section
2. Add the version number and date
3. Organize changes under these categories:
   - **Added**: New features
   - **Changed**: Changes in existing functionality
   - **Deprecated**: Soon-to-be removed features
   - **Removed**: Removed features
   - **Fixed**: Bug fixes
   - **Security**: Security improvements

Example:
```markdown
## [Unreleased]

## [0.1.3] - 2025-10-21

### Added
- New component for user avatars

### Fixed
- CLI dependency resolution issue
```

### 3. Bump the Version

Run one of these commands based on the type of change:

```bash
# For bug fixes and minor changes (0.0.X)
pnpm run version:patch

# For new features (0.X.0)
pnpm run version:minor

# For breaking changes (X.0.0)
pnpm run version:major
```

This will update the version in `package.json` **without creating a git tag**.

### 4. Commit Changes

```bash
git add package.json CHANGELOG.md pnpm-lock.yaml
git commit -m "chore: Release v0.1.3"
```

### 5. Create a Git Tag

```bash
git tag v0.1.3
```

### 6. Push Changes

```bash
git push origin develop
git push origin v0.1.3
```

### 7. Publish to NPM

The `prepublishOnly` script will automatically:
- Build the CLI
- Run type checking
- Run linting

Then publish:

```bash
npm publish
```

Or for a dry run to see what will be published:

```bash
npm publish --dry-run
```

## Pre-publish Checklist

Before publishing, ensure:

- [ ] CHANGELOG.md is updated with all changes
- [ ] Version number follows semantic versioning
- [ ] All tests pass (`pnpm test:unit`)
- [ ] Type checking passes (`pnpm run type-check`)
- [ ] Linting passes (`pnpm run lint`)
- [ ] CLI builds successfully (`pnpm run build:cli`)
- [ ] CLI works locally (`node cli/dist/index.js --help`)
- [ ] Changes are committed
- [ ] Git tag is created
- [ ] Changes are pushed to remote

## Quick Reference

```bash
# Complete release workflow for a patch version
pnpm run version:patch              # Bump version
git add package.json CHANGELOG.md   # Stage changes
git commit -m "chore: Release vX.X.X"
git tag vX.X.X                      # Create tag
git push origin develop             # Push commits
git push origin vX.X.X              # Push tag
npm publish                         # Publish to NPM
```

## Testing Before Publishing

Always test the CLI locally before publishing:

```bash
# Build the CLI
pnpm run build:cli

# Test it works
node cli/dist/index.js --version
node cli/dist/index.js --help

# Test in another project (optional but recommended)
cd /path/to/test/project
npx /path/to/vue-blocks-registry init
```

## Rollback

If you need to rollback a version:

```bash
# Unpublish from NPM (only works within 72 hours)
npm unpublish vue-blocks-registry@X.X.X

# Delete the git tag
git tag -d vX.X.X
git push origin :refs/tags/vX.X.X

# Revert the version commit
git revert <commit-hash>
```

**Note**: NPM unpublish is discouraged and may not always work. It's better to publish a new patch version with fixes.
