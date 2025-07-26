# Next Typed Routes - Library Structure

This document outlines the complete structure and architecture of the
`next-typed-routes` library.

## 📁 Directory Structure

```
next-typed-routes/
├── src/                          # Source code
│   ├── index.ts                  # Main exports
│   ├── cli.ts                    # Command-line interface
│   ├── react.ts                  # React components
│   ├── types.ts                  # Type definitions
│   ├── config.ts                 # Configuration utilities
│   ├── utils.ts                  # Utility functions
│   ├── scanner.ts                # Route discovery
│   ├── generator.ts              # Type generation
│   ├── watcher.ts                # File watching
│   └── generator-core.ts         # Main orchestrator
├── examples/                     # Usage examples
│   ├── basic-usage.ts           # Programmatic usage
│   └── react-usage.tsx          # React components
├── dist/                         # Build output (generated)
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript configuration
├── tsup.config.ts               # Build configuration
├── README.md                     # Documentation
├── LICENSE                       # MIT License
├── .gitignore                    # Git ignore rules
└── LIBRARY_STRUCTURE.md          # This file
```

## 🏗️ Architecture Overview

### Core Modules

#### 1. **Types** (`src/types.ts`)

- Defines all TypeScript interfaces and types
- `Options` - Configuration options
- `AppRoute` - Route type union
- `ParamRecord<T>` - Dynamic route parameters
- `RouteGenerator`, `RouteScanner`, `TypeGenerator` - Core interfaces

#### 2. **Configuration** (`src/config.ts`)

- Default configuration constants
- Configuration resolution utilities
- Path resolution helpers

#### 3. **Utilities** (`src/utils.ts`)

- File system utilities
- Route processing helpers
- Validation functions

#### 4. **Scanner** (`src/scanner.ts`)

- `NextRouteScanner` class
- Recursive directory traversal
- Route discovery logic
- Route group handling

#### 5. **Generator** (`src/generator.ts`)

- `NextTypeGenerator` class
- TypeScript type generation
- Template literal construction
- File writing utilities

#### 6. **Watcher** (`src/watcher.ts`)

- `FileWatcher` class
- Chokidar integration
- Development mode file watching
- Graceful shutdown handling

#### 7. **Generator Core** (`src/generator-core.ts`)

- `NextRouteGenerator` class
- Main orchestrator
- Configuration management
- Process coordination

### Entry Points

#### 1. **Main Library** (`src/index.ts`)

- Exports all public APIs
- Type re-exports
- Convenience functions

#### 2. **CLI** (`src/cli.ts`)

- Command-line interface
- Argument parsing
- Help documentation
- Process execution

#### 3. **React Components** (`src/react.ts`)

- Type-safe Link component
- Type-safe Button component
- Router hook wrapper
- Factory functions for Next.js integration

## 🔧 Build Configuration

### Package.json Features

- **Multiple entry points**: Main library, CLI, React components
- **Dual format support**: CommonJS and ES modules
- **TypeScript declarations**: Automatic .d.ts generation
- **CLI binary**: `next-typed-routes` command
- **Peer dependencies**: Next.js and React

### Tsup Configuration

- **Multiple formats**: CJS and ESM
- **Type declarations**: Automatic generation
- **Source maps**: For debugging
- **Tree shaking**: Optimized bundles
- **External dependencies**: Next.js and React

## 📦 Distribution

### Exports

```json
{
    "exports": {
        ".": {
            "import": "./dist/index.mjs",
            "require": "./dist/index.js",
            "types": "./dist/index.d.ts"
        },
        "./cli": {
            "import": "./dist/cli.mjs",
            "require": "./dist/cli.js",
            "types": "./dist/cli.d.ts"
        },
        "./react": {
            "import": "./dist/react.mjs",
            "require": "./dist/react.js",
            "types": "./dist/react.d.ts"
        }
    }
}
```

### Binary

```json
{
    "bin": {
        "next-typed-routes": "./dist/cli.js"
    }
}
```

## 🚀 Usage Patterns

### 1. **CLI Usage**

```bash
# Basic generation
next-typed-routes

# Watch mode
next-typed-routes --watch

# Custom configuration
next-typed-routes --pages-dir app --output types/routes.d.ts
```

### 2. **Programmatic Usage**

```typescript
import { generateRoutes } from "next-typed-routes";

generateRoutes({
    pagesDir: "src/app",
    outputPath: "types/routes.d.ts",
    watch: true,
});
```

### 3. **React Integration**

```typescript
import { createTypedLink, createTypedRouter } from "next-typed-routes/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TypedLink = createTypedLink(Link);
const useTypedRouter = createTypedRouter(useRouter);
```

## 🔄 Development Workflow

### 1. **Development**

```bash
npm run dev          # Watch mode for development
npm run type-check   # TypeScript checking
npm run lint         # ESLint checking
```

### 2. **Building**

```bash
npm run build        # Build for production
npm run clean        # Clean build artifacts
```

### 3. **Testing**

```bash
npm test             # Run tests
npm run test:watch   # Watch mode tests
```

### 4. **Publishing**

```bash
npm run prepublishOnly  # Build before publish
npm publish            # Publish to npm
```

## 🎯 Key Features

### Type Safety

- Compile-time route validation
- Parameter type checking
- Autocomplete support
- IntelliSense integration

### Flexibility

- Custom configuration options
- Multiple output formats
- Route group support
- Dynamic segment handling

### Developer Experience

- Watch mode for development
- Comprehensive CLI
- Clear error messages
- Extensive documentation

### Integration

- Next.js App Router support
- React component integration
- Build tool compatibility
- CI/CD friendly

## 🔮 Future Enhancements

### Planned Features

- [ ] Plugin system for custom route processing
- [ ] Support for other frameworks (Nuxt, Remix)
- [ ] Advanced route validation rules
- [ ] Performance optimizations
- [ ] Testing framework integration

### Potential Improvements

- [ ] Webpack/Vite plugin
- [ ] VS Code extension
- [ ] Route analytics
- [ ] Migration tools
- [ ] Performance monitoring

## 📚 Documentation

- **README.md**: Comprehensive usage guide
- **Examples/**: Code examples and demos
- **API Reference**: Complete API documentation
- **Migration Guide**: Upgrade instructions
- **Contributing**: Development guidelines

This library provides a complete solution for type-safe route generation in
Next.js applications, with a focus on developer experience, flexibility, and
maintainability.
