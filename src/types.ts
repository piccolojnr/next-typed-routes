/**
 * Core types for next-typed-routes library
 */

export type Options = {
    /** Enable watch mode for automatic regeneration on file changes */
    watch?: boolean;
    /** Custom pages directory path */
    pagesDir?: string;
    /** Custom output file path */
    outputPath?: string;
    /** Custom route prefix */
    routePrefix?: string;
    /** Whether to include route groups in the output */
    includeRouteGroups?: boolean;
    /** Custom file extensions to scan */
    extensions?: readonly string[];
};

export type PageExtensions = readonly ["page.tsx", "page.ts", "page.jsx", "page.js"];

// STEP 2: Extract all param-names (e.g. "id", "postId") from a template string
export type ExtractParams<T extends string> =
  T extends `${string}[${infer Param}]${infer Rest}`
  ? Param | ExtractParams<Rest>
  : never;

// STEP 3: Build either an object of `{ [key in ExtractParams<T>]: string }`
//         or `undefined` if there are no params
export type ParamRecord<T extends string> =
  [ExtractParams<T>] extends [never]
  ? undefined
  : { [K in ExtractParams<T>]: string };

type SearchParams = Record<string, string | number | boolean | undefined>;

// All routes that contain at least one [param]
export type RoutesWithParams =
  Extract<string, `${string}[${string}]${string}`>;

// All routes that do NOT contain any [param]
export type RoutesWithoutParams = Exclude<string, RoutesWithParams>;

export type { SearchParams };

/**
 * Interface for route generators
 */
export interface RouteGenerator {
    scanRoutes(baseDir?: string): string[];
    generateTypes(routes: string[], outputPath?: string): void;
    run(options?: Options): void;
    getConfig(): Required<Options>;
    updateConfig(options: Partial<Options>): void;
}

/**
 * Interface for type generators
 */
export interface TypeGenerator {
    generateTypes(routes: string[], outputPath: string): void;
}

/**
 * Interface for route scanners
 */
export interface RouteScanner {
    scanRoutes(baseDir: string): string[];
}

/**
 * Interface for file watchers
 */
export interface FileWatcher {
    setupWatcher(directory: string, callback: () => void): void;
}


