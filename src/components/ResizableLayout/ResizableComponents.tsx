import React, { memo } from "react";
import { Layout } from "Types";
import {
  StyledHorizContiner,
  StyledHorizFillerContiner,
  StyledResizableHoriz,
  StyledResizableVert,
  StyledVertContiner,
  StyledVertFillerContiner,
} from "./ResizableComponents.styles";
import { useTheme } from "Utils";
import { StyledSplashEditor } from "../FileEditor/FileEditor.styles";

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
  top,
  roundness,
  children,
}: {
  height: number;
  min: number;
  max: number;
  snap: number[];
  top?: boolean;
  roundness?: number;
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledResizableVert
      color={theme.palette?.primary}
      hover={theme.palette?.secondary}
      roundness={roundness}
      defaultSize={{
        height: `${height}%`,
      }}
      enable={{
        top: top === true,
        right: false,
        bottom: top !== true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      bounds="parent"
      handleClasses={{
        top: "vresize-handle",
        bottom: "vresize-handle",
      }}
      maxHeight={`${max}%`}
      minHeight={`${min}%`}
      snap={{ y: snap }}
      snapGap={100}
    >
      <div style={{borderRadius:roundness, overflow: "hidden"}}>
        {children}
      </div>
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
      <StyledVertContiner bgColor={theme.palette?.bg}>
        {children[0]}
      </StyledVertContiner>
    );
  }

  if (children.length === 2) {
    return (
      <StyledVertContiner bgColor={theme.palette?.bg}>
        <ResizableVert height={100 / children.length} max={100} snap={[0]} roundness={0}>
          {children[0]}
        </ResizableVert>
        <StyledVertFillerContiner bgColor={theme.palette?.bg} roundness={0}>
          {children[1]}
        </StyledVertFillerContiner>
      </StyledVertContiner>
    );
  }

  return <StyledVertContiner bgColor={theme.palette?.bg}></StyledVertContiner>;
};

export const ResizableLayout = ({
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
  layout: Layout;
  splashIcon: JSX.Element;
  children: any[];
}) => {
  const theme = useTheme();
  let components = 0;
  let oneIndex = 0;
  let twoIndex = 0;

  console.log(oneIndex, twoIndex);

  if (showExplorer) {
    components += 1;
  }

  if (layout === "both") {
    oneIndex = showExplorer ? 0 : 1;
    twoIndex = 2;
    components += 2;
  } else if (layout === "only-editor") {
    oneIndex = showExplorer ? 0 : 1;
    twoIndex = 1;
    components += 1;
  } else {
    oneIndex = showExplorer ? 0 : 2;
    twoIndex = 2;
    components += 1;
  }

  if (components === 0) {
    return <>{splashIcon}</>;
  }

  if (components === 1) {
    return (
      <StyledHorizContiner bgColor={theme.palette?.primary}>
        <StyledHorizFillerContiner bgColor={theme.palette?.primary}>
          {children[oneIndex]}
        </StyledHorizFillerContiner>
      </StyledHorizContiner>
    );
  }

  if (components === 2) {
    return (
      <StyledHorizContiner bgColor={theme.palette?.primary}>
        <ResizableHoriz
          width={baseWidth[oneIndex]}
          max={maxWidth[oneIndex]}
          snap={[0]}
        >
          {children[oneIndex]}
        </ResizableHoriz>
        <StyledHorizFillerContiner bgColor={theme.palette?.primary}>
          {children[twoIndex]}
        </StyledHorizFillerContiner>
      </StyledHorizContiner>
    );
  }

  return (
    <StyledHorizContiner bgColor={theme.palette?.primary}>
      {children.slice(0, children.length - 1).map((comp, i) => (
        <ResizableHoriz
          key={`h-cont${i}`}
          width={baseWidth[i]}
          max={maxWidth[i]}
          snap={[0]}
        >
          {comp}
        </ResizableHoriz>
      ))}
      <StyledHorizFillerContiner bgColor={theme.palette?.primary}>
        {children[children.length - 1]}
      </StyledHorizFillerContiner>
    </StyledHorizContiner>
  );
};

export const CollapsableResizableColumn = memo(
  function CollapsableResizableColumn({
    state,
    splashIcon,
    children,
  }: {
    state: boolean[];
    splashIcon: JSX.Element;
    children: any[];
  }) {
    const theme = useTheme();

    if (state.length === children.length) {
      for (let index = state.length - 1; index >= 0; index--) {
        if (!state[index]) {
          children.splice(index, 1);
        }
      }
    }

    if (children.length === 0) {
      return (
        <StyledSplashEditor bgColor={theme.palette.bg} roundness={theme.viewRoundness}>
          {splashIcon}
        </StyledSplashEditor>
      );
    }

    // if (children.length === 1) {
    //   return (
    //     <StyledVertContiner bgColor={theme.palette?.bg}>
    //       <StyledVertFillerContiner bgColor={theme.palette?.bg}>
    //         {children[0]}
    //       </StyledVertFillerContiner>
    //     </StyledVertContiner>
    //   );
    // }

    return (
      <StyledVertContiner bgColor={theme.palette?.primary}>
        {children.slice(0, children.length - 1).map((comp, i) => (
          <ResizableVert
            key={`v-cont${i}`}
            height={100 / children.length}
            max={100}
            min={0}
            snap={[0]}
          >
            {comp}
          </ResizableVert>
        ))}
        <StyledVertFillerContiner
          bgColor={theme.palette?.primary}
          roundness={theme.viewRoundness}
        >
          {children[children.length - 1]}
        </StyledVertFillerContiner>
      </StyledVertContiner>
    );
  }
);
