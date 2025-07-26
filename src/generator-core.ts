import type { RouteGenerator, Options } from "./types";
import { resolveConfig } from "./config";
import { createRouteScanner } from "./scanner";
import { createTypeGenerator } from "./generator";
import { createFileWatcher } from "./watcher";

/**
 * Main route generator implementation
 */
export class NextRouteGenerator implements RouteGenerator {
    private config: Required<Options>;
    private scanner: ReturnType<typeof createRouteScanner>;
    private typeGenerator: ReturnType<typeof createTypeGenerator>;
    private fileWatcher: ReturnType<typeof createFileWatcher>;

    constructor(options: Options = {}) {
        this.config = resolveConfig(options);
        this.scanner = createRouteScanner(this.config.extensions, this.config.includeRouteGroups);
        this.typeGenerator = createTypeGenerator(this.config.routePrefix);
        this.fileWatcher = createFileWatcher();
    }

    /**
     * Scan routes from the configured pages directory
     */
    scanRoutes(baseDir?: string): string[] {
        const dir = baseDir || this.config.pagesDir;
        console.log('🔍 Scanning routes in:', dir);
        return this.scanner.scanRoutes(dir);
    }

    /**
     * Generate TypeScript types from routes
     */
    generateTypes(routes: string[], outputPath?: string): void {
        const path = outputPath || this.config.outputPath;
        this.typeGenerator.generateTypes(routes, path);
    }

    /**
     * Run the complete route generation process
     */
    run(options: Options = {}): void {
        // Update config with new options
        this.config = resolveConfig({ ...this.config, ...options });

        // Update scanner and generator with new config
        this.scanner = createRouteScanner(this.config.extensions, this.config.includeRouteGroups);
        this.typeGenerator = createTypeGenerator(this.config.routePrefix);

        const generate = (): void => {
            try {
                const routes = this.scanRoutes();
                this.generateTypes(routes);
            } catch (error) {
                console.error('❌ Failed to generate routes:', error);
                if (!this.config.watch) {
                    process.exit(1);
                }
            }
        };

        // Initial generation
        generate();

        // Optional watch mode for development
        if (this.config.watch) {
            this.fileWatcher.setupWatcher(this.config.pagesDir, generate);
        }
    }

    /**
     * Get current configuration
     */
    getConfig(): Required<Options> {
        return { ...this.config };
    }

    /**
     * Update configuration
     */
    updateConfig(options: Partial<Options>): void {
        this.config = resolveConfig({ ...this.config, ...options });
        this.scanner = createRouteScanner(this.config.extensions, this.config.includeRouteGroups);
        this.typeGenerator = createTypeGenerator(this.config.routePrefix);
    }
}

/**
 * Factory function to create a route generator
 */
export function createRouteGenerator(options?: Options): RouteGenerator {
    return new NextRouteGenerator(options);
}

/**
 * Convenience function to generate routes with default configuration
 */
export function generateRoutes(options?: Options): void {
    const generator = createRouteGenerator(options);
    generator.run();
} 