import { BackIcon, CloseIcon } from "Assets";
import styled from "styled-components";

const primaryColor = "#666";

interface StyledModalProps {
  bgColor?: string;
  borderColor?: string;
  roundness?: number;
}

export const StyledModal = styled.dialog<StyledModalProps>`
  width: 500px;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  position: relative;

  border: 2px solid ${(p) => p.borderColor ?? primaryColor};
  border-radius: ${(p) => p.roundness ?? 1}px;
  box-shadow: hsl(0 0% 0% / 10%) 0 0 0.5rem 0.25rem;
  background-color: ${(p) => p.bgColor ?? primaryColor};

  &::backdrop {
    background: hsla(0, 0%, 0%, 0.5);
  }

  &:focus {
    outline: none;
  }
`;

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
`;

interface StyledModalTitlebarProps {
  color?: string;
  hoverColor?: string;
}

export const StyledModalTitlebar = styled.div<StyledModalTitlebarProps>`
  font-size: large;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 5px;
  justify-items: center;

  & label {
    color: ${(p) => p.color ?? primaryColor};
    font-weight: 600;
    align-self: center;
    grid-column-start: 2;
    text-align: center;
  }

  & svg {
    height: 100%;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: transparent;

    &:hover {
      background-color: ${(p) => p.hoverColor ?? primaryColor};
    }
  }
`;

interface StyledModalCloseButtonProps {
  color?: string;
}

export const StyledModalCloseButton = styled(
  CloseIcon
)<StyledModalCloseButtonProps>`
  fill: ${(p) => p.color ?? primaryColor};
  margin-left: auto;
`;

interface StyledModalBackButtonProps {
  color?: string;
}

export const StyledModalBackButton = styled(
  BackIcon
)<StyledModalBackButtonProps>`
  fill: ${(p) => p.color ?? primaryColor};
  margin-right: auto;
`;

interface StyledModalRowProps {
  color?: string;
  buttonColor?: string;
  roundness?: number;
}

export const StyledModalRow = styled.div<StyledModalRowProps>`
  & select,
  button {
    width: 100%;
    display: block;
    border: none;
    color: ${(p) => p.color ?? primaryColor};
    font-size: medium;
  }

  & button {
    background-color: ${(p) => p.buttonColor ?? primaryColor};
    margin-bottom: 10px;
    border-radius: ${(p) => p.roundness ?? 1}px;
    height: 2em;
    font-size: medium;
    opacity: 0.6;

    &:hover:enabled {
      opacity: 1;
    }
  }

  & label {
    color: ${(p) => p.color ?? primaryColor};
  }
`;

interface StyledModalButtonRowProps {
  color?: string;
  buttonColor?: string;
  roundness?: number;
}

export const StyledModalButtonRow = styled.div<StyledModalButtonRowProps>`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;

  & button {
    width: 100px;
    display: block;
    border: none;
    color: ${(p) => p.color ?? primaryColor};
    font-size: medium;
    background-color: ${(p) => p.buttonColor ?? primaryColor};
    opacity: 0.6;
    margin-bottom: 10px;
    border-radius: ${(p) => p.roundness ?? 1}px;
    height: 2em;
    font-size: medium;

    &:hover:enabled {
      opacity: 1;
    }
  }
`;

interface StyledModalButtonDeleteProps {
  bgColor?: string;
}

export const StyledModalButtonDelete = styled.button<StyledModalButtonDeleteProps>`
  opacity: 0.6;
  background-color: ${(p) => p.bgColor ?? primaryColor};
  &:hover:enabled {
    opacity: 1;
  }
`;

export const StyledModalInputRowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const StyledModalInputContainer = styled.div`
  position: relative;
`;

interface StyledModalInputProps {
  color?: string;
  placeholderColor?: string;
  bgColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
  invalidBorderColor?: string;
  roundness?: number;
  valid?: boolean;
}

const handleValid = (p: StyledModalInputProps) => {
  if (p.valid) {
    return `
        border-color: ${p.invalidBorderColor ?? primaryColor} !important;
      `;
  }
  return `
    border-color: ${p.borderColor ?? primaryColor} !important;
  `;
};

export const StyledModalInput = styled.input<StyledModalInputProps>`
  padding-left: 1em;
  padding-top: 13px;
  width: 100%;
  align-self: center;
  height: 50px;
  outline: 0;
  font-size: 1rem;
  transition: border-color 0.2s;
  border: 2px solid;
  background-color: ${(p) => p.bgColor ?? primaryColor} !important;
  border-radius: ${(p) => p.roundness ?? 1}px;
  color: ${(p) => p.color ?? primaryColor};

  & label {
    position: absolute;
    top: 15px;
    left: 17px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${(p) => p.placeholderColor ?? primaryColor};
    user-select: none;
  }

  &:required,
  :invalid {
    box-shadow: none;
  }

  &:focus ~ label {
    position: absolute;
    top: 5px;
    display: block;
    transition: 0.2s;
    font-size: 0.9rem;
    font-weight: 700;
  }

  &:placeholder-shown ~ label {
    font-size: 1rem;
    cursor: text;
    top: 15px;
  }

  &:not(placeholder-shown) ~ label {
    position: absolute;
    top: 5px;
    display: block;
    transition: 0.2s;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: text;
  }

  &:focus {
    border-color: ${(p) => p.focusBorderColor ?? primaryColor};
    outline: none !important;
  }

  &::placeholder {
    color: transparent;
    user-select: none;
  }

  .bt-modal-complex-input-indications {
    color: var(--input-placeholder-text);
    font-size: 0.7rem;
  }

  ${handleValid}
`;
