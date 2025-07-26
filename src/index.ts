/**
 * next-typed-routes - Type-safe route generation for Next.js App Router
 * 
 * Main entry point for the library
 */

// Core generation functionality
export {
    createRouteGenerator,
    generateRoutes,
} from "./generator-core";

// Type generator
export {
    createTypeGenerator,
} from "./generator";

// Route scanner
export {
    createRouteScanner,
} from "./scanner";

// File watcher
export {
    createFileWatcher,
} from "./watcher";

// Configuration utilities
export {
    resolveConfig,
    getDefaultPagesDir,
    getDefaultOutputDir,
    getDefaultGeneratedDir,
} from "./config";

// Core types
export type {
    Options,
    RouteGenerator,
    TypeGenerator,
    RouteScanner,
    FileWatcher,
    ExtractParams,
    ParamRecord,
    RoutesWithParams,
    RoutesWithoutParams,
    SearchParams,
} from "./types";

// React components (re-export from react module)
export {
    createTypedLink,
    createTypedRouter,
    useTypedRouter
} from "./react";

// Route utility function - core functionality that stays in the library
import type { ExtractParams, ParamRecord, SearchParams } from "./types";

/**
 * Generate a URL from a route template with optional parameters and search params
 * @param template - The route template (e.g., "/user/[id]")
 * @param options - Optional parameters and search params
 * @returns The generated URL string
 */
export function route<T extends string>(
    template: T,
    options?: {
        params?: ParamRecord<T>;
        search?: SearchParams;
    }
): string {
    // Replace each [key] with its value
    let result: string = template;
    for (const key in options?.params || {}) {
        const typedKey = key as ExtractParams<T>;
        result = result.replace(
            new RegExp(`\\[${typedKey}\\]`, "g"),
            options!.params![typedKey]
        );
    }
    
    if (options?.search) {
        const query = new URLSearchParams();
        for (const key in options.search) {
            const value = options.search[key];
            if (value !== undefined) {
                query.set(key, String(value));
            }
        }

        const queryString = query.toString();
        if (queryString) {
            result += `?${queryString}`;
        }
    }

    return result;
}
