import { useEffect, useState } from "react";
import FileIcon from "./FileIcon";
import { ContextMenuProps } from "./MoreActionsMenu";
import { subscribe, unsubscribe, useOptions, useTheme } from "Utils";
import { Entry, AccentColorEventData } from "Types";
import {
  StyledActionIcon,
  StyledExplorerAccent,
  StyledExplorerItem,
  StyledExplorerItemContainer,
} from "./TreeNode.styles";

function TreeNode({
  node,
  depth,
  currentFile,
  handleFileClick,
  handleFolderClick,
  menuProps,
}: {
  node: Entry;
  depth: number;
  currentFile?: Entry;
  handleFileClick: Function;
  handleFolderClick: Function;
  menuProps: ContextMenuProps;
}) {
  const theme = useTheme();
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string | undefined>(undefined);
  const settings = useOptions();

  const callback = (e: AccentColorEventData) => {
    if (e.detail === undefined) {
      setAccentColor(undefined);
      setUpdate(true);
      return;
    }

    if (e.detail.name === node.name) {
      setAccentColor(e.detail.color);
      setUpdate(true);
    }
  };

  useEffect(() => {
    subscribe("updateAccentColor", callback);

    return () => {
      unsubscribe("updateAccentColor", () => {});
    };
  }, []);

  useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [update]);

  const handleClick = () => {
    if (node.is_dir) {
      setCollapsed(!isCollapsed);
      handleFolderClick(node);
    } else {
      handleFileClick(node);
    }
  };

  return (
    <>
      <StyledExplorerItemContainer
        active={currentFile && currentFile.path === node.path}
        bgColor={theme.palette.primary}
        hoverColor={theme.palette.primary}
        onClick={() => handleClick()}
      >
        <StyledExplorerItem color={theme.palette.text} depth={depth}>
          <FileIcon
            is_dir={node.is_dir}
            is_collapsed={isCollapsed}
            name={node.name}
            group={node.group}
          />
          <label>{node.name}</label>
          <StyledActionIcon
            stroke={theme.palette.text}
            id="explorer-action-button"
            title={"More"}
            viewBox="0 0 20 20"
            onClick={(e) => {
              menuProps.showMoreActionsMenu(e, node);
            }}
          />
          {settings.explorer?.showAccentColors && (
            <StyledExplorerAccent color={accentColor ? accentColor : "none"} />
          )}
        </StyledExplorerItem>
      </StyledExplorerItemContainer>
      {!isCollapsed &&
        node.files.map((x) => (
          <TreeNode
            node={x}
            depth={depth + 1}
            currentFile={currentFile}
            handleFileClick={handleFileClick}
            handleFolderClick={handleFolderClick}
            menuProps={menuProps}
          />
        ))}
    </>
  );
}

export default TreeNode;
