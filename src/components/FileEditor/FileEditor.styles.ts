import styled from "styled-components";

const primaryColor = "#666";

interface StyledEditorMenuProps {
  bgColor?: string;
  roundness?: number;
  layout?: string;
}

export const StyledEditorMenu = styled.div<StyledEditorMenuProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;

interface StyledChangeIndicatorProps {
  color?: string;
}

export const StyledChangeIndicator = styled.div<StyledChangeIndicatorProps>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${(p) => p.color ?? primaryColor};
`;

const handleLayout = (p: StyledEditorMenuProps) => {
  if (p.layout === "only-editor") {
    return `
      border-radius: ${p.roundness ?? 20}px 0 0 ${p.roundness ?? 20}px;
    `;
  } else {
    return `
      border-radius: ${p.roundness ?? 20}px;
    `;
  }
};

export const StyledSplashEditor = styled.div<StyledEditorMenuProps>`
  height: 100%;
  width: 100%;
  ${handleLayout}
  background-color: ${(p) => p.bgColor ?? primaryColor};
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
