// Replace your-framework with the framework you are using, e.g. react-vite, nextjs-vite, vue3-vite, etc.
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    framework: {
        name: "@storybook/react-vite",
        options: {
            builder: {
                viteConfigPath: "vite.config.ts",
            },
        },
    },
    addons: [
        "@storybook/addon-docs",
        "@storybook/addon-links",
        "@storybook/addon-designs",
        "storybook-dark-mode"
    ],
    stories: ["../src/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    core: {
        builder: "@storybook/builder-vite", // 👈 The builder enabled here.
    },
    typescript: {
        check: false,
        reactDocgen: false,
    },
};

export default config;
