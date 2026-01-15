import React, { createContext, ReactNode, useContext } from "react";
import { Theme } from "Types";

interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

const defaultTheme: Theme = {
  palette: {
    text: "#ededf2",
    darkText: "#000000",
    placeholderText: "#a6a6bf",
    success: "#29ac29",
    warning: "#f9e86d",
    error: "#802626",
    bgDark: "#0d0d0dff",
    bg: "#1a1a1aff",
    bgLight: "#262626ff",
    primary: "#ffa726",
    secondary: "#ff8800",
    scrollbar: "#6f6f90",
    border: {
      warning: "#ffe100",
      error: "#772222",
      info: "#134f53",
    },
    progressBar: {
      background: "#134f53",
      color: "#1d777c",
    },
    button: {
      error: "#9e2e2e",
      success: "#29ac29",
      warning: "#ffe100",
      info: "#134f53",
      hoverError: "#c63939",
      hoverSuccess: "#29ac29",
      hoverWarning: "#ccb400",
      hoverInfo: "#1d777c",
    },
    selectedGradient:
      "linear-gradient( -45deg, #12494c 0%, #584f42 50%, #909c7b 100%)",
  },
  roundness: 5,
  viewRoundness: 20,
  transitionSpeed: 200,
  monacoTheme: "dark",
};

// const defaultTheme: Theme = {
//   palette: {
//     text: "#ededf2",
//     darkText: "#000000",
//     placeholderText: "#a6a6bf",
//     success: "#29ac29",
//     warning: "#f9e86d",
//     error: "#802626",
//     bgDark: "#e6e6e6",
//     bg: "#f2f2f2",
//     bgLight: "#ffffff",
//     primary: "#ffa726",
//     secondary: "#ff8800",
//     scrollbar: "#6f6f90",
//     border: {
//       warning: "#ffe100",
//       error: "#772222",
//       info: "#134f53",
//     },
//     progressBar: {
//       background: "#134f53",
//       color: "#1d777c",
//     },
//     button: {
//       error: "#9e2e2e",
//       success: "#29ac29",
//       warning: "#ffe100",
//       info: "#b3e5e6ff",
//       hoverError: "#c63939",
//       hoverSuccess: "#29ac29",
//       hoverWarning: "#ccb400",
//       hoverInfo: "#1d777c",
//     },
//     selectedGradient:
//       "linear-gradient( -45deg, #12494c 0%, #584f42 50%, #909c7b 100%)",
//   },
//   roundness: 5,
//   viewRoundness: 20,
//   transitionSpeed: 200,
//   monacoTheme: "light",
// };

const ThemeContext = createContext(defaultTheme);
export const useTheme = () => useContext(ThemeContext) ?? defaultTheme;

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
