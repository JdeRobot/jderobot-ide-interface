import React from "react";
import {
  ClosedArrowIcon,
  OpenArrowIcon,
  ClosedFolderIcon,
  OpenFolderIcon,
  BaseFileIcon,
  ActionFileIcon,
} from "Assets";
import { useTheme } from "Utils";

function FileIcon({
  is_dir,
  is_collapsed,
  name,
  group,
  color,
}: {
  is_dir: boolean;
  is_collapsed: boolean;
  name: string;
  group: string;
  color?: string;
}) {
  const theme = useTheme();

  let returnVal = (
    <>
      <BaseFileIcon htmlColor={color} />
    </>
  );

  if (is_dir) {
    if (is_collapsed) {
      return (
        <>
          <ClosedArrowIcon htmlColor={color} />
          <ClosedFolderIcon htmlColor={color} />
        </>
      );
    } else {
      return (
        <>
          <OpenArrowIcon htmlColor={color} />
          <OpenFolderIcon htmlColor={color} />
        </>
      );
    }
  }

  switch (group) {
    case "Action":
      returnVal = (
        <>
          <ActionFileIcon htmlColor={color} />
        </>
      );
      break;

    default:
      break;
  }
  return returnVal;
}

export default FileIcon;
