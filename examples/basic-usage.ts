/**
 * Basic usage example for next-typed-routes
 * 
 * This example shows how to use the library programmatically
 * to generate route types for a Next.js application.
 */

import { generateRoutes, createRouteGenerator } from "../src";

// Example 1: Basic generation with defaults
console.log("Example 1: Basic generation");
generateRoutes();

// Example 2: Custom configuration
console.log("\nExample 2: Custom configuration");
generateRoutes({
    pagesDir: "src/app",
    outputPath: "types/routes.d.ts",
    routePrefix: "/api",
    includeRouteGroups: true,
    watch: false,
});

// Example 3: Advanced usage with generator instance
console.log("\nExample 3: Advanced usage");
const generator = createRouteGenerator({
    pagesDir: "src/app",
    outputPath: "types/custom-routes.d.ts",
    routePrefix: "/v1",
});

// Scan routes only
const routes = generator.scanRoutes();
console.log("Discovered routes:", routes);

// Generate types only
generator.generateTypes(routes);

// Example 4: Watch mode for development
console.log("\nExample 4: Watch mode (commented out)");
// generateRoutes({
//   watch: true,
//   pagesDir: "src/app",
//   outputPath: "types/routes.d.ts",
// }); 