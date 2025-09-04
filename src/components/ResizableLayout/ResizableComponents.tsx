import {
  StyledHorizContiner,
  StyledHorizFillerContiner,
  StyledResizableHoriz,
  StyledResizableVert,
  StyledVertContiner,
  StyledVertFillerContiner,
} from "./ResizableComponents.styles";
import { useTheme } from "Utils";

export const ResizableHoriz = ({
  width,
  min,
  max,
  snap,
  children,
}: {
  width: number;
  min: number;
  max: number;
  snap: number[];
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledResizableHoriz
      color={theme.palette?.primary}
      hover={theme.palette?.secondary}
      defaultSize={{
        width: `${width}%`,
      }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      bounds="parent"
      handleClasses={{
        right: "hresize-handle",
      }}
      maxWidth={`${max}%`}
      minWidth={`${min}%`}
      snap={{ x: snap }}
      snapGap={100}
    >
      {children}
    </StyledResizableHoriz>
  );
};

ResizableHoriz.defaultProps = {
  min: 0,
  max: 100,
  snap: [],
};

export const ResizableVert = ({
  height,
  min,
  max,
  snap,
  children,
}: {
  height: number;
  min: number;
  max: number;
  snap: number[];
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledResizableVert
      color={theme.palette?.primary}
      hover={theme.palette?.secondary}
      defaultSize={{
        height: `${height}%`,
      }}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      bounds="parent"
      handleClasses={{
        bottom: "vresize-handle",
      }}
      maxHeight={`${max}%`}
      minHeight={`${min}%`}
      snap={{ y: snap }}
      snapGap={100}
    >
      {children}
    </StyledResizableVert>
  );
};

ResizableVert.defaultProps = {
  min: 0,
  max: 100,
  snap: [],
};

export const ResizableColumn = ({ children }: { children: any[] }) => {
  const theme = useTheme();

  if (children.length === 1) {
    return (
      <StyledVertContiner bgColor={theme.palette?.background}>
        {children[0]}
      </StyledVertContiner>
    );
  }

  if (children.length === 2) {
    return (
      <StyledVertContiner bgColor={theme.palette?.background}>
        <ResizableVert height={100 / children.length} max={100} snap={[0]}>
          {children[0]}
        </ResizableVert>
        <StyledVertFillerContiner bgColor={theme.palette?.background}>
          {children[1]}
        </StyledVertFillerContiner>
      </StyledVertContiner>
    );
  }

  return (
    <StyledVertContiner
      bgColor={theme.palette?.background}
    ></StyledVertContiner>
  );
};

export const ResizableRow = ({
  baseWidth,
  maxWidth,
  showExplorer,
  layout,
  splashIcon,
  children,
}: {
  baseWidth: number[];
  maxWidth: number[];
  showExplorer: boolean;
  layout: string;
  splashIcon: JSX.Element;
  children: any[];
}) => {
  const theme = useTheme();

  if (layout === "only-editor") {
    // Remove viewers == Remove last element
    children.pop();
    baseWidth.pop();
    maxWidth.pop();
  }

  if (layout === "only-viewers") {
    // Remove editors == Remove middle element
    children.splice(1, 1);
    baseWidth.splice(1, 1);
    maxWidth.splice(1, 1);
  }

  if (!showExplorer) {
    // Remove explorers == Remove first element
    children = [...children.slice(0, 0), ...children.slice(1)];
    baseWidth.shift();
    maxWidth.shift();
  }

  if (children.length === 0) {
    return <>{splashIcon}</>;
  }

  if (children.length === 1) {
    return (
      <StyledHorizContiner bgColor={theme.palette?.primary}>
        <StyledHorizFillerContiner bgColor={theme.palette?.primary}>
          {children[0]}
        </StyledHorizFillerContiner>
      </StyledHorizContiner>
    );
  }

  return (
    <StyledHorizContiner
      id="styled-horiz-container"
      bgColor={theme.palette?.primary}
    >
      {children.slice(0, children.length - 1).map((comp, i) => (
        <ResizableHoriz width={baseWidth[i]} max={maxWidth[i]} snap={[0]}>
          {comp}
        </ResizableHoriz>
      ))}
      <StyledHorizFillerContiner bgColor={theme.palette?.primary}>
        {children[children.length - 1]}
      </StyledHorizFillerContiner>
    </StyledHorizContiner>
  );
};

export const CollapsableResizableColumn = ({
  state,
  splashIcon,
  children,
}: {
  state: boolean[];
  splashIcon: JSX.Element;
  children: any[];
}) => {
  const theme = useTheme();

  for (let index = state.length - 1; index >= 0; index--) {
    if (!state[index]) {
      children.splice(index, 1);
    }
  }

  if (children.length === 0) {
    return <>{splashIcon}</>;
  }

  if (children.length === 1) {
    return (
      <StyledVertContiner bgColor={theme.palette?.background}>
        {children[0]}
      </StyledVertContiner>
    );
  }

  return (
    <StyledVertContiner bgColor={theme.palette?.background}>
      {children.slice(0, children.length - 1).map((comp, i) => (
        <ResizableVert height={100 / children.length} max={100} snap={[0]}>
          {comp}
        </ResizableVert>
      ))}
      <StyledVertFillerContiner bgColor={theme.palette?.background}>
        {children[children.length - 1]}
      </StyledVertFillerContiner>
    </StyledVertContiner>
  );
};
