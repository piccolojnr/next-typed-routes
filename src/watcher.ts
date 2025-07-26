import chokidar from "chokidar";
import path from "path";

/**
 * File watcher for development mode
 */
export class FileWatcher {
    private watcher: chokidar.FSWatcher | null = null;

    /**
     * Set up file watching for automatic route regeneration
     */
    setupWatcher(pagesDir: string, onChange: () => void): void {
        console.log('👀 Watching for file changes...');
        console.log('   Press Ctrl+C to stop watching');

        this.watcher = chokidar.watch(pagesDir, {
            ignoreInitial: true,
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/.*', // Hidden files
                '**/dist/**',
                '**/build/**',
                '**/.next/**',
            ]
        });

        this.watcher.on("all", (event, filePath) => {
            // Only regenerate for relevant file operations
            if (event === 'add' || event === 'unlink' || event === 'addDir' || event === 'unlinkDir') {
                console.log(`🔄 Detected ${event}: ${path.relative(process.cwd(), filePath)}`);
                console.log('   Regenerating routes...');
                onChange();
            }
        });

        // Graceful shutdown on SIGINT (Ctrl+C)
        process.on('SIGINT', () => {
            this.stop();
        });

        // Graceful shutdown on SIGTERM
        process.on('SIGTERM', () => {
            this.stop();
        });
    }

    /**
     * Stop watching for file changes
     */
    stop(): void {
        if (this.watcher) {
            console.log('\n🛑 Stopping route generation...');
            this.watcher.close();
            this.watcher = null;
            process.exit(0);
        }
    }

    /**
     * Check if watcher is active
     */
    isActive(): boolean {
        return this.watcher !== null;
    }
}

/**
 * Factory function to create a file watcher
 */
export function createFileWatcher(): FileWatcher {
    return new FileWatcher();
} 