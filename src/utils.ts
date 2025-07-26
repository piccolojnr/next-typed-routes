import type { PageExtensions } from "./types";
import { DEFAULT_CONFIG } from "./config";

/**
 * Check if a file is a valid Next.js page
 */
export function isPageFile(filename: string, extensions: readonly string[] = DEFAULT_CONFIG.PAGE_EXTENSIONS): boolean {
    return extensions.includes(filename as any);
}

/**
 * Check if a directory is a Next.js route group
 */
export function isRouteGroup(dirname: string): boolean {
    return dirname.startsWith('(') && dirname.endsWith(')');
}

/**
 * Convert file system path to URL route
 */
export function pathToRoute(filePath: string, baseDir: string, includeRouteGroups: boolean = false): string {
    const relativePath = filePath.replace(baseDir, '').replace(/\\/g, '/');
    let route = relativePath.replace(/\/page\.(tsx|ts|jsx|js)$/, '');

    // Ensure route starts with a single slash
    if (!route.startsWith('/')) {
        route = '/' + route;
    }

    // Handle root route
    if (route === "/." || route === "/") route = "/";

    // Remove route groups if not included
    if (!includeRouteGroups) {
        route = route.replace(/\/\([^)]+\)/g, "");
    }

    // Keep dynamic segments as [paramName] format (don't convert to ${paramName})
    // The route should already be in the correct format from the file system

    return route;
}

/**
 * Validate if a path exists and is a directory
 */
export function validateDirectory(dirPath: string): boolean {
    try {
        const fs = require('fs');
        const stats = fs.statSync(dirPath);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

/**
 * Create directory if it doesn't exist
 */
export function ensureDirectory(dirPath: string): void {
    try {
        const fs = require('fs');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        throw new Error(`Failed to create directory ${dirPath}: ${error}`);
    }
} 