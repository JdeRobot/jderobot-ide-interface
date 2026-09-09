import { MonocolorSplashIcon, SplashIcon } from "Assets";
import { Panel, Separator } from "react-resizable-panels";
import styled from "styled-components";

const primaryColor = "#666";

interface StyledIdeHorizContainerProps {
  bgColor?: string;
}

export const StyledIdeHorizContainer = styled.div<StyledIdeHorizContainerProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

export const StyledIdeGrid = styled.div<StyledIdeHorizContainerProps>`
  display: inline-grid;

  grid-template:
    "content" 1fr
    "statusbar" 24px / 1fr;

  width: 100vw;
  height: 100%;
  flex-grow: 1;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

interface StyledSeparatorProps {
  bg?: string;
  hover?: string;
  orientation?: string;
}

const handleOrientation = (p: StyledSeparatorProps) => {
  if (p.orientation === "horizontal") {
    return `
      height: 5px;
    `;
  } else {
    return `
      width: 5px;
    `;
  }
};

export const StyledSeparator = styled(Separator)<StyledSeparatorProps>`
  ${handleOrientation}
  background-color: ${(p) => p.bg ?? primaryColor};

  &:hover {
    background-color: ${(p) => p.hover ?? primaryColor};
  }
`;

interface StyledPanelProps {
  roundness?: number;
}

export const StyledPanel = styled(Panel)`
  display: inline-grid;

  grid-template:
    "header" 32px
    "content" 1fr / 1fr;
`;

export const StyledHeadlessPanel = styled(Panel)`
  display: inline-flex;
  flex-direction: column;
`;

export const RoundedPanel = styled(Panel)<StyledPanelProps>`
  overflow: hidden;
  border-radius: ${(p) => p.roundness ?? 20}px 0 0 ${(p) => p.roundness ?? 20}px;
`;

interface StyledIdeVertContainerProps {
  bgColor?: string;
}

export const StyledIdeVertContainer = styled.div<StyledIdeVertContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
  z-index: 3;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

interface StyledIdeContainerProps {
  bgColor?: string;
}

export const StyledIdeContainer = styled.div<StyledIdeContainerProps>`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  margin: 0 2.5px 0 2.5px;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

interface StyledViewerMenuProps {
  bgColor?: string;
}

export const StyledViewerMenu = styled.div<StyledViewerMenuProps>`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: space-between;
  max-height: 32px;
  min-height: 32px;
  width: 100%;
  z-index: 5;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

interface StyledSplashIcon {
  color?: string;
}

export const StyledMonocolorSplashIcon = styled(
  MonocolorSplashIcon,
)<StyledSplashIcon>`
  fill: ${(p) => p.color ?? primaryColor};
  width: 33vh;
  height: 100%;
`;

export const StyledSplashIcon = styled(SplashIcon)<StyledSplashIcon>`
  fill: ${(p) => p.color ?? primaryColor};
  width: 33vh;
  height: 100%;
`;

interface StyledSplashEditorProps {
  bgColor?: string;
  roundness?: number;
}

export const StyledSplashViewers = styled.div<StyledSplashEditorProps>`
  height: 100%;
  width: 100%;
  border-radius: ${(p) => p.roundness ?? 20}px 0 0 ${(p) => p.roundness ?? 20}px;
  background-color: ${(p) => p.bgColor ?? primaryColor};
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
