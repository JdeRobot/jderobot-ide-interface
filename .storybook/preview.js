/** @type { import('@storybook/react-webpack5').Preview } */
import { themes } from 'storybook/theming'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: {
      themeOverride: 'dark',
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