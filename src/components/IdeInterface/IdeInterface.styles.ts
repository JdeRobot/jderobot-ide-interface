import { MonocolorSplashIcon, SplashIcon } from "Assets";
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
  width: 100%;
  z-index: 5;
  padding-left: 10px;
  padding-right: 5px;
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
