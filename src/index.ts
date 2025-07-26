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
} from "./types";

// Route utilities
export {
    route,
    isValidRoute,
    getAllRoutes
} from "./typed-routes/route";

// Route types
export type {
    ExtractParams,
    ParamRecord,
    RoutesWithParams,
    RoutesWithoutParams,
    SearchParams
} from "./typed-routes/route";

// React components (re-export from react module)
export {
    createTypedLink,
    createTypedRouter,
    useTypedRouter
} from "./typed-routes/react";


