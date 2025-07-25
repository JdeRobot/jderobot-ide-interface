import { useEffect, useRef, useState } from "react";

import { SaveIcon, MinusIcon, PlusIcon } from "Assets";
import { useError, useTheme } from "Utils";
import { CommsManager } from "jderobot-commsmanager";
import { Entry, EditorsEntry } from "Types";
import TextEditor from "./TextEditor";
import {
  MenuButton,
  MenuButtonStroke,
  StyledButtonsContainer,
  StyledSeparatedButtonsContainer,
} from "Components";
import { StyledChangeIndicator, StyledEditorMenu } from "./FileEditor.styles";
import { ExtraApi } from "src/types/fileTypes";

const fileTypes = {
  json: "json",
  md: "markdown",
  py: "python",
  config: "xml",
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
}: {
  currentFile?: Entry;
  changeCurrentFile: Function;
  currentProjectname: string;
  autosave: boolean;
  manager: CommsManager | null;
  api: ExtraApi;
  splashIcon: JSX.Element;
  extraEditors: EditorsEntry[];
}) => {
  const { error, warning } = useError();
  const theme = useTheme();

  const [fileContent, setFileContent] = useState<string | undefined>(undefined);
  const [zoomLevel, changeZoomLevel] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [fileToSave, setFileToSave] = useState<Entry | undefined>(undefined);
  const [language, setLanguage] = useState("python");
  const [projectToSave, setProjectToSave] = useState(currentProjectname);
  const contentRef = useRef<string>(""); // In case some editors cannot update states

  const initFile = async (file: Entry) => {
    try {
      if (currentFile === undefined) {
        throw Error("No current file");
      }

      console.log("Loading new file...");
      const content = await api.file.get(currentProjectname, currentFile);
      const extension = file.name.split(".").pop();
      setFileContent(content);
      var fileType = "textplain";
      if (extension) {
        for (const key in fileTypes) {
          if (key === extension) {
            fileType = fileTypes[key as keyof typeof fileTypes];
            break;
          }
        }
      }

      setHasUnsavedChanges(false); // Reset the unsaved changes flag when a new file is loaded

      for (const editor of extraEditors) {
        for (const entry of editor.trigger) {
          if (
            entry.group === currentFile?.group &&
            entry.extension === currentFile?.name.split(".").pop()
          ) {
            console.log("Loading new file ended");
            return setLanguage(editor.language);
          }
        }
      }

      setLanguage(fileType);
      console.log("Loading new file ended");
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error fetching file content: " + e.message);
        error("Error fetching file content: " + e.message);
      }
    }
  };

  const autoSave = async () => {
    console.log("Auto saving file...");

    if (fileContent === null) {
      console.log("No content to save");
      return;
    }

    if (fileToSave === undefined) {
      console.log("No file to save");
      return;
    }

    if (fileToSave.access === false) {
      console.log("File is Read-Only");
      warning("File is Read-Only");
      return;
    }

    var content = fileContent;

    if (contentRef.current !== "") {
      content = contentRef.current;
    }

    if (content === undefined) {
      console.log("No content to save");
      return;
    }

    try {
      await api.file.save(currentProjectname, fileToSave, content);
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
      <StyledEditorMenu bgColor={theme.palette?.primary}>
        <StyledButtonsContainer color={theme.palette?.secondary}>
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
                var list: any[] = [];
                for (const b of editor.buttons) {
                  list.push(
                    <StyledSeparatedButtonsContainer
                      color={theme.palette?.secondary}
                    >
                      {b}
                    </StyledSeparatedButtonsContainer>,
                  );
                }
                return <>{list}</>;
              }
            }
            return <></>;
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
                language={language}
                zoomLevel={zoomLevel}
              />
            );
          })()}
        </>
      ) : (
        <>{splashIcon}</>
      )}
    </>
  );
};

export default FileEditor;
