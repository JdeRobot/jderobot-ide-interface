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

  var returnVal = (
    <>
      <BaseFileIcon fill={theme.palette.text} />
    </>
  );

  if (is_dir) {
    if (is_collapsed) {
      return (
        <>
          <ClosedArrowIcon stroke={theme.palette.text} />
          <ClosedFolderIcon fill={theme.palette.text} />
        </>
      );
    } else {
      return (
        <>
          <OpenArrowIcon stroke={theme.palette.text} />
          <OpenFolderIcon fill={theme.palette.text} />
        </>
      );
    }
  }

  switch (group) {
    case "Action":
      returnVal = (
        <>
          <ActionFileIcon fill={theme.palette.text} />
        </>
      );
      break;

    default:
      break;
  }
  return returnVal;
}

export default FileIcon;
