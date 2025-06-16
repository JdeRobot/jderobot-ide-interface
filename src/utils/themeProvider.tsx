import React, { createContext, useContext } from "react"
import { merge } from "lodash"

export interface Theme {
  palette?: {
    text?: string,
    placeholderText?: string,
    background?: string,
    primary?: string
    secondary?: string
  }
  roundness?: number
  spacing?: number
  transitionSpeed?: number
}

interface ThemeProviderProps {
  theme?: Theme
  children?: React.ReactNode
}

const defaultTheme: Theme = {
  palette: {
    text: "#ededf2",
    placeholderText: "#a6a6bf",
    background: "#111116",
    primary: "#666",
    secondary: "#03daaf",
  },
  roundness: 5,
  spacing: 8,
  transitionSpeed: 200,
}

const ThemeContext = createContext(defaultTheme)
export const useTheme = () => useContext(ThemeContext) ?? defaultTheme

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return (
    <ThemeContext.Provider value={merge(defaultTheme, props.theme)}>
      {props.children}
    </ThemeContext.Provider>
  )
}

// :root,
// .bt-App[data-theme="dark"] {
//   --background: #111116;
//   --background-50: #0b0b0e;
//   --background-100: #16161d;
//   --background-200: #2c2c3a;
//   --background-300: #434356;
//   --background-400: #595973;
//   --background-500: #6f6f90;
//   --background-600: #8c8ca6;
//   --background-700: #a9a9bc;
//   --background-800: #c5c5d3;
//   --background-900: #e2e2e9;
//   --background-950: #f1f1f4;

//   --primary: #12494c;
//   --primary-50: #051415;
//   --primary-100: #0a2829;
//   --primary-200: #134f53;
//   --primary-300: #1d777c;
//   --primary-400: #279fa5;
//   --primary-500: #30c7cf;
//   --primary-600: #5ad2d8;
//   --primary-700: #83dde2;
//   --primary-800: #ace8ec;
//   --primary-900: #d6f4f5;
//   --primary-950: #eaf9fa;

//   --secondary: #584f42;
//   --secondary-50: #0f0d0b;
//   --secondary-100: #1d1a16;
//   --secondary-200: #3a342c;
//   --secondary-300: #574e42;
//   --secondary-400: #746858;
//   --secondary-500: #91826e;
//   --secondary-600: #a79b8b;
//   --secondary-700: #bdb4a8;
//   --secondary-800: #d3cdc5;
//   --secondary-900: #e9e6e2;
//   --secondary-950: #f4f3f0;

//   --accent: #909c7b;
//   --accent-50: #0d0f0b;
//   --accent-100: #1a1d16;
//   --accent-200: #353a2c;
//   --accent-300: #4f5742;
//   --accent-400: #6a7458;
//   --accent-500: #84916e;
//   --accent-600: #9da78b;
//   --accent-700: #b5bda8;
//   --accent-800: #ced3c5;
//   --accent-900: #e6e9e2;
//   --accent-950: #f3f4f0;

//   --error: #802626;
//   --error-50: #140606;
//   --error-100: #280b0b;
//   --error-200: #4f1717;
//   --error-300: #772222;
//   --error-400: #9e2e2e;
//   --error-500: #c63939;
//   --error-600: #d16161;
//   --error-700: #dd8888;
//   --error-800: #e8b0b0;
//   --error-900: #f4d7d7;
//   --error-950: #f9ebeb;

//   --warning: #f9e86d;
//   --warning-50: #fffce5;
//   --warning-100: #fff9cc;
//   --warning-200: #fff399;
//   --warning-300: #ffed66;
//   --warning-400: #ffe733;
//   --warning-500: #ffe100;
//   --warning-600: #ccb400;
//   --warning-700: #998700;
//   --warning-800: #665a00;
//   --warning-900: #332d00;
//   --warning-950: #1a1700;
// }

// :root,
// .bt-App {
//   --header: var(--primary-200);
//   --app-background: var(--background-100);
//   --control-bar: var(--primary-100);
//   --canvas-background: var(--app-background);

//   --buttons: var(--background-300);
//   --buttons-invisible: var(--background);
//   --buttons-hover: var(--background-500);

//   --border-color: var(--background-950);
//   --icon: var(--text);

//   --scrollbar: var(--background-500);

//   --input-background: var(--background-300);
//   --input-placeholder-text: var(--text-700);
//   --input-focus-border: var(--accent);

//   --error-bg: var(--error);
//   --error-border: var(--error-300);
//   --error-button: var(--error-400);
//   --error-button-hover: var(--error-500);

//   --warning-bg: var(--warning);
//   --warning-border: var(--warning-500);
//   --warning-button: var(--warning-500);
//   --warning-button-hover: var(--warning-600);

//   --create-button: hsla(93, 100%, 49%, 0.5);

//   --progress-bar-bg: var(--background-300);
//   --progress-bar-progress: var(--background-500);

//   --bt-light-text: #ffffff;
//   --bt-dark-text: #000000;
//   --bt-selected-shadow-color: var(--background-50);
//   --bt-action-default-color: red;
//   --bt-tag-blackboard-background: #5ba498;
//   --bt-tag-normal-background: #a45b67;

//   --success: #29ac29;
//   --success-hover: #49eb49;
//   --running: #c4761e;
//   --running-hover: #e6881c;

//   --bt-status-running: var(--running);
//   --bt-status-success: var(--success);
//   --bt-status-failure: #b11111;
//   --bt-status-invalid: #494949;

//   --status-bar: var(--primary-100);
//   --border-radius: 5px;
// }
