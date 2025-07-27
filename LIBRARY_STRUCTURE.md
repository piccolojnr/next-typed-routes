# Next Typed Routes - Library Structure

This document outlines the complete structure and architecture of the
`@piccolojnr/next-typed-routes` library.

## 📁 Directory Structure

```
next-typed-routes/
├── src/                          # Source code
│   ├── index.ts                  # Main exports
│   ├── cli.ts                    # Command-line interface
│   ├── types.ts                  # Type definitions
│   ├── config.ts                 # Configuration utilities
│   ├── utils.ts                  # Utility functions
│   ├── scanner.ts                # Route discovery
│   ├── generator.ts              # Type generation
│   ├── watcher.ts                # File watching
│   ├── generator-core.ts         # Main orchestrator
│   └── shared/                   # Shared utilities
│       ├── route.ts              # Route utilities
│       ├── react.tsx             # React components
│       └── generated/            # Generated files (development)
│           └── routes.ts         # Sample generated routes
├── examples/                     # Usage examples
│   ├── usage-example.ts         # Programmatic usage
│   └── react-usage.tsx          # React components
├── typed-routes/                 # Generated output (clean structure)
│   ├── generated/
│   │   └── routes.ts            # Generated types and constants
│   ├── route.ts                 # Route utilities and types
│   └── react.tsx                # React components
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

#### 8. **Shared Utilities** (`src/shared/`)

- **Route Utilities** (`route.ts`) - Core route generation and validation
- **React Components** (`react.tsx`) - Type-safe React wrappers
- **Generated Routes** (`generated/routes.ts`) - Sample generated output

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

#### 3. **Generated Output** (`typed-routes/`)

- **Generated Routes** (`generated/routes.ts`) - Type definitions and constants
- **Route Utilities** (`route.ts`) - Route generation and validation functions
- **React Components** (`react.tsx`) - Type-safe React component factories

## 🔧 Build Configuration

### Package.json Features

- **Multiple entry points**: Main library, CLI
- **Dual format support**: CommonJS and ES modules
- **TypeScript declarations**: Automatic .d.ts generation
- **CLI binary**: `@piccolojnr/next-typed-routes` command
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
        }
    }
}
```

### Binary

```json
{
    "bin": {
        "@piccolojnr/next-typed-routes": "./dist/cli.js"
    }
}
```

## 🚀 Usage Patterns

### 1. **CLI Usage**

```bash
# Basic generation
@piccolojnr/next-typed-routes

# Watch mode
@piccolojnr/next-typed-routes --watch

# Custom configuration
@piccolojnr/next-typed-routes --pages-dir app --output types/routes.d.ts
```

### 2. **Programmatic Usage**

```typescript
import { generateRoutes } from "@piccolojnr/next-typed-routes";

generateRoutes({
    pagesDir: "src/app",
    outputPath: "typed-routes/generated/routes.ts",
    watch: true,
});
```

### 3. **Generated Output Usage**

```typescript
// Import from generated files
import { AppRoute, isValidRoute, route } from "@/typed-routes";
import { createTypedLink, createTypedRouter } from "@/typed-routes/react";

// Use route utilities
const userUrl = route("/user/[id]", { params: { id: "123" } });

// Use React components
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

### Clean Architecture

- **No src/ pollution**: Generated files in dedicated directory
- **Modular structure**: Separate files for different concerns
- **Version control friendly**: Easy to manage generated files
- **Tree-shakeable**: Import only what you need

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
