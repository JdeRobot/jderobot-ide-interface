import { useEffect, useRef, useState } from "react";

import {
  SaveIcon,
  MonocolorSplashIcon,
  MonocolorUniboticsSplashIcon,
} from "Assets";
import { useError, useTheme } from "Utils";
// import { OptionsContext } from "../../options/Options";
import { CommsManager } from "jderobot-commsmanager";
import { Entry, EditorsEntry } from "Types";
import TextEditor from "./TextEditor";
import {
  MenuButton,
  StyledButtonsContainer,
  StyledSeparatedButtonsContainer,
} from "Components";
import { StyledChangeIndicator, StyledEditorMenu } from "./FileEditor.styles";

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
  isUnibotics,
  autosave,
  manager,
  api,
  extraEditors,
}: {
  currentFile?: Entry;
  changeCurrentFile: Function;
  currentProjectname: string;
  isUnibotics: boolean;
  autosave: boolean;
  manager: CommsManager | null;
  api: any;
  extraEditors: EditorsEntry[];
}) => {
  const { error, warning } = useError();
  const theme = useTheme();
  // const settings = React.useContext(OptionsContext);

  const [fileContent, setFileContent] = useState<string | undefined>(undefined);
  const [zoomLevel, changeZoomLevel] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [fileToSave, setFileToSave] = useState<Entry | undefined>(undefined);
  const [language, setLanguage] = useState("python");
  const [projectToSave, setProjectToSave] = useState(currentProjectname);
  const contentRef = useRef<string>(""); // In case some editors cannot update states

  const initFile = async (file: Entry) => {
    try {
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
            <SaveIcon />
          </MenuButton>
          <MenuButton
            id="zoom-in-button"
            onClick={handleZoomIn}
            title="Increase Zoom"
          >
            +
          </MenuButton>
          <MenuButton
            id="zoom-out-button"
            title="Decrease Zoom"
            onClick={handleZoomOut}
          >
            -
          </MenuButton>
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
      {fileContent ? (
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
        <>
          {isUnibotics ? (
            <MonocolorUniboticsSplashIcon
              className="bt-splash-icon"
              fill="var(--header)"
            />
          ) : (
            <MonocolorSplashIcon
              className="bt-splash-icon"
              fill="var(--header)"
            />
          )}
        </>
      )}
    </>
  );
};

export default FileEditor;
