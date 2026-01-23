import React from "react";
import { useEffect, useState } from "react";
import FileIcon from "./FileIcon";
import { ContextMenuProps } from "./MoreActionsMenu";
import {
  contrastSelector,
  subscribe,
  unsubscribe,
  useOptions,
  useTheme,
} from "Utils";
import { Entry, AccentColorEventData } from "Types";
import {
  StyledExplorerAccent,
  StyledExplorerItem,
  StyledExplorerItemContainer,
  StyledExtraIcon,
} from "./TreeNode.styles";
import { ActionIcon } from "Assets";

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

  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg,
  );

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
        bgColor={theme.palette.bgLight}
        hoverColor={theme.palette.bgLight}
        roundness={theme.roundness}
        onClick={() => handleClick()}
        onContextMenu={(e) => {
          menuProps.showMoreActionsMenu(e, node);
        }}
      >
        <StyledExplorerItem color={text} depth={depth}>
          <FileIcon
            is_dir={node.is_dir}
            is_collapsed={isCollapsed}
            name={node.name}
            group={node.group}
            color={text}
          />
          <label>{node.name}</label>
          <StyledExtraIcon
            id="explorer-action-button"
            title="More"
            onClick={(e) => {
              menuProps.showMoreActionsMenu(e, node);
            }}
          >
            <ActionIcon htmlColor={text} />
          </StyledExtraIcon>
          {/* {settings.explorer?.showAccentColors && (
            <StyledExplorerAccent color={accentColor ? accentColor : "none"} />
          )} */}
        </StyledExplorerItem>
      </StyledExplorerItemContainer>
      {!isCollapsed &&
        node.files.map((x) => (
          <TreeNode
            key={x.path}
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
