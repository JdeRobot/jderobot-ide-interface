import styled from "styled-components";

const primaryColor = "#666";

interface StyledEditorMenuProps {
  bgColor?: string;
}

export const StyledEditorMenu = styled.div<StyledEditorMenuProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  height: 32px;
  max-height: 32px;
  width: 100%;
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
