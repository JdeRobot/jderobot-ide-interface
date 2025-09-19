import styled from "styled-components";
import { ErrorVariant } from "./ErrorModal";
import Modal, { ModalTitlebar } from "./Modal";
import { StyledModalTitlebar } from "./Modal.styles";

const primaryColor = "#666";

interface StyledModalErrorRowProps {
  roundness?: number;
  variant: ErrorVariant;
  errorButtonColor?: string;
  errorHoverColor?: string;
  errorTextColor?: string;
  infoButtonColor?: string;
  infoHoverColor?: string;
  infoTextColor?: string;
  warningButtonColor?: string;
  warningHoverColor?: string;
  warningTextColor?: string;
}

const handleVariant = (p: StyledModalErrorRowProps) => {
  switch (p.variant) {
    case "error":
      return `
        & button {
          background-color: ${p.errorButtonColor ?? primaryColor};
          color: ${p.errorTextColor ?? primaryColor};
          &:hover {
            background-color: ${p.errorHoverColor ?? primaryColor} !important;
          }
        }

        & label {
          color: ${p.errorTextColor ?? primaryColor};
        }
      `;
    case "warning":
      return `
        & button {
          background-color: ${p.warningButtonColor ?? primaryColor};
          color: ${p.warningTextColor ?? primaryColor};
          &:hover {
            background-color: ${p.warningHoverColor ?? primaryColor} !important;
          }
        }

        & label {
          color: ${p.warningTextColor ?? primaryColor};
        }
      `;
    case "info":
      return `
        & button {
          background-color: ${p.infoButtonColor ?? primaryColor};
          color: ${p.infoTextColor ?? primaryColor};
          &:hover {
            background-color: ${p.infoHoverColor ?? primaryColor} !important;
          }
        }

        & label {
          color: ${p.infoTextColor ?? primaryColor};
        }
      `;
  }
};

export const StyledModalErrorRow = styled.div<StyledModalErrorRowProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  & button {
    border-radius: ${(p) => p.roundness ?? 1}px;
    height: 45px;
    width: 175px;
    padding: 15px;
    font-weight: 600;
    text-align: center;
    user-select: none;
  }

  & label {
    font-weight: 600;
    text-align: center;
    white-space: pre-wrap;
  }

  ${handleVariant}
`;

interface StyledModalErrorProps {
  variant: ErrorVariant;
  error?: string;
  errorBorder?: string;
  info?: string;
  infoBorder?: string;
  warning?: string;
  warningBorder?: string;
  bgColor?: string;
  borderColor?: string;
  roundness?: number;
}

const handleVariantModal = (p: StyledModalErrorProps) => {
  switch (p.variant) {
    case "error":
      console.log("Error");
      return `
        background-color: ${p.error ?? primaryColor} !important;
        border-color: ${p.errorBorder ?? primaryColor} !important;
      `;
    case "warning":
      return `
        background-color: ${p.warning ?? primaryColor} !important;
        border-color: ${p.warningBorder ?? primaryColor} !important;
      `;
    case "info":
      return `
        background-color: ${p.info ?? primaryColor} !important;
        border-color: ${p.infoBorder ?? primaryColor} !important;
      `;
  }
};

export const StyledModalError = styled.dialog<StyledModalErrorProps>`
  width: 500px;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  position: relative;

  border: 2px solid;
  border-radius: ${(p) => p.roundness ?? 1}px;
  box-shadow: hsl(0 0% 0% / 10%) 0 0 0.5rem 0.25rem;

  &::backdrop {
    background: hsla(0, 0%, 0%, 0.5);
  }

  &:focus {
    outline: none;
  }

  ${handleVariantModal}
`;

interface StyledModalErrorTitlebarProps {
  variant: ErrorVariant;
  color?: string;
  darkColor?: string;
  hoverColor?: string;
  roundness?: number;
}

const handleVariantTitlebar = (p: StyledModalErrorTitlebarProps) => {
  switch (p.variant) {
    case "error":
      return `
        color: ${p.color ?? primaryColor} !important;
      `;
    case "warning":
      return `
        color: ${p.darkColor ?? primaryColor} !important;
      `;
    case "info":
      return `
        color: ${p.color ?? primaryColor} !important;
      `;
  }
};

export const StyledModalErrorTitlebar = styled.div<StyledModalErrorTitlebarProps>`
  font-size: large;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  align-items: center;

  & label {
    ${handleVariantTitlebar}
    font-weight: 600;
    align-self: center;
    grid-column-start: 2;
    text-align: center;
  }
`;
