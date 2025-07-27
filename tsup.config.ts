import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        cli: "src/cli.ts",
    },
    format: ["cjs", "esm"],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ["next", "react", "react-dom"],
    onSuccess: async () => {
        // Copy shared files to dist directory
        try {
            mkdirSync("dist/shared", { recursive: true });
            copyFileSync("src/shared/route.ts", "dist/shared/route.ts");
            copyFileSync("src/shared/react.tsx", "dist/shared/react.tsx");
        } catch (error) {
            console.warn("Failed to copy shared files:", error);
        }
    },
}); 