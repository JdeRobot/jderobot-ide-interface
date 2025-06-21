import { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { CommsManager } from "jderobot-commsmanager";
import { monacoEditorSnippet } from "./extras";
import { useTheme } from "Utils";

const pylint_error: string[] = ["E0401", "E1101"];
const pylint_warning: string[] = ["W0611"];
const pylint_convention: string[] = [
  "C0114",
  "C0303",
  "C0304",
  "C0305",
  "C0411",
];
const pylint_refactor: string[] = [];
const pylint_fatal: string[] = [];

const getMarkerSeverity = (type: string, monaco: Monaco) => {
  switch (type) {
    case "refactor":
    case "convention":
      return monaco.MarkerSeverity.Info;
    case "error":
      return monaco.MarkerSeverity.Error;
    case "warning":
    case "fatal":
      return monaco.MarkerSeverity.Warning;
    default:
      return monaco.MarkerSeverity.Error;
  }
};

const FileEditor = ({
  commsManager,
  fileContent,
  setFileContent,
  saveFile,
  language,
  zoomLevel,
}: {
  commsManager: CommsManager | null;
  fileContent: string;
  setFileContent: Function;
  saveFile: Function;
  language: string;
  zoomLevel: number;
}) => {
  const theme = useTheme();

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const [fontSize, setFontSize] = useState(14);

  const code_analysis = (message: any) => {
    if (!editorRef.current || !monacoRef.current) return;

    const controller = new AbortController();

    const drawMarker = async () => {
      if (monacoRef.current === null) return;
      const data = message.data;

      if (!data) return;

      const model = editorRef.current.getModel();
      const pylint_data = data.pylint_output.map((pylint: any, i: number) => {
        if (monacoRef.current === null) return;
        return {
          startLineNumber: pylint.line,
          startColumn: pylint.column,
          endLineNumber:
            pylint.endLine === null ? pylint.column : pylint.endLine,
          endColumn:
            pylint.endColumn === null
              ? model.getLineMaxColumn(pylint.line)
              : pylint.endColumn,
          message: pylint.message,
          severity: getMarkerSeverity(pylint.type, monacoRef.current),
        };
      });
      monacoRef.current.editor.setModelMarkers(model, "owner", pylint_data);
    };

    drawMarker();

    return () => controller.abort();
  };

  const code_format = (message: any) => {
    if (!editorRef.current) return;

    const data = message.data;

    if (!data) return;

    setFileContent(data.formatted_code);
  };

  const handleKeyDown = async (event: any) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      saveFile();
    }
  };

  useEffect(() => {
    if (commsManager === null) {
      return;
    }

    commsManager.subscribe("code-format", code_format);
    commsManager.subscribe("code-analysis", code_analysis);

    return () => {
      commsManager.unsubscribe("code-format", code_format);
      commsManager.unsubscribe("code-analysis", code_analysis);
    };
  }, [commsManager]);

  useEffect(() => {
    return () => {
      editorRef.current
        .getDomNode()
        .removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("dark-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": theme.palette.background,
      },
    });
    monaco.editor.defineTheme("light-theme", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": theme.palette.background,
      },
    });
  };

  const handleEditorMount = async (editor: any, monaco: Monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;

    editorRef.current.getDomNode().addEventListener("keydown", handleKeyDown);

    monacoEditorSnippet(monaco, commsManager);

    editorRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyI,
      function () {
        if (language !== "python")
          //TODO: only format for python. We could add more later
          return;

        if (commsManager && fileContent) {
          commsManager.code_format(fileContent);
        }
      },
    );

    return () => {
      editorRef.current
        .getDomNode()
        .removeEventListener("keydown", handleKeyDown);
    };
  };

  const lineNumbers: editor.LineNumbersType = "on";
  const scrollbar: editor.IEditorScrollbarOptions = {
    vertical: "auto",
    horizontal: "auto",
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  };
  const hover: editor.IEditorHoverOptions = {
    enabled: true,
  };
  const wordWrap: "on" | "off" | "wordWrapColumn" | "bounded" | undefined =
    "wordWrapColumn";
  const wrappingIndent: "indent" | "none" | "same" | "deepIndent" | undefined =
    "indent";
  const wordBasedSuggestions:
    | "off"
    | "currentDocument"
    | "matchingDocuments"
    | "allDocuments" = "currentDocument";

  const editorOptions = {
    //
    fontSize: fontSize,
    lineNumbers: lineNumbers,
    roundedSelection: false,
    scrollBeyondLastLine: true,
    // word warp
    wordWrap: wordWrap,
    wordWrapColumn: 80,
    wrappingIndent: wrappingIndent,
    //
    minimap: { enabled: false },
    automaticLayout: true,
    tabSize: 4,
    rulers: [80],
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    wordBasedSuggestions: wordBasedSuggestions,
    //
    hover: hover,
    glyphMargin: true,
    lineNumbersMinChars: 3,
    // scroll
    smoothScrolling: true,
    scrollbar: scrollbar,
  };

  useEffect(() => {
    setFontSize(Math.max(10, 14 + zoomLevel * 2));
  }, [zoomLevel]);

  // Code Analysis (with pylint)
  useEffect(() => {
    if (
      !editorRef.current ||
      !monacoRef.current ||
      !fileContent ||
      !commsManager
    )
      return;

    editorRef.current.addCommand(
      monacoRef.current.KeyMod.CtrlCmd |
        monacoRef.current.KeyMod.Shift |
        monacoRef.current.KeyCode.KeyI,
      function () {
        //TODO: only format for python. We could add more later
        if (language !== "python") return;

        if (commsManager && fileContent) {
          commsManager.code_format(fileContent);
        }
      },
    );

    if (language !== "python") return;

    commsManager.code_analysis(fileContent, [
      ...pylint_error,
      ...pylint_warning,
      ...pylint_convention,
      ...pylint_refactor,
      ...pylint_fatal,
    ]);
  }, [fileContent]);

  return (
    <Editor
      width="100%"
      height="100%"
      defaultLanguage="python"
      defaultValue=""
      language={language}
      value={fileContent}
      // theme={`${settings.theme.value}-theme`} TODO:add theme
      theme={`dark-theme`}
      onChange={(newContent: any) => {
        setFileContent(newContent);
      }}
      options={editorOptions}
      beforeMount={handleEditorDidMount}
      onMount={handleEditorMount}
    />
  );
};

export default FileEditor;
