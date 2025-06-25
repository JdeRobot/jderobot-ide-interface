import { IdeInterface } from "./components";
export default IdeInterface;

export { VncViewer } from "./components";
export {
  ThemeProvider,
  useTheme,
  OptionsProvider,
  useOptions,
  ErrorProvider,
  useError,
} from "./utils";
export type { Theme } from "./utils/themeProvider";
export type {
  ExtraEditorProps,
  Layout,
  Entry,
  Options,
  ExplorerEntry,
  EditorsEntry,
  ViewersEntry,
  newFileData,
  ExtraApi,
} from "./types";
