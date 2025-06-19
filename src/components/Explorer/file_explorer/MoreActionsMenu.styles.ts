import { ActionIcon } from "Assets";
import styled from "styled-components";

const primaryColor = "#666";

interface StyledExplorerExtraMenuBackdropProps {
  active?: boolean;
}

const handleActive = (p: StyledExplorerExtraMenuBackdropProps) => {
  if (p.active) {
    return `
      inline-block
    `;
  }
  return `
      none
    `;
};

export const StyledExplorerExtraMenuBackdrop = styled.div<StyledExplorerExtraMenuBackdropProps>`
  ${handleActive}
`;

interface StyledExplorerExtraMenuProps {
  bgColor?: string;
  borderColor?: string;
  roundness?: number;
  top: number;
  left: number;
}

export const StyledExplorerExtraMenu = styled.div<StyledExplorerExtraMenuProps>`
  position: absolute;
  width: auto;
  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  border: 2px solid ${(p) => p.borderColor ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  box-shadow: hsl(0 0% 0% / 10%) 0 0 0.5rem 0.25rem;
  background-color: ${(p) => p.bgColor ?? primaryColor};
  top: ${(p) => p.top};
  left: ${(p) => p.left};
`;

interface StyledExplorerExtraMenuEntryProps {
  hoverColor?: string;
}

export const StyledExplorerExtraMenuEntry = styled.div<StyledExplorerExtraMenuEntryProps>`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  &:first-of-type {
    margin-top: 0.4rem;
  }

  &:last-of-type {
    margin-bottom: 0.4rem;
  }

  &:hover {
    background-color: ${(p) => p.hoverColor ?? primaryColor};
  }
`;

interface StyledExplorerExtraMenuDividerProps {
  bgColor?: string;
}

export const StyledExplorerExtraMenuDivider = styled.div<StyledExplorerExtraMenuDividerProps>`
  height: 2px;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  width: 100%;
  background-color: ${(p) => p.bgColor ?? primaryColor};
`;
