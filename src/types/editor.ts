export interface EditorKeybind {
  description: string;
  id: string;
  keybind: string[];
}

export interface Snippet {
  label: string;
  type: string;
  detail?: string;
  code: string;
  docstring: string;
}

export interface ExtraSnippets {
  triggers: string[];
  loader: (prevWord: string) => Snippet[];
}
