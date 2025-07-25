export interface ExplorerEntry {
  name: string;
  list(project: string): Promise<string>;
  file: {
    create(project: string, location: string, name: string): Promise<void>;
    get(project: string, path: string): Promise<string>;
    rename(project: string, oldPath: string, newPath: string): Promise<void>;
    delete(project: string, path: string): Promise<void>;
    upload(
      project: string,
      path: string,
      name: string,
      content: string,
    ): Promise<void>;
  };
  folder: {
    create(project: string, location: string, name: string): Promise<void>;
    rename(project: string, oldPath: string, newPath: string): Promise<void>;
    delete(project: string, path: string): Promise<void>;
  };
  modals?: {
    createFile?: {
      component: any;
      onCreate(
        project: string,
        location: string,
        ...args: any[]
      ): Promise<void>;
    };
  };
}

export interface ExtraApi {
  file: {
    save(project: string, file: Entry, content: string): Promise<void>;
    get(project: string, file: Entry): Promise<string>;
  };
  universes: {
    list(project: string): Promise<string[]>;
    get_config(project: string, universe: string): Promise<any>;
  };
}

export interface ViewersEntry {
  component: JSX.Element;
  icon: JSX.Element;
  name: string;
  active: boolean;
  activate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Entry {
  name: string;
  is_dir: boolean;
  path: string;
  group: string;
  access: boolean;
  files: Entry[];
}

export interface ExtraEditorProps {
  commsManager: any | null;
  project: string;
  file: Entry;
  changeFile: Function;
  fileContent: string;
  setFileContent: Function;
  contentRef: React.MutableRefObject<string>;
  saveFile: Function;
  language: string;
  zoomLevel: number;
}

export interface EditorsEntry {
  component: any;
  buttons: any[];
  name: string;
  language: string;
  trigger: { group: string; extension: string }[];
}

export type Layout = "only-editor" | "only-viewers" | "both";

export interface StatusBarComponents {
  universeSelector?: any;
  extras: JSX.Element[];
}
