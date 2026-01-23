import styled from "styled-components";
import { ButtonVariant} from "./Button";

const primaryColor = "#666";

interface StyledButtonProps {
  bgColor?: string;
  color?: string;
  roundness?: number;
  variant: ButtonVariant;
  active: boolean;
  isLabel: boolean;
}

const handleVariant = (p: StyledButtonProps) => {
  switch (p.variant) {
    case "standard":
      return `
        background-color: transparent;
      `;
    case "colored":
      return `
        background-color: ${p.bgColor ?? primaryColor};
      `;
    case "tab":
      return `
        background-color: transparent;
        width: 48px !important;
      `;
  }
};

const handleActive = (p: StyledButtonProps) => {
  if (p.active) {
    return `
      background-color: ${p.bgColor ?? primaryColor};
      & svg {
        opacity: 100% !important;
      }
    `;
  }
};

const handleLabel = (p: StyledButtonProps) => {
  if (!p.isLabel) {
    return `
      width: 24px;
    `;
  }
  return `
      color: ${p.color ?? primaryColor};
      font-size: 15px;
      padding: 0 5px 0 5px;
      white-space: nowrap;
    `;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  border: 0;
  padding: 0 0 0 0;
  border-radius: ${(p) => p.roundness ?? 1}px;

  &:hover {
    background-color: ${(p) => p.bgColor ?? primaryColor} !important;

    & svg {
      opacity: 100%;
    }
  }

  ${handleLabel}
  ${handleVariant}
  ${handleActive}

  & svg {
    width: 20px;
    height: 20px;
    opacity: 100%;
  }
`;
