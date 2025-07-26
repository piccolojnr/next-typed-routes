# Next Typed Routes

Type-safe route generation and navigation for Next.js App Router.

## Features

- 🔍 **Automatic Route Discovery**: Scans your Next.js App Router structure
- 🎯 **Type-Safe Navigation**: Generate TypeScript types for all your routes
- 🛠️ **Runtime Utilities**: Type-safe route generation and validation
- ⚡ **Zero Configuration**: Works out of the box with Next.js App Router
- 🔄 **Watch Mode**: Automatically regenerate types when files change
- ⚛️ **React Components**: Type-safe Link and router components

## Installation

```bash
npm install next-typed-routes
```

## Quick Start

1. **Generate route types**:
   ```bash
   npx next-typed-routes
   ```

2. **Use in your code**:
   ```typescript
   // Import the generated types from your project
   import type { AppRoute } from "./src/typed-routes";
   import { isValidRoute } from "./src/typed-routes";

   // Import route utilities from the package
   import { route } from "next-typed-routes/route-helper";

   // Type-safe route usage
   const userUrl = route("/user/[id]", { params: { id: "123" } });
   const isValid = isValidRoute("/user/123"); // true
   ```

## Using Types and Route Utilities

### Importing Generated Types

After running `npx next-typed-routes`, import the generated types from your
project:

```typescript
// Import types from the generated .d.ts file
import type { AppRoute } from "./src/typed-routes";

// Import runtime functions from the generated .ts file
import { isValidRoute } from "./src/typed-routes";
```

The `AppRoute` type is a union of all your available routes:

```typescript
type AppRoute =
    | "/"
    | "/about"
    | "/user/[id]"
    | "/user/[id]/posts/[postId]";
// ... all your routes
```

### Using Route Utilities

Import the route utilities from the package:

```typescript
import { route } from "next-typed-routes/route-helper";

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

// Runtime validation (from generated types)
const isValid = isValidRoute("/user/123"); // true
const isInvalid = isValidRoute("/invalid/route"); // false
```

## React Components

### Typed Link Component

Create type-safe Link components for navigation:

```tsx
import Link from "next/link";
import { createTypedLink } from "next-typed-routes/react";

const TypedLink = createTypedLink(Link);

// Static routes
<TypedLink href="/about">About</TypedLink>

// Dynamic routes with parameters
<TypedLink 
    href="/user/[id]" 
    params={{ id: "123" }}
>
    User Profile
</TypedLink>

// Dynamic routes with search parameters
<TypedLink 
    href="/user/[id]/posts/[postId]"
    params={{ id: "123", postId: "abc" }}
    search={{ sort: "asc", filter: "recent" }}
>
    User Post
</TypedLink>
```

### Typed Router Hook

Create type-safe programmatic navigation:

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

## CLI Usage

```bash
# Generate once with defaults
next-typed-routes

# Watch mode for development
next-typed-routes --watch

# Custom pages directory
next-typed-routes --pages-dir app

# Custom output file
next-typed-routes --output src/routes.d.ts

# Add route prefix
next-typed-routes --prefix /api

# Include route groups
next-typed-routes --include-route-groups
```

## Configuration

The generator scans for page files (`page.tsx`, `page.ts`, `page.jsx`,
`page.js`) in your Next.js App Router structure and generates TypeScript
definitions.

### Default Settings

- **Pages Directory**: `src/app`
- **Output File**: `src/typed-routes.d.ts` (types) and `src/typed-routes.ts`
  (runtime)
- **File Extensions**: `page.tsx`, `page.ts`, `page.jsx`, `page.js`
- **Route Groups**: Excluded by default

## Package Structure

```
next-typed-routes/
├── dist/                    # Compiled library files
│   ├── index.js            # Main library
│   ├── route-helper.js     # Route utilities
│   ├── cli.js              # CLI tool
│   └── react.js            # React components
├── src/
│   ├── typed-routes.d.ts   # Generated route types
│   └── typed-routes.ts     # Generated runtime functions
└── package.json
```

### Import Paths

- **Main Library**: `next-typed-routes`
- **Route Types**: Import from your generated `src/typed-routes.d.ts`
- **Runtime Functions**: Import from your generated `src/typed-routes.ts`
- **Route Utilities**: `next-typed-routes/route-helper`
- **React Components**: `next-typed-routes/react`
- **CLI Tool**: `next-typed-routes/cli`

## Examples

See the `examples/` directory for complete usage examples.

## License

MIT
