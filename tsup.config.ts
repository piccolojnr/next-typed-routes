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
        // Copy typed-routes files to dist directory
        try {
            mkdirSync("dist/typed-routes", { recursive: true });
            copyFileSync("src/typed-routes/route.ts", "dist/typed-routes/route.ts");
            copyFileSync("src/typed-routes/react.tsx", "dist/typed-routes/react.tsx");
        } catch (error) {
            console.warn("Failed to copy typed-routes files:", error);
        }
    },
}); 