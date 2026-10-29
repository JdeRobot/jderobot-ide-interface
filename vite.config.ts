import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve("src", "index.ts"),
            name: "jderobot-ide-interface",
            fileName: format => `jderobot-ide-interface.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
    },
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        svgr({
            svgrOptions: {
                svgoConfig: {
                    plugins: [{ name: "preset-default", removeViewBox: false }],
                },
            },
        }),
    ],
    resolve: {
        alias: {
            Assets: "/src/assets",
            Components: "/src/components",
            Utils: "/src/utils",
            Types: "/src/types",
        },
    },
});
