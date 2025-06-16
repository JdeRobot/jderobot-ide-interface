import styled from "styled-components"
import { ButtonVariant } from "./Button"

const primaryColor = "#666"
const secondaryColor = "#aaa"

interface StyledButtonProps {
  bgColor?: string
  color?: string
  roundness?: number
  variant: ButtonVariant
  active: boolean
}

const handleVariant = (p: StyledButtonProps) => {
  switch (p.variant) {
    case "standard":
      return `
        background-color: ${p.bgColor ?? primaryColor};
        border-color: ${p.color ?? primaryColor};
        color: ${p.color ?? "white"}
      `
    case "outlined":
      return `
        background-color: transparent;
        border-color: transparent;
        color: ${p.color ?? primaryColor}
      `
  }
}

const handleActive = (p: StyledButtonProps) => {
  if (p.active) {
    return `
      background-color: ${p.color ?? secondaryColor};
      border-color: ${p.bgColor ?? primaryColor};
      color: ${p.color ?? "white"};
      opacity: 80%;
    `
  }
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 0;
  padding: 0 0 0 0;
  border-radius: ${(p) => (p.roundness ?? 1)}px;
  background-color: ${(p) => p.bgColor ?? primaryColor};

  &:hover {
    background-color: ${(p) => p.color ?? primaryColor};
  }
  ${handleVariant}
  ${handleActive}
`