import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import MoreActionsMenu, { ContextMenuProps } from "./MoreActionsMenu";
import { Entry } from "Types";
import { StyledSidebarEntryContainer } from "./FileExplorer.styles";
import { useTheme } from "Utils";

const FileExplorer = ({
  setCurrentFile,
  currentFile,
  currentProjectname,
  setSelectedEntry,
  fileList,
  fetchFileList,
  onDelete,
  onCreateFile,
  onCreateFolder,
  onUpload,
  onDownload,
  onRename,
}: {
  setCurrentFile: Function;
  currentFile?: Entry;
  currentProjectname: string;
  setSelectedEntry: Function;
  fileList: Entry[];
  fetchFileList: Function;
  onDelete: Function;
  onCreateFile: Function;
  onCreateFolder: Function;
  onUpload: Function;
  onDownload: Function;
  onRename: Function;
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menuFile, setMenuFile] = useState<Entry | undefined>(undefined);
  const [menuPosistion, setMenuPosistion] = React.useState({ x: 0, y: 0 });
  const theme = useTheme();

  const MenuProps = new ContextMenuProps(
    showMenu,
    setShowMenu,
    menuPosistion,
    setMenuPosistion,
    menuFile,
    setMenuFile,
  );

  useEffect(() => {
    fetchFileList();
    setSelectedEntry(undefined);
    console.log("The file list is: ", fileList);
    if (Array.isArray(fileList)) {
      console.log("Yes it is an array");
    }
  }, [currentProjectname]);

  const handleFileClick = (file: Entry) => {
    setCurrentFile(file);
    setSelectedEntry(file);
  };

  const handleFolderClick = (file: Entry) => {
    setSelectedEntry(file);
  };

  if (Array.isArray(fileList)) {
    return (
      <StyledSidebarEntryContainer bgColor={theme.palette.bg}>
        {fileList.map((file) => (
          <TreeNode
            key={file.path}
            node={file}
            depth={0}
            currentFile={currentFile}
            handleFileClick={handleFileClick}
            handleFolderClick={handleFolderClick}
            menuProps={MenuProps}
          />
        ))}
        {showMenu && (
          <MoreActionsMenu
            menuProps={MenuProps}
            onDelete={onDelete}
            onCreateFile={onCreateFile}
            onCreateFolder={onCreateFolder}
            onUpload={onUpload}
            onDownload={onDownload}
            onRename={onRename}
          />
        )}
      </StyledSidebarEntryContainer>
    );
  } else {
    return (
      <>
        <p>Create or select a project to start</p>
      </>
    );
  }
};

export default FileExplorer;
