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
  roundness?: number; 
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
  border-radius: ${(p) => p.roundness ?? 1}px;

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
  height: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  z-index: 1;
  padding-left: ${(p) => 20 * p.depth}px;
  gap: 2px;

  & label {
    cursor: pointer;
    list-style-type: none;
    padding: 4px;
    font-size: 0.9em;
    color: ${(p) => p.color ?? primaryColor};
    margin: 0;
  }

  & svg {
    height: 20px;
    width: 20px;
    min-width: 20px;
    min-height: 20px;
  }
`;


export const StyledExtraIcon = styled.button`
  visibility: hidden;
  margin: 0 0 0 auto;
  padding: 0;
  border: 0;
  background: inherit;
  display: flex;
  justify-content: center;
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
