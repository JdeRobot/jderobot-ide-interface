import React from "react";
import { useEffect, useRef } from "react";
import { Entry } from "Types";
import {
  StyledExplorerExtraMenu,
  StyledExplorerExtraMenuBackdrop,
  StyledExplorerExtraMenuDivider,
  StyledExplorerExtraMenuEntry,
} from "./MoreActionsMenu.styles";
import { useTheme } from "Utils";

function MoreActionsMenu({
  menuProps,
  onDelete,
  onCreateFile,
  onCreateFolder,
  onUpload,
  onDownload,
  onRename,
}: {
  menuProps: ContextMenuProps;
  onDelete: Function;
  onCreateFile: Function;
  onCreateFolder: Function;
  onUpload: Function;
  onDownload: Function;
  onRename: Function;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (menuProps.isShown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuProps.isShown]);

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      menuProps.showCallback(false);
    }
  };

  const closeMenu = () => {
    menuProps.showCallback(false);
  };

  return (
    <StyledExplorerExtraMenuBackdrop active={menuProps.isShown} ref={menuRef}>
      <StyledExplorerExtraMenu
        bgColor={theme.palette.bg}
        borderColor={theme.palette.secondary}
        roundness={theme.roundness}
        top={menuProps.position.y}
        left={menuProps.position.x}
      >
        {menuProps.file?.group !== "Trees" && (
          <StyledExplorerExtraMenuEntry
            hoverColor={theme.palette.secondary}
            onClick={() => {
              onRename(menuProps.file);
              closeMenu();
            }}
          >
            <label>Rename</label>
          </StyledExplorerExtraMenuEntry>
        )}
        <StyledExplorerExtraMenuEntry
          hoverColor={theme.palette.secondary}
          onClick={() => {
            onDownload(menuProps.file);
            closeMenu();
          }}
        >
          <label>Download</label>
        </StyledExplorerExtraMenuEntry>
        <StyledExplorerExtraMenuEntry
          hoverColor={theme.palette.secondary}
          onClick={() => {
            onDelete(menuProps.file);
            closeMenu();
          }}
        >
          <label>Delete</label>
        </StyledExplorerExtraMenuEntry>
        {/* {!menuProps.file!.is_dir && menuProps.file?.group === "Action" && ( // TODO: disabled
            <>
              <StyledExplorerExtraMenuDivider
                bgColor={theme.palette.secondary}
              />
              <StyledExplorerExtraMenuEntry
                hoverColor={theme.palette.secondary}
                onClick={() => {
                  // TODO open the same menu that in the diagram
                  console.log("Edit Action");
                  closeMenu();
                }}
              >
                <label>Edit Action</label>
              </StyledExplorerExtraMenuEntry>
            </>
          )} */}
        {menuProps.file?.group !== "Trees" && (
          <>
            <StyledExplorerExtraMenuDivider bgColor={theme.palette.secondary} />
            <StyledExplorerExtraMenuEntry
              hoverColor={theme.palette.secondary}
              onClick={() => {
                onCreateFile(menuProps.file);
                closeMenu();
              }}
            >
              <label>New File</label>
            </StyledExplorerExtraMenuEntry>
            <StyledExplorerExtraMenuEntry
              hoverColor={theme.palette.secondary}
              onClick={() => {
                onCreateFolder(menuProps.file);
                closeMenu();
              }}
            >
              <label>New Folder</label>
            </StyledExplorerExtraMenuEntry>
            <StyledExplorerExtraMenuEntry
              hoverColor={theme.palette.secondary}
              onClick={() => {
                onUpload(menuProps.file);
                closeMenu();
              }}
            >
              <label>Upload</label>
            </StyledExplorerExtraMenuEntry>
          </>
        )}
      </StyledExplorerExtraMenu>
    </StyledExplorerExtraMenuBackdrop>
  );
}

export default MoreActionsMenu;

export class ContextMenuProps {
  public isShown: boolean;
  public showCallback: Function;
  public position: { x: number; y: number };
  public setPositionCallback: Function;
  public file?: Entry;
  public setFile: Function;

  constructor(
    isShown: boolean,
    showCallback: Function,
    position: { x: number; y: number },
    setPositionCallback: Function,
    file: Entry | undefined,
    setFile: Function,
  ) {
    this.isShown = isShown;
    this.showCallback = showCallback;
    this.position = position;
    this.setPositionCallback = setPositionCallback;
    this.file = file;
    this.setFile = setFile;
  }

  showMoreActionsMenu(event: any, file: Entry) {
    event.preventDefault();
    event.stopPropagation();
    this.showCallback(false);
    const positionChange = {
      x: 200 + 20, // The width is set to 200
      y: event.pageY,
    };
    this.setPositionCallback(positionChange);
    this.showCallback(true);
    this.setFile(file);
  }
}
