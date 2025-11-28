import React from "react";
import { useEffect, useRef, useState } from "react";

import { SaveIcon, MinusIcon, PlusIcon, KeyboardIcon } from "Assets";
import { publish, subscribe, unsubscribe, useError, useTheme } from "Utils";
import { CommsManager } from "jderobot-commsmanager";
import { Entry, EditorsEntry, Options, ExtraSnippets } from "Types";
import TextEditor from "./TextEditor";
import {
  EditorKeybindModal,
  MenuButton,
  MenuButtonStroke,
  StyledButtonsContainer,
  StyledSeparatedButtonsContainer,
} from "Components";
import {
  StyledChangeIndicator,
  StyledEditorMenu,
  StyledSplashEditor,
} from "./FileEditor.styles";
import { ExtraApi } from "src/types/fileTypes";

const fileTypes = {
  json: "json",
  md: "markdown",
  py: "python",
  config: "xml",
  cpp: "cpp",
  hpp: "cpp",
  c: "c",
  h: "h",
  cfg: "xml",
  xml: "xml",
  sdf: "xml",
  urdf: "xml",
  yaml: "yaml",
  repos: "yaml",
};

const FileEditor = ({
  currentFile,
  changeCurrentFile,
  currentProjectname,
  autosave,
  manager,
  api,
  extraEditors,
  splashIcon,
  options,
  extraSnippets,
}: {
  currentFile?: Entry;
  changeCurrentFile: Function;
  currentProjectname: string;
  autosave: boolean;
  manager: CommsManager | null;
  api: ExtraApi;
  splashIcon: JSX.Element;
  extraEditors: EditorsEntry[];
  options?: Options;
  extraSnippets?: ExtraSnippets;
}) => {
  const { error, warning } = useError();
  const theme = useTheme();

  const [fileContent, _setFileContent] = useState<string | undefined>(
    undefined
  );
  const [zoomLevel, changeZoomLevel] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [fileToSave, _setFileToSave] = useState<Entry | undefined>(undefined);
  const [language, _setLanguage] = useState("python");
  const [projectToSave, setProjectToSave] = useState(currentProjectname);
  const contentRef = useRef<string>(""); // In case some editors cannot update states
  const [showKeybindsModal, openKeybindsModal] = useState<boolean>(false);

  // Autosave data
  const fileToSaveRef = useRef<Entry | undefined>(undefined);
  const fileContentRef = useRef<string | undefined>(undefined);
  const fileLanguageRef = useRef<string>("textplain");

  const setFileToSave = (data?: Entry) => {
    fileToSaveRef.current = data;
    _setFileToSave(data);
  };

  const setFileContent = (data?: string) => {
    fileContentRef.current = data;
    _setFileContent(data);
  };

  const setLanguage = (language: string) => {
    fileLanguageRef.current = language;
    _setLanguage(language);
  };

  useEffect(() => {
    subscribe("autoSave", async () => {
      if (autosave) {
        await autoSave();
        publish("autoSaveCompleted");
      }
    });

    if (options?.editor?.onlyOneFile) {
      subscribe("uploadOnlyCode", (e: any) => {
        setFileContent(e.detail.code);
      });
    }

    return () => {
      unsubscribe("autoSave", () => {});
      if (options?.editor?.onlyOneFile) {
        unsubscribe("uploadOnlyCode", () => {});
      }
    };
  }, []);

  const findExt = (extension?: string) => {
    let fileType = "textplain";

    if (extension === undefined) {
      return fileType;
    }

    for (const key in fileTypes) {
      if (key === extension) {
        fileType = fileTypes[key as keyof typeof fileTypes];
        break;
      }
    }

    for (const editor of extraEditors) {
      for (const entry of editor.trigger) {
        if (
          entry.group === currentFile?.group &&
          entry.extension === currentFile?.path.split(".").pop()
        ) {
          console.log("Loading new file ended. Language:", editor.language);
          return editor.language;
        }
      }
    }

    return fileType;
  };

  const initFile = async (file: Entry) => {
    try {
      if (currentFile === undefined) {
        throw Error("No current file");
      }

      console.log("Loading new file...");

      const fileType = findExt(file.path.split(".").pop());
      setLanguage(fileType);

      const content = await api.file.get(currentProjectname, currentFile);
      setFileContent(content);

      setHasUnsavedChanges(false); // Reset the unsaved changes flag when a new file is loaded
      console.log("Loading new file ended. Language:", fileType);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error fetching file content: " + e.message);
        error("Error fetching file content: " + e.message);
      }
    }
  };

  const autoSave = async () => {
    console.log("Auto saving file...");

    if (fileContentRef.current === undefined) {
      console.log("No content to save");
      return;
    }

    if (fileToSaveRef.current === undefined) {
      console.log("No file to save");
      return;
    }

    if (fileToSaveRef.current.access === false) {
      console.log("File is Read-Only");
      warning("File is Read-Only");
      return;
    }

    let content = fileContentRef.current;

    if (contentRef.current !== "") {
      content = contentRef.current;
    }

    if (content === undefined) {
      console.log("No content to save");
      return;
    }

    try {
      await api.file.save(currentProjectname, fileToSaveRef.current, content);
      console.log("Auto save completed");
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error saving file: " + e.message);
        error("Error saving file: " + e.message);
      }
    }
  };

  useEffect(() => {
    setHasUnsavedChanges(fileContent !== undefined);
  }, [fileContent]);

  useEffect(() => {
    const func = async () => {
      if (currentFile) {
        if (fileToSave && autosave) {
          await autoSave();
        }
        contentRef.current = "";
        setFileContent(undefined);
        await initFile(currentFile);
        setFileToSave(currentFile);
      } else {
        setFileContent(undefined);
        contentRef.current = "";
        setHasUnsavedChanges(false);
      }
    };
    func();
  }, [currentFile]);

  useEffect(() => {
    setFileToSave(undefined);
    if (currentFile) {
      handleSaveFile();
    }
    setProjectToSave(currentProjectname);
    setFileContent(undefined);
    contentRef.current = "";
  }, [currentProjectname]);

  const handleSaveFile = async () => {
    console.log(fileContent, currentFile);
    if (fileContent === undefined) {
      console.log("No content to save");
      return;
    }

    if (currentFile === undefined) {
      console.log("No file is currently selected");
      warning("No file is currently selected.");
      return;
    }

    if (currentFile.access === false) {
      console.log("File is Read-Only");
      warning("File is Read-Only");
      return;
    }

    try {
      await api.file.save(projectToSave, currentFile, fileContent);
      setHasUnsavedChanges(false); // Reset the unsaved changes flag
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error saving file: " + e.message);
        error("Error saving file: " + e.message);
      }
    }
  };

  const handleZoomIn = () => {
    changeZoomLevel((prevZoom) => prevZoom + 1);
  };

  const handleZoomOut = () => {
    changeZoomLevel((prevZoom) => prevZoom - 1);
  };

  return (
    <>
      <EditorKeybindModal
        isOpen={showKeybindsModal}
        onClose={function (): void {
          openKeybindsModal(false);
        }}
        keybinds={[
          {
            id: "format-code",
            description: "Format Code",
            keybind: ["Ctrl", "Shift", "I"],
          },
          {
            id: "lint-code",
            description: "Lint Code",
            keybind: ["Ctrl", "Shift", "L"],
          },
        ]}
      />
      <StyledEditorMenu bgColor={theme.palette?.primary}>
        <StyledButtonsContainer color={theme.palette?.secondary}>
          {!options?.editor?.notShowSave && (
            <>
              {hasUnsavedChanges && (
                <StyledChangeIndicator
                  color={theme.palette?.text}
                  id="unsaved-dot"
                />
              )}
              <MenuButton
                id="save-button"
                onClick={handleSaveFile}
                title="Save File"
              >
                <SaveIcon viewBox="0 0 .9375 .9375" />
              </MenuButton>
            </>
          )}
          <MenuButtonStroke
            id="zoom-in-button"
            onClick={handleZoomIn}
            title="Increase Zoom"
          >
            <PlusIcon viewBox="0 0 20 20" />
          </MenuButtonStroke>
          <MenuButtonStroke
            id="zoom-out-button"
            title="Decrease Zoom"
            onClick={handleZoomOut}
          >
            <MinusIcon viewBox="0 0 20 20" />
          </MenuButtonStroke>
          {(() => {
            for (const editor of extraEditors) {
              if (editor.language === language) {
                const list: any[] = [];
                for (const b of editor.buttons) {
                  list.push(
                    <StyledSeparatedButtonsContainer
                      color={theme.palette?.secondary}
                    >
                      {b}
                    </StyledSeparatedButtonsContainer>
                  );
                }
                return <>{list}</>;
              }
            }
            return (
              <MenuButton
                id="keybinds-button"
                title="Keybinds Info"
                onClick={() => openKeybindsModal(true)}
              >
                <KeyboardIcon />
              </MenuButton>
            );
          })()}
        </StyledButtonsContainer>
      </StyledEditorMenu>
      {fileContent !== undefined ? (
        <>
          {(() => {
            for (const editor of extraEditors) {
              if (editor.language === language) {
                return (
                  <editor.component
                    commsManager={manager}
                    project={currentProjectname}
                    file={currentFile}
                    changeFile={changeCurrentFile}
                    fileContent={fileContent}
                    setFileContent={setFileContent}
                    contentRef={contentRef}
                    saveFile={autoSave}
                    language={language}
                    zoomLevel={zoomLevel}
                  />
                );
              }
            }
            return (
              <TextEditor
                commsManager={manager}
                fileContent={fileContent}
                setFileContent={setFileContent}
                saveFile={autoSave}
                language={fileLanguageRef.current}
                zoomLevel={zoomLevel}
                extraSnippets={extraSnippets}
              />
            );
          })()}
        </>
      ) : (
        <StyledSplashEditor bgColor={theme.palette.bg}>
          {splashIcon}
        </StyledSplashEditor>
      )}
    </>
  );
};

export default FileEditor;
