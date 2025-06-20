import { ActionIcon } from "Assets";
import styled from "styled-components";

const primaryColor = "#666";

export const StyledSidebarEntryContainer = styled.div`
  overflow-y: auto;
`;

export const StyledSidebarEntry = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
`;

interface StyledExplorerItemContainerProps {
  bgColor?: string;
  hoverColor?: string;
  active?: boolean;
}

const handleActive = (p: StyledExplorerItemContainerProps) => {
  if (p.active) {
    return `
      background-color: ${p.bgColor ?? primaryColor};
    `;
  }
};

export const StyledExplorerItemContainer = styled.div<StyledExplorerItemContainerProps>`
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    background-color: ${(p) => p.hoverColor ?? primaryColor};
    & #explorer-action-button {
      visibility: visible;
    }
  }

  ${handleActive}
`;

interface StyledExplorerItemProps {
  color?: string;
  depth: number;
}

export const StyledExplorerItem = styled.div<StyledExplorerItemProps>`
  list-style-type: none;
  padding: 0px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  z-index: 1;
  padding-left: ${(p) => 20 * p.depth}px;

  & label {
    cursor: pointer;
    list-style-type: none;
    padding: 3px;
    font-size: 0.9em;
    color: ${(p) => p.color ?? primaryColor};
  }

  & svg {
    height: 16px;
    width: 16px;
    min-width: 16px;
    min-height: 16px;
  }
`;

interface StyledActionIconProps {
  color?: string;
}

export const StyledActionIcon = styled(ActionIcon)<StyledActionIconProps>`
  margin-left: auto;
  visibility: hidden;
  stroke: ${(p) => p.color ?? primaryColor};
`;

interface StyledExplorerAccentProps {
  color?: string;
}

export const StyledExplorerAccent = styled(
  ActionIcon,
)<StyledExplorerAccentProps>`
  position: relative;
  z-index: 10;
  width: 5px;
  height: 100%;
  background-color: ${(p) => p.color ?? primaryColor};
`;
