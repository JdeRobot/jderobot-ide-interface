/** @type { import('@storybook/react-webpack5').Preview } */
import { themes } from "storybook/theming";

const preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: {
      themeOverride: "dark",
    },
  },
  darkMode: {
    dark: {
      ...themes.dark,
      appContentBg: "#202020", // override main story view frame
      barBg: "#202020", // override top toolbar
    },
  },
  tags: ["autodocs"],
};

export default preview;
