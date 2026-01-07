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
}: {
  is_dir: boolean;
  is_collapsed: boolean;
  name: string;
  group: string;
}) {
  const theme = useTheme();

  let returnVal = (
    <>
      <BaseFileIcon viewBox="0 0 20 20" fill={theme.palette.text} />
    </>
  );

  if (is_dir) {
    if (is_collapsed) {
      return (
        <>
          <ClosedArrowIcon viewBox="0 0 20 20" stroke={theme.palette.text} />
          <ClosedFolderIcon viewBox="0 0 20 20" fill={theme.palette.text} />
        </>
      );
    } else {
      return (
        <>
          <OpenArrowIcon viewBox="0 0 20 20" stroke={theme.palette.text} />
          <OpenFolderIcon viewBox="0 0 20 20" fill={theme.palette.text} />
        </>
      );
    }
  }

  switch (group) {
    case "Action":
      returnVal = (
        <>
          <ActionFileIcon viewBox="0 0 20 20" fill={theme.palette.text} />
        </>
      );
      break;

    default:
      break;
  }
  return returnVal;
}

export default FileIcon;
