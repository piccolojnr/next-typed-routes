# Next Typed Routes

Type-safe route generation and navigation for Next.js App Router with a clean, non-polluting approach.

## ✨ Features

- 🔍 **Automatic Route Discovery**: Scans your Next.js App Router structure
- 🎯 **Type-Safe Navigation**: Generate TypeScript types for all your routes
- 🛠️ **Runtime Utilities**: Type-safe route generation and validation
- ⚡ **Zero Configuration**: Works out of the box with Next.js App Router
- 🔄 **Watch Mode**: Automatically regenerate types when files change
- ⚛️ **React Components**: Type-safe Link and router components
- 🧹 **Clean Output**: No pollution of your `src/` directory

## 📦 Installation

```bash
npm install next-typed-routes
```

## 🚀 Quick Start

1. **Generate route types**:
   ```bash
   npx next-typed-routes
   ```

2. **Use in your code**:
   ```typescript
   // Import everything from the clean barrel file
   import { route, isValidRoute, AppRoute, allRoutes } from "@/typed-routes";
   
   // Type-safe route usage
   const userUrl = route("/user/[id]", { params: { id: "123" } });
   const isValid = isValidRoute("/user/123"); // true
   ```

## 📁 Clean Directory Structure

The generator creates a clean, organized structure in your project:

```
your-project/
├── typed-routes/                    # Clean, dedicated directory
│   ├── generated/
│   │   └── routes.ts               # Generated types and constants
│   └── index.ts                    # Barrel file with all utilities
├── src/
│   └── app/                        # Your Next.js pages (untouched!)
└── package.json
```

### 🎯 Key Benefits

- ✅ **No `src/` pollution**: Generated files stay in their own directory
- ✅ **Version control friendly**: Easy to `.gitignore` or commit as needed
- ✅ **Tree-shakeable**: Import only what you need
- ✅ **Type-safe**: Full TypeScript support throughout

## 📖 Usage Guide

### Basic Route Generation

```typescript
import { route, isValidRoute, AppRoute } from "@/typed-routes";

// Static routes
const aboutUrl = route("/about"); // "/about"

// Dynamic routes with parameters
const userUrl = route("/user/[id]", {
    params: { id: "42" },
    search: { sort: "asc" },
}); // "/user/42?sort=asc"

// Nested dynamic routes
const postUrl = route("/user/[id]/posts/[postId]", {
    params: { id: "42", postId: "abc" },
}); // "/user/42/posts/abc"

// Runtime validation
const isValid = isValidRoute("/user/123"); // true
const isInvalid = isValidRoute("/invalid/route"); // false
```

### Working with All Routes

```typescript
import { allRoutes, getAllRoutes } from "@/typed-routes";

// Get all routes as a constant
console.log(allRoutes); // readonly array of all routes

// Get all routes as a function
const routes = getAllRoutes();
routes.forEach(route => console.log(route));
```

### Type-Safe Route Usage

```typescript
import type { AppRoute, TypedRoute } from "@/typed-routes";

// Use AppRoute type for type safety
const validRoutes: AppRoute[] = [
    "/",
    "/about",
    "/user/[id]",
    "/user/[id]/posts/[postId]"
];

// TypedRoute is an alias for AppRoute
const route: TypedRoute = "/user/[id]";
```

## ⚛️ React Components

### Typed Link Component

```tsx
import Link from "next/link";
import { createTypedLink } from "next-typed-routes/react";

const TypedLink = createTypedLink(Link);

function Navigation() {
  return (
    <nav>
      {/* Static routes */}
      <TypedLink href="/about">About</TypedLink>

      {/* Dynamic routes with parameters */}
      <TypedLink 
        href="/user/[id]" 
        params={{ id: "123" }}
      >
        User Profile
      </TypedLink>

      {/* Dynamic routes with search parameters */}
      <TypedLink 
        href="/user/[id]/posts/[postId]"
        params={{ id: "123", postId: "abc" }}
        search={{ sort: "asc", filter: "recent" }}
      >
        User Post
      </TypedLink>
    </nav>
  );
}
```

### Typed Router Hook

```tsx
import { useRouter } from "next/navigation";
import { createTypedRouter } from "next-typed-routes/react";

const useTypedRouter = createTypedRouter(useRouter);

function MyComponent() {
  const router = useTypedRouter();

  const handleNavigation = () => {
    // Static route navigation
    router.push("/about");

    // Dynamic route navigation
    router.push("/user/[id]", { params: { id: "123" } });

    // Dynamic route with search params
    router.push("/user/[id]/posts/[postId]", {
      params: { id: "123", postId: "abc" },
      search: { sort: "desc" },
    });

    // Replace current route
    router.replace("/user/[id]", { params: { id: "456" } });

    // Prefetch route
    router.prefetch("/user/[id]", { params: { id: "123" } });
  };

  return <button onClick={handleNavigation}>Navigate</button>;
}
```

