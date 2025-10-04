# @brickly/tsconfig

Shared TypeScript configuration for the Brickly project.

## Configurations

- `base.json` - Base TypeScript configuration with common settings
- `nextjs.json` - Configuration for Next.js applications (extends base.json)
- `node.json` - Configuration for Node.js applications (extends base.json)

## Usage

### Next.js App
```json
{
  "extends": "@brickly/tsconfig/nextjs.json"
}
```

### Node.js App
```json
{
  "extends": "@brickly/tsconfig/node.json"
}
```

### Base Configuration
```json
{
  "extends": "@brickly/tsconfig/base.json"
}
```
