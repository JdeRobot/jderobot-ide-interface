import React, { memo } from "react";
import { Layout } from "Types";
import {
  StyledHorizContiner,
  StyledHorizFillerContiner,
  StyledResizableHoriz,
  StyledResizableVert,
  StyledResizableVertBlock,
  StyledVertContiner,
  StyledVertFillerContiner,
  StyledVertRContainer,
} from "./ResizableComponents.styles";
import { useTheme } from "Utils";
import { StyledSplashEditor } from "../FileEditor/FileEditor.styles";
import { StyledIdeContainer } from "../IdeInterface/IdeInterface.styles";

export const ResizableHoriz = ({
  width,
  min,
  max,
  snap,
  hidden,
  expand,
  children,
}: {
  width: number;
  min: number;
  max: number;
  snap: number[];
  hidden?: boolean;
  expand?: boolean;
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledResizableHoriz
      color={theme.palette?.primary}
      hover={theme.palette?.secondary}
      expand={expand}
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
      style={{ display: hidden ? "none" : "block" }}
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
  hidden,
  expand,
  children,
}: {
  height: number;
  min: number;
  max: number;
  snap: number[];
  top?: boolean;
  roundness?: number;
  hidden?: boolean;
  expand?: boolean;
  children: any;
}) => {
  const theme = useTheme();

  return (
    <StyledResizableVert
      color={theme.palette?.primary}
      hover={theme.palette?.secondary}
      expand={expand}
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
      style={{ display: hidden ? "none" : "block" }}
    >
      <StyledResizableVertBlock roundness={roundness}>
        {children}
      </StyledResizableVertBlock>
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
        <StyledIdeContainer bgColor={theme.palette?.bg}>
          {children[0]}
        </StyledIdeContainer>
      </StyledVertContiner>
    );
  }

  if (children.length === 2) {
    return (
      <StyledVertContiner bgColor={theme.palette?.bg}>
        <ResizableVert
          height={100 / children.length}
          max={100}
          snap={[0]}
          roundness={0}
        >
        <StyledIdeContainer bgColor={theme.palette?.bg}>
          {children[0]}
        </StyledIdeContainer>
        </ResizableVert>
        <StyledVertFillerContiner bgColor={theme.palette?.bg} roundness={0}>
        <StyledIdeContainer bgColor={theme.palette?.bg}>
          {children[1]}
        </StyledIdeContainer>
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
  const state = [showExplorer, true, true];

  if (layout === "only-editor") {
    state[2] = false;
  } else if (layout === "only-viewers") {
    state[1] = false;
  }

  const lastVisible = state.lastIndexOf(true);

  return (
    <StyledHorizContiner bgColor={theme.palette?.primary}>
      {children.slice(0, children.length).map((comp, i) => (
        <ResizableHoriz
          key={`h-cont${i}`}
          width={baseWidth[i]}
          max={maxWidth[i]}
          snap={[0]}
          hidden={!state[i]}
          expand={i === lastVisible}
        >
          {comp}
        </ResizableHoriz>
      ))}
      {lastVisible === -1 && (
        <StyledSplashEditor
          bgColor={theme.palette.bg}
          roundness={theme.viewRoundness}
        >
          {splashIcon}
        </StyledSplashEditor>
      )}
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

    const lastVisible = state.lastIndexOf(true);

    return (
      <StyledVertRContainer roundness={theme.viewRoundness}>
        <StyledVertContiner bgColor={theme.palette?.primary}>
          {children.slice(0, children.length).map((comp, i) => (
            <ResizableVert
              key={`v-cont${i}`}
              height={100 / children.length}
              max={100}
              min={0}
              snap={[0]}
              roundness={theme.viewRoundness}
              hidden={!state[i]}
              expand={i === lastVisible}
            >
              {comp}
            </ResizableVert>
          ))}
          {lastVisible === -1 && (
            <StyledSplashEditor
              bgColor={theme.palette.bg}
              roundness={theme.viewRoundness}
            >
              {splashIcon}
            </StyledSplashEditor>
          )}
        </StyledVertContiner>
      </StyledVertRContainer>
    );
  },
);