## 🛠️ CLI Usage

```bash
# Generate once with defaults
npx next-typed-routes

# Watch mode for development
npx next-typed-routes --watch

# Custom pages directory
npx next-typed-routes --pages-dir app

# Custom output location
npx next-typed-routes --output custom/routes.ts

# Add route prefix
npx next-typed-routes --prefix /api

# Include route groups
npx next-typed-routes --include-route-groups
```

### CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--watch` | `-w` | Watch for file changes and regenerate automatically | `false` |
| `--pages-dir` | `-p` | Custom pages directory path | `src/app` |
| `--output` | `-o` | Custom output file path | `typed-routes/generated/routes.ts` |
| `--prefix` | | Custom route prefix | `""` |
| `--include-route-groups` | | Include route groups in the output | `false` |
| `--help` | `-h` | Show help message | |

## ⚙️ Configuration

The generator automatically detects your Next.js App Router structure and generates TypeScript definitions.

### Default Settings

- **Pages Directory**: `src/app`
- **Output Directory**: `typed-routes/`
- **Generated File**: `typed-routes/generated/routes.ts`
- **Barrel File**: `typed-routes/index.ts`
- **File Extensions**: `page.tsx`, `page.ts`, `page.jsx`, `page.js`
- **Route Groups**: Excluded by default

### File Structure Detection

The generator scans for page files following Next.js App Router conventions:

```
src/app/
├── page.tsx                    → "/"
├── about/
│   └── page.tsx               → "/about"
├── user/
│   └── [id]/
│       ├── page.tsx           → "/user/[id]"
│       └── posts/
│           └── [postId]/
│               └── page.tsx   → "/user/[id]/posts/[postId]"
└── (marketing)/               # Route groups (excluded by default)
    └── pricing/
        └── page.tsx           → "/pricing"
```

## 📚 Generated Files

### `typed-routes/generated/routes.ts`

Contains the core types and constants:

```typescript
// Generated route types
export type AppRoute =
  | "/"
  | "/about"
  | "/user/[id]"
  | "/user/[id]/posts/[postId]";

// All routes as a constant array
export const allRoutes: readonly AppRoute[] = [
  "/",
  "/about", 
  "/user/[id]",
  "/user/[id]/posts/[postId]"
] as const;

// Type alias for better DX
export type TypedRoute = AppRoute;
```

### `typed-routes/index.ts`

The main barrel file that re-exports everything:

```typescript
// Re-export types and constants
export type { AppRoute, TypedRoute } from "./generated/routes";
export { allRoutes } from "./generated/routes";

// Re-export utilities from the library
export { route } from "next-typed-routes";

// Runtime validation and helper functions
export function isValidRoute(path: string): boolean { /* ... */ }
export function getAllRoutes(): readonly string[] { /* ... */ }
```

## 🎯 Version Control

You have two options for version control:

### Option 1: Commit Generated Files (Recommended)

```gitignore
# Don't ignore typed-routes - commit them for team consistency
# typed-routes/
```

**Benefits:**
- Team members get consistent types without running generation
- CI/CD doesn't need to run generation step
- Easier debugging and code reviews

### Option 2: Ignore Generated Files

```gitignore
# Ignore generated files
typed-routes/
```

**Benefits:**
- Smaller repository size
- Forces developers to run generation locally
- No merge conflicts in generated files

**Requirements:**
- Add generation to your build process
- Ensure all team members run generation locally

## 🔧 Integration Examples

### Next.js Project Setup

1. **Install and generate**:
   ```bash
   npm install next-typed-routes
   npx next-typed-routes
   ```

2. **Add to package.json scripts**:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next-typed-routes && next build",
       "routes": "next-typed-routes",
       "routes:watch": "next-typed-routes --watch"
     }
   }
   ```

3. **TypeScript path mapping** (optional):
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@/typed-routes": ["./typed-routes"]
       }
     }
   }
   ```

### Development Workflow

```bash
# Start development with route watching
npm run routes:watch &
npm run dev

# Or generate once
npm run routes
npm run dev
```

## 📋 Examples

See the `examples/` directory for complete usage examples:

- `examples/usage-example.ts` - Basic usage patterns
- `examples/react-usage.tsx` - React component examples

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

**Next Typed Routes** - Clean, type-safe routing for Next.js App Router 🚀
