import React from "react";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import {
  NewFileModal,
  RenameModal,
  NewFolderModal,
  UploadModal,
  DeleteModal,
  MenuButton,
} from "Components";
import FileExplorer from "./file_explorer/FileExplorer";

import { Entry, ExplorerEntry } from "Types";

import {
  AddIcon,
  AddFolderIcon,
  DeleteIcon,
  ResetIcon,
  RenameIcon,
  UploadIcon,
} from "Assets";
import { contrastSelector, subscribe, unsubscribe, useError, useTheme } from "Utils";
import {
  StyledSidebarContainer,
  StyledSidebarEntry,
  StyledSidebarEntryMenu,
} from "./Explorer.styles";
import { MenuButtonStroke } from "Components";

function getParentDir(file: Entry) {
  // Check if is a directory and if not get the parent directory of the file
  if (file.is_dir) {
    return file.path;
  }

  const split_path = file.path.split("/");
  return split_path.slice(0, split_path.length - 1).join("/");
}

const Explorer = ({
  setCurrentFile,
  currentFile,
  project,
  api,
}: {
  setCurrentFile: Function;
  currentFile?: Entry;
  project: string;
  api: ExplorerEntry;
}) => {
  const { warning, error } = useError();
  const theme = useTheme();
  const iconColor = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.primary,
  );

  const [fileList, setFileList] = useState<Entry[]>([]);
  const [deleteEntry, setDeleteEntry] = useState<Entry | undefined>(undefined);
  const [renameEntry, setRenameEntry] = useState<Entry | undefined>(undefined);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(
    undefined,
  );
  const [selectedLocation, setSelectedLocation] = useState("");

  const [isNewFileModalOpen, setNewFileModalOpen] = useState(false);
  const [isNewFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(false);

  useEffect(() => {
    updateSelectedLocation(undefined);
  }, [selectedEntry]);

  useEffect(() => {
    subscribe(`updateExplorer-${api.name}`, fetchFileListCallback);

    return () => {
      unsubscribe(`updateExplorer-${api.name}`, () => {});
    };
  }, []);

  // useEffect(() => {
  //   if (forceUpdate.value) {
  //     forceUpdate.callback(false);
  //     fetchFileList();
  //   }
  // }, [forceUpdate.value]);

  const updateSelectedLocation = (file?: Entry) => {
    if (file) {
      setSelectedLocation(getParentDir(file));
    } else {
      if (selectedEntry) {
        setSelectedLocation(getParentDir(selectedEntry));
      } else {
        setSelectedLocation("");
      }
    }
  };

  const fetchFileListCallback = async (e: any) => {
    const project = e.detail.project;
    if (project !== undefined && project !== "") {
      try {
        const file_list = await api.list(project);
        const files = JSON.parse(file_list);
        setFileList(files);
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error fetching files:", e);
          error("Error fetching files: " + e.message);
        }
      }
    }
  };

  const fetchFileList = async () => {
    console.log("Fecthing file list, the project name is:", project);
    if (project !== "") {
      try {
        const file_list = await api.list(project);
        const files = JSON.parse(file_list);
        setFileList(files);
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error fetching files:", e);
          error("Error fetching files: " + e.message);
        }
      }
    }
  };

  const inFileList = (list: Entry[], file?: Entry) => {
    if (file === undefined) {
      return false;
    }

    for (const entry of list) {
      if (entry === file) {
        return true;
      }
      if (entry.is_dir) {
        if (inFileList(entry.files, file)) {
          return true;
        }
      }
    }
  };

  ///////////////// CREATE FILES ///////////////////////////////////////////////

  const handleCreateFile = (file?: Entry) => {
    updateSelectedLocation(file);
    setNewFileModalOpen(true);
  };

  const handleCloseNewFileModal = () => {
    setNewFileModalOpen(false);
    const file = document.getElementById("fileName");

    if (file) {
      (file as HTMLFormElement).value = "";
    }
  };

  const handleNewActionSubmit = async (location: string, name: string) => {
    handleCloseNewFileModal();

    if (name !== "") {
      try {
        await api.file.create(project, location, name);
        fetchFileList(); // Update the file list
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error creating file:", e);
          error("Error creating file" + e.message);
        }
      }
    }
  };

  ///////////////// DELETE FILES AND FOLDERS ///////////////////////////////////

  const handleDeleteModal = (file?: Entry) => {
    if (file) {
      setDeleteEntry(file);
      setDeleteType(file.is_dir);
      setDeleteModalOpen(true);
    } else {
      warning("No file is currently selected.");
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteEntry(undefined);
    setDeleteType(false);
  };

  const handleSubmitDeleteModal = async () => {
    //currentFile === Absolute File path
    if (deleteEntry) {
      console.log(deleteEntry);
      try {
        if (deleteType) {
          await api.folder.delete(project, deleteEntry.path);
        } else {
          await api.file.delete(project, deleteEntry.path);
        }

        fetchFileList(); // Update the file list

        if (currentFile === deleteEntry) {
          setCurrentFile(undefined); // Unset the current file
        }
        if (selectedEntry && selectedEntry.path === deleteEntry.path) {
          setSelectedEntry(undefined);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error deleting file:", e);
          error("Error deleting file" + e.message);
        }
      }
    } else {
      warning("No file is currently selected.");
    }
    handleCloseDeleteModal();
  };

  const handleDeleteCurrentFile = () => {
    //currentFile === Absolute File path
    if (currentFile) {
      if (inFileList(fileList, currentFile)) {
        handleDeleteModal(currentFile);
      }
    } else {
      warning("No file is currently selected.");
    }
  };

  ///////////////// CREATE FOLDER //////////////////////////////////////////////

  const handleCreateFolder = (file?: Entry) => {
    updateSelectedLocation(file);
    setNewFolderModalOpen(true);
  };

  const handleCloseCreateFolder = () => {
    setNewFolderModalOpen(false);
    const folder = document.getElementById("folderName");

    if (folder) {
      (folder as HTMLFormElement).value = "";
    }
  };

  const handleCreateFolderSubmit = async (
    location: string,
    folder_name: string,
  ) => {
    if (folder_name !== "") {
      try {
        await api.folder.create(project, folder_name, location);
        fetchFileList(); // Update the file list
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error creating folder:", e.message);
          error("Error creating folder: " + e.message);
        }
      }
    }
  };

  ///////////////// RENAME /////////////////////////////////////////////////////

  const handleRename = (file: Entry) => {
    if (file) {
      setRenameEntry(file);
      setRenameModalOpen(true);
    } else {
      warning("No file is currently selected.");
    }

    // if (currentFile === file.path) {
    //   setForcedSaveCurrent(!forceSaveCurrent);
    // }
  };

  const handleCloseRenameModal = () => {
    setRenameModalOpen(false);
  };

  const handleSubmitRenameModal = async (new_path: string) => {
    if (renameEntry) {
      try {
        console.log(renameEntry);
        if (renameEntry.is_dir) {
          await api.folder.rename(project, renameEntry.path, new_path);
        } else {
          await api.file.rename(project, renameEntry.path, new_path);
        }

        fetchFileList(); // Update the file list

        if (currentFile && currentFile.path === renameEntry.path) {
          currentFile.path = new_path;
          setCurrentFile(currentFile); // Unset the current file
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error deleting file:", e);
          error("Error deleting file: " + e.message);
        }
      }
    } else {
      warning("No file is currently selected.");
    }
    handleCloseRenameModal();
  };

  const handleRenameCurrentFile = async () => {
    if (currentFile) {
      if (inFileList(fileList, currentFile)) {
        handleRename(currentFile);
      }
    } else {
      warning("No file is currently selected.");
    }
  };

  ///////////////// UPLOAD /////////////////////////////////////////////////////

  const handleUpload = (file?: Entry) => {
    updateSelectedLocation(file);
    setUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    fetchFileList();
  };

  ///////////////// DOWNLOAD ///////////////////////////////////////////////////
  const zipFile = async (zip: JSZip, file_path: string, file_name: string) => {
    const content = await api.file.get(project, file_path);
    zip.file(file_name, content);
  };

  const zipFolder = async (zip: JSZip, file: Entry) => {
    const folder = zip.folder(file.name);

    if (folder === null) {
      return;
    }

    for (let index = 0; index < file.files.length; index++) {
      const element = file.files[index];
      if (element.is_dir) {
        await zipFolder(folder, element);
      } else {
        await zipFile(folder, element.path, element.name);
      }
    }
  };

  const handleDownload = async (file: Entry) => {
    if (file) {
      try {
        // Create the zip with the files
        const zip = new JSZip();

        if (file.is_dir) {
          await zipFolder(zip, file);
        } else {
          await zipFile(zip, file.path, file.name);
        }

        zip.generateAsync({ type: "blob" }).then(function (content) {
          // Create a download link and trigger download
          const url = window.URL.createObjectURL(content);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `${file.name.split(".")[0]}.zip`; // Set the downloaded file's name
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // Clean up after the download
        });
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error downloading file: " + e);
          error("Error downloading file: " + e.message);
        }
      }
    }
  };

  return (
    <StyledSidebarContainer id={api.name}>
      <StyledSidebarEntry bgColor={theme.palette.primary}>
        <StyledSidebarEntryMenu bgColor={theme.palette.primary}>
          <MenuButton
            id="new-file-button"
            onClick={() => handleCreateFile(undefined)}
            title="Create a new file"
          >
            <AddIcon htmlColor={iconColor} />
          </MenuButton>
          <MenuButtonStroke
            id="new-folder-button"
            onClick={() => handleCreateFolder(undefined)}
            title="Create a new folder"
          >
            <AddFolderIcon htmlColor={iconColor} />
          </MenuButtonStroke>
          <MenuButtonStroke
            id="upload-button"
            onClick={() => handleUpload()}
            title="Upload new files"
          >
            <UploadIcon htmlColor={iconColor} />
          </MenuButtonStroke>
          <MenuButtonStroke
            id="refresh-explorer-button"
            onClick={() => fetchFileList()}
            title="Refresh View"
          >
            <ResetIcon htmlColor={iconColor}/>
          </MenuButtonStroke>
          <div style={{ marginLeft: "auto" }} />
          {currentFile && (
            <>
              <MenuButtonStroke
                id="rename-file-button"
                onClick={handleRenameCurrentFile}
                title="Rename file"
              >
                <RenameIcon htmlColor={iconColor} />
              </MenuButtonStroke>
              <MenuButton
                id="delete-file-button"
                onClick={handleDeleteCurrentFile}
                title="Delete file"
              >
                <DeleteIcon htmlColor={iconColor} />
              </MenuButton>
            </>
          )}
        </StyledSidebarEntryMenu>
        <FileExplorer
          setCurrentFile={setCurrentFile}
          currentFile={currentFile}
          currentProjectname={project}
          setSelectedEntry={setSelectedEntry}
          fileList={fileList}
          fetchFileList={fetchFileList}
          onDelete={handleDeleteModal}
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
          onUpload={handleUpload}
          onDownload={handleDownload}
          onRename={handleRename}
        />
      </StyledSidebarEntry>
      {api.modals?.createFile ? (
        <api.modals.createFile.component
          isOpen={isNewFileModalOpen}
          onSubmit={(project: string, location: string, ...args: any[]) => {
            api.modals!.createFile!.onCreate(project, location, ...args);
            fetchFileList();
          }}
          onClose={handleCloseNewFileModal}
          fileList={fileList}
          location={selectedLocation}
          project={project}
        />
      ) : (
        <NewFileModal
          isOpen={isNewFileModalOpen}
          onSubmit={handleNewActionSubmit}
          onClose={handleCloseNewFileModal}
          fileList={fileList}
          location={selectedLocation}
        />
      )}
      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onSubmit={handleCreateFolderSubmit}
        onClose={handleCloseCreateFolder}
        fileList={fileList}
        location={selectedLocation}
      />
      {renameEntry && (
        <RenameModal
          isOpen={isRenameModalOpen}
          onSubmit={handleSubmitRenameModal}
          onClose={handleCloseRenameModal}
          fileList={fileList}
          selectedEntry={renameEntry}
        />
      )}
      <UploadModal
        isOpen={isUploadModalOpen}
        onSubmit={handleCloseUploadModal}
        onClose={handleCloseUploadModal}
        upload={api.file.upload}
        location={selectedLocation}
        currentProject={project}
      />
      {deleteEntry && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onSubmit={handleSubmitDeleteModal}
          onClose={handleCloseDeleteModal}
          selectedEntry={deleteEntry}
        />
      )}
    </StyledSidebarContainer>
  );
};

export default Explorer;
