import React, { useEffect, useState } from "react";

import { ActionIcon } from "Assets";
import FileIcon from "./FileIcon";
// import { OptionsContext } from "../../../options/Options";
import { ContextMenuProps } from "./MoreActionsMenu";
import {
  subscribe,
  unsubscribe,
} from "Utils";
import { Entry, AccentColorEventData } from "Types";

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
  const [isCollapsed, setCollapsed] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string | undefined>(undefined);
  // const settings = React.useContext(OptionsContext);

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
      <div
        className={`bt-file-item-container ${currentFile && currentFile.path === node.path ? "bt-file-item-selected-container" : ""}`}
        onClick={() => handleClick()}
      >
        <div
          className={"bt-file-item"}
          style={{ paddingLeft: depth * 20 + "px" }}
        >
          <FileIcon
            is_dir={node.is_dir}
            is_collapsed={isCollapsed}
            name={node.name}
            group={node.group}
          />
          <label>{node.name}</label>
          {/* Add menu button */}
          <ActionIcon
            className="bt-more-action-icon bt-arrow-icon"
            stroke={"var(--icon)"}
            title={"More"}
            onClick={(e) => {
              menuProps.showMoreActionsMenu(e, node);
            }}
          />
          {/* {settings.editorShowAccentColors.value && (
            <div
              className="bt-accent-color"
              style={{
                backgroundColor: accentColor ? accentColor : "none",
              }}
            />
          )} */}
        </div>
      </div>
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

