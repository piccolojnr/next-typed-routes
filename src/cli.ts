#!/usr/bin/env node

import { generateRoutes } from "./generator-core";

/**
 * Parse command line arguments
 */
function parseArgs(): {
    watch: boolean;
    help: boolean;
    pagesDir?: string;
    outputPath?: string;
    routePrefix?: string;
    includeRouteGroups: boolean;
} {
    const args = process.argv.slice(2);

    return {
        watch: args.includes("--watch") || args.includes("-w"),
        help: args.includes("--help") || args.includes("-h"),
        pagesDir: getArgValue("--pages-dir") || getArgValue("-p"),
        // outputPath: getArgValue("--output") || getArgValue("-o"),
        routePrefix: getArgValue("--prefix"),
        includeRouteGroups: args.includes("--include-route-groups"),
    };
}

/**
 * Get value for a command line argument
 */
function getArgValue(flag: string): string | undefined {
    const args = process.argv.slice(2);
    const index = args.indexOf(flag);
    if (index !== -1 && index + 1 < args.length) {
        return args[index + 1];
    }
    return undefined;
}

/**
 * Display help information
 */
function showHelp(): void {
    console.log(`
🚀 Next Typed Routes - Type-safe route generation for Next.js App Router

USAGE:
  next-typed-routes [OPTIONS]

OPTIONS:
  --watch, -w                    Watch for file changes and regenerate automatically
  --pages-dir, -p <path>         Custom pages directory path (default: src/app)
  --output, -o <path>            Custom output file path (default: typed-routes/generated/routes.ts)
  --prefix <prefix>              Custom route prefix
  --include-route-groups         Include route groups in the output
  --help, -h                     Show this help message

EXAMPLES:
  next-typed-routes                    # Generate once with defaults
  next-typed-routes --watch            # Watch mode
  next-typed-routes -p app -o custom/routes.ts  # Custom paths
  next-typed-routes --prefix /api      # Add route prefix

CONFIGURATION:
  The generator scans for page files (page.tsx, page.ts, page.jsx, page.js)
  in your Next.js App Router structure and generates TypeScript definitions
  for type-safe navigation.

OUTPUT:
  Creates a clean typed-routes/ directory with:
  - typed-routes/generated/routes.ts    # Type definitions and constants
  - typed-routes/index.ts               # Barrel file with utilities

USAGE IN YOUR CODE:
  import { route, isValidRoute, AppRoute } from "@/typed-routes";

For more information, visit: https://github.com/piccolojnr/next-typed-routes
    `.trim());
}

/**
 * Display startup information
 */
function showStartupInfo(options: ReturnType<typeof parseArgs>): void {
    console.log('🚀 Starting Next Typed Routes Generator');
    console.log(`📁 Pages directory: ${options.pagesDir || 'src/app'}`);
    console.log(`📄 Output directory: typed-routes/`);
    console.log(`⚙️  Mode: ${options.watch ? 'Watch (continuous)' : 'Generate once'}`);
    if (options.routePrefix) {
        console.log(`🔗 Route prefix: ${options.routePrefix}`);
    }
    if (options.includeRouteGroups) {
        console.log(`📂 Including route groups`);
    }
    console.log('─'.repeat(50));
}

/**
 * CLI entry point
 */
function main(): void {
    const args = parseArgs();

    if (args.help) {
        showHelp();
        process.exit(0);
    }

    showStartupInfo(args);

    try {
        generateRoutes({
            watch: args.watch,
            pagesDir: args.pagesDir,
            routePrefix: args.routePrefix,
            includeRouteGroups: args.includeRouteGroups,
        });
    } catch (error) {
        console.error('❌ Failed to generate routes:', error);
        process.exit(1);
    }
}

// Run CLI if this file is executed directly
if (require.main === module) {
    main();
}

export { main as cli }; 