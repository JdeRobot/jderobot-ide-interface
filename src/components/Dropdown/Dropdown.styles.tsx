import styled from "styled-components";

const primaryColor = "#666";

interface StyledDropdownProps {
  color?: string;
  bgColor?: string;
  hoverColor?: string;
  roundness?: number;
  width?: number;
  height?: number;
  left?: number;
  down?: boolean;
}

const handleDown = (p: StyledDropdownProps) => {
  if (p.down) {
    return `
      margin-top: 10px;
    `;
  }
  return `
    margin-top: ${- (p.height ?? 1) - 10}px;
  `;
};

export const StyledDropdown = styled.button<StyledDropdownProps>`
  border-radius: ${(p) => p.roundness ?? 1}px;
  width: ${(p) => p.width ?? 1}px;
  left: ${(p) => p.left ?? 1}px;
  display: flex;
  position: absolute;
  z-index: 3;
  flex-direction: column;
  background-color: ${(p) => p.bgColor ?? primaryColor};
  border: 1px black solid;
  ${handleDown}

  & button {
    border-radius: 0 !important;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-bottom: 0 !important;
    opacity: 1 !important;
    background-color: ${(p) => p.bgColor ?? primaryColor};
    color: ${(p) => p.color ?? primaryColor};
    border: 0;
    padding: 5px 5px 5px 5px;
    font-size: 16px;

    &:first-of-type {
      border-top-left-radius: 5px !important;
      border-top-right-radius: 5px !important;
    }

    &:last-of-type {
      border-bottom-left-radius: 5px !important;
      border-bottom-right-radius: 5px !important;
    }

    &:hover {
      background-color: ${(p) => p.hoverColor ?? primaryColor};
    }
  }
`;
