import path from "path";
import type { Options } from "./types";

/**
 * Default configuration for the route generator
 */
export const DEFAULT_CONFIG = {
    /** Default page file extensions */
    PAGE_EXTENSIONS: ["page.tsx", "page.ts", "page.jsx", "page.js"] as const,
    /** Default pages directory */
    DEFAULT_PAGES_DIR: "src/app",
    /** Default output directory */
    DEFAULT_OUTPUT_DIR: "typed-routes",
    /** Default generated directory */
    DEFAULT_GENERATED_DIR: "typed-routes/generated",
    /** Default route prefix */
    DEFAULT_ROUTE_PREFIX: "",
    /** Whether to include route groups by default */
    DEFAULT_INCLUDE_ROUTE_GROUPS: false,
} as const;

/**
 * Resolve configuration with defaults
 */
export function resolveConfig(options: Options = {}): Required<Options> {
    const cwd = process.cwd();

    return {
        watch: options.watch ?? false,
        pagesDir: options.pagesDir
            ? path.resolve(cwd, options.pagesDir)
            : path.resolve(cwd, DEFAULT_CONFIG.DEFAULT_PAGES_DIR),
        outputPath: options.outputPath
            ? path.resolve(cwd, options.outputPath)
            : path.resolve(cwd, DEFAULT_CONFIG.DEFAULT_GENERATED_DIR, "routes.ts"),
        routePrefix: options.routePrefix ?? DEFAULT_CONFIG.DEFAULT_ROUTE_PREFIX,
        includeRouteGroups: options.includeRouteGroups ?? DEFAULT_CONFIG.DEFAULT_INCLUDE_ROUTE_GROUPS,
        extensions: options.extensions ?? DEFAULT_CONFIG.PAGE_EXTENSIONS,
    };
}

/**
 * Get the default pages directory path
 */
export function getDefaultPagesDir(): string {
    return path.resolve(process.cwd(), DEFAULT_CONFIG.DEFAULT_PAGES_DIR);
}

/**
 * Get the default output directory path
 */
export function getDefaultOutputDir(): string {
    return path.resolve(process.cwd(), DEFAULT_CONFIG.DEFAULT_OUTPUT_DIR);
}

/**
 * Get the default generated directory path
 */
export function getDefaultGeneratedDir(): string {
    return path.resolve(process.cwd(), DEFAULT_CONFIG.DEFAULT_GENERATED_DIR);
} 