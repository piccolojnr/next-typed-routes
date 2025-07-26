import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        cli: "src/cli.ts",
        react: "src/react.tsx",
    },
    format: ["cjs", "esm"],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ["next", "react", "react-dom"],
    onSuccess: "node dist/cli.js --help",
}); 