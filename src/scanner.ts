import fs from "fs";
import path from "path";
import type { RouteScanner } from "./types";
import { isPageFile, isRouteGroup, pathToRoute, validateDirectory } from "./utils";

/**
 * Route scanner implementation
 */
export class NextRouteScanner implements RouteScanner {
    private extensions: readonly string[];
    private includeRouteGroups: boolean;

    constructor(extensions: readonly string[] = ["page.tsx", "page.ts", "page.jsx", "page.js"], includeRouteGroups = false) {
        this.extensions = extensions;
        this.includeRouteGroups = includeRouteGroups;
    }

    /**
     * Recursively scan directory structure to find all Next.js page components
     */
    scanRoutes(baseDir: string): string[] {
        if (!validateDirectory(baseDir)) {
            throw new Error(`Directory does not exist: ${baseDir}`);
        }

        const routes: string[] = [];
        this.walkDirectory(baseDir, baseDir, routes);

        // Remove duplicates and sort for consistent output
        return Array.from(new Set(routes)).sort();
    }

    /**
     * Internal recursive function that walks the directory tree
     */
    private walkDirectory(dir: string, baseDir: string, routes: string[]): void {
        let entries: fs.Dirent[];

        try {
            entries = fs.readdirSync(dir, { withFileTypes: true });
        } catch (error) {
            console.warn(`⚠️  Unable to read directory: ${dir}`, error);
            return;
        }

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // Skip Next.js route groups if not included
                if (!isRouteGroup(entry.name) || this.includeRouteGroups) {
                    this.walkDirectory(fullPath, baseDir, routes);
                } else {
                    // Process route groups but don't include them in the path
                    this.walkDirectory(fullPath, baseDir, routes);
                }
            } else if (isPageFile(entry.name, this.extensions)) {
                // Convert file system path to URL route
                const route = pathToRoute(fullPath, baseDir, this.includeRouteGroups);
                routes.push(route);
            }
        }
    }
}

/**
 * Factory function to create a route scanner
 */
export function createRouteScanner(extensions?: readonly string[], includeRouteGroups?: boolean): RouteScanner {
    return new NextRouteScanner(extensions, includeRouteGroups);
} 