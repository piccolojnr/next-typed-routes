/**
 * Next Typed Routes - Type-safe route generation for Next.js App Router
 * 
 * This library provides tools to generate TypeScript definitions for Next.js routes
 * and offers type-safe navigation components.
 */

// Core types
export type {
    Options,
    ParamRecord,
    RouteGenerator,
    RouteScanner,
    TypeGenerator,
} from "./types";

export type { AppRoute } from "./typed-routes";

// Route helper functions
export { route } from "./route-helper";

// Configuration
export {
    resolveConfig,
    getDefaultPagesDir,
    getDefaultOutputPath,
    DEFAULT_CONFIG,
} from "./config";

// Core functionality
export {
    createRouteGenerator,
    generateRoutes,
    NextRouteGenerator,
} from "./generator-core";

// Utilities
export {
    isPageFile,
    isRouteGroup,
    pathToRoute,
    validateDirectory,
    ensureDirectory,
} from "./utils";

// Scanner
export {
    createRouteScanner,
    NextRouteScanner,
} from "./scanner";

// Generator
export {
    createTypeGenerator,
    NextTypeGenerator,
} from "./generator";

// Watcher
export {
    createFileWatcher,
    FileWatcher,
} from "./watcher";

// CLI
export { cli } from "./cli";

// React components (re-export from react module)
export {
    createTypedLink,
    createTypedRouter,
    useTypedRouter
} from "./react";
