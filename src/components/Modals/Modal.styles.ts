import { BackIcon, CloseIcon, MinusIcon } from "Assets";
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
  height: 100%;

  & form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
  }
`;

interface StyledModalTitlebarProps {
  color?: string;
  hoverColor?: string;
  roundness?: number;
}

export const StyledModalTitlebar = styled.div<StyledModalTitlebarProps>`
  font-size: large;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  align-items: center;

  & label {
    color: ${(p) => p.color ?? primaryColor};
    font-weight: 600;
    align-self: center;
    grid-column-start: 2;
    text-align: center;
  }

  & svg {
    height: 100%;
    width: 16px;
    height: 16px;
    padding: 2px;
    border-radius: ${(p) => p.roundness ?? 1}px;
    background-color: transparent;

    &:hover {
      background-color: ${(p) => p.hoverColor ?? primaryColor};
    }
  }
`;

interface StyledModalButtonProps {
  color?: string;
}

export const StyledModalCloseButton = styled(CloseIcon)<StyledModalButtonProps>`
  fill: ${(p) => p.color ?? primaryColor};
  margin-left: auto;
`;

export const StyledModalBackButton = styled(BackIcon)<StyledModalButtonProps>`
  fill: ${(p) => p.color ?? primaryColor};
  margin-right: auto;
`;

export const StyledModalDeleteButton = styled(
  MinusIcon,
)<StyledModalButtonProps>`
  stroke: ${(p) => p.color ?? primaryColor};
`;

interface StyledModalRowProps {
  color?: string;
  buttonColor?: string;
  roundness?: number;
}

export const StyledModalRow = styled.div<StyledModalRowProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

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
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  width: 100%;

  & button {
    width: 100px;
    display: block;
    border: none;
    color: ${(p) => p.color ?? primaryColor};
    font-size: medium;
    background-color: ${(p) => p.buttonColor ?? primaryColor};
    opacity: 0.6;
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
  background-color: ${(p) => p.bgColor ?? primaryColor} !important;
`;

export const StyledModalInputRowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
      border: 2px solid ${p.borderColor ?? primaryColor};
    `;
  }
  return `
      border: 2px solid ${p.invalidBorderColor ?? primaryColor} !important;
    `;
};

export const StyledModalInput = styled.div<StyledModalInputProps>`
  position: relative;
  width: 80%;

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

  & input:focus ~ label {
    position: absolute;
    top: 5px !important;
    display: block;
    transition: 0.2s;
    font-size: 0.9rem !important;
    font-weight: 700;
  }

  & input:placeholder-shown ~ label {
    font-size: 1rem;
    cursor: text;
    top: 15px;
  }

  & input:not(placeholder-shown) ~ label {
    position: absolute;
    top: 5px;
    display: block;
    transition: 0.2s;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: text;
  }

  & input {
    padding-left: 1em;
    padding-top: 13px;
    width: 100%;
    height: 50px;
    outline: 0;
    font-size: 1rem;
    transition: border-color 0.2s;
    background-color: ${(p) => p.bgColor ?? primaryColor} !important;
    border-radius: ${(p) => p.roundness ?? 1}px;
    color: ${(p) => p.color ?? primaryColor};
    box-sizing: border-box;

    &:required,
    :invalid {
      box-shadow: none;
    }

    &:focus {
      border-color: ${(p) => p.focusBorderColor ?? primaryColor};
      outline: none !important;
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }

    ${handleValid}
  }

  & div {
    color: ${(p) => p.placeholderColor ?? primaryColor};
    font-size: 0.7rem;
    margin: 5px;
  }
`;

interface StyledModalEditableListProps {
  color?: string;
  scrollBarColor?: string;
  bgColor?: string;
  entryColor?: string;
  hoverColor?: string;
  deleteColor?: string;
  roundness?: number;
}

export const StyledModalEditableList = styled.ul<StyledModalEditableListProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  overflow-y: auto;
  max-height: 60vh;
  width: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${(p) => p.scrollBarColor ?? primaryColor};
    border-radius: ${(p) => p.roundness ?? 1}px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.scrollBarColor ?? primaryColor};
    border-radius: ${(p) => p.roundness ?? 1}px;
  }

  & div {
    width: 90%;
    height: 3rem;
    min-height: 3rem;
    background-color: ${(p) => p.entryColor ?? primaryColor};
    padding: 5px;
    align-content: center;
    color: ${(p) => p.color ?? primaryColor};
    display: grid;
    grid-gap: 5px;
    grid-template-columns: auto 20px;

    &:hover {
      background-color: ${(p) => p.hoverColor ?? primaryColor};

      & svg {
        visibility: visible;
      }
    }

    & label {
      background-color: transparent !important;
      margin-bottom: 0px !important;
    }

    & svg {
      height: 100%;
      opacity: 0.4;
      width: 16px;
      height: 16px;
      padding: 2px;
      border-radius: ${(p) => p.roundness ?? 1}px;
      background-color: ${(p) => p.deleteColor ?? primaryColor};
      visibility: hidden;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  & div:first-of-type {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  & div:last-of-type {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

interface StyledModelDropAreaProps {
  text?: string;
  bgColor?: string;
  hoverColor?: string;
  buttonColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  roundness?: number;
  active?: boolean;
}

const handleActive = (p: StyledModelDropAreaProps) => {
  if (p.active) {
    return `
      background-color: ${p.borderColor ?? primaryColor} !important;
      border-color: ${p.hoverBorderColor ?? primaryColor} !important;
    `;
  }
};

export const StyledModalDropArea = styled.label<StyledModelDropAreaProps>`
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
  border-radius: ${(p) => p.roundness ?? 1}px;
  margin-bottom: 10px;
  border: 2px dashed ${(p) => p.borderColor ?? primaryColor};
  color: ${(p) => p.text ?? primaryColor};
  cursor: pointer;
  transition:
    background 0.2s ease-in-out,
    border 0.2s ease-in-out;
  &:hover {
    background: ${(p) => p.borderColor ?? primaryColor};
    border-color: ${(p) => p.hoverBorderColor ?? primaryColor};
  }

  & span {
    color: ${(p) => p.text ?? primaryColor};
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
  }

  & input {
    width: 350px;
    border: 2px solid ${(p) => p.borderColor ?? primaryColor};
    color: ${(p) => p.text ?? primaryColor};
    font-size: medium;
    background-color: ${(p) => p.bgColor ?? primaryColor};
    border-radius: ${(p) => p.roundness ?? 1}px;
    padding: 5px;
    font-size: medium;
    outline: none;

    &::file-selector-button {
      margin-right: 20px;
      border: none;
      background: ${(p) => p.buttonColor ?? primaryColor};
      padding: 10px 20px;
      border-radius: ${(p) => p.roundness ?? 1}px;
      color: ${(p) => p.text ?? primaryColor};
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    &::file-selector-button:hover {
      background: ${(p) => p.hoverColor ?? primaryColor};
    }
  }

  ${handleActive}
`;
