import styled from "styled-components";
import { ErrorVariant } from "./ErrorModal";
import { contrastSelector } from "Utils";

const primaryColor = "#666";

interface StyledModalErrorProps {
  variant: ErrorVariant;
  roundness?: number;
  lightText?: string;
  darkText?: string;
  error?: string;
  errorBorder?: string;
  errorButtonColor?: string;
  errorHoverColor?: string;
  info?: string;
  infoBorder?: string;
  infoButtonColor?: string;
  infoHoverColor?: string;
  warning?: string;
  warningBorder?: string;
  warningButtonColor?: string;
  warningHoverColor?: string;
}

const handleVariant = (p: StyledModalErrorProps) => {
  let text;
  let button;
  switch (p.variant) {
    case "error":
      text = contrastSelector(p.lightText, p.darkText, p.error);
      button = contrastSelector(p.lightText, p.darkText, p.errorButtonColor);
      return `
        & button {
          background-color: ${p.errorButtonColor ?? primaryColor};
          color: ${text};
          &:hover {
            background-color: ${p.errorHoverColor ?? primaryColor} !important;
          }
        }

        & label {
          color: ${text};
        }
      `;
    case "warning":
      text = contrastSelector(p.lightText, p.darkText, p.warning);
      button = contrastSelector(p.lightText, p.darkText, p.warningButtonColor);
      return `
        & button {
          background-color: ${p.warningButtonColor ?? primaryColor};
          color: ${text};
          &:hover {
            background-color: ${p.warningHoverColor ?? primaryColor} !important;
          }
        }

        & label {
          color: ${text};
        }
      `;
    case "info":
      text = contrastSelector(p.lightText, p.darkText, p.info);
      button = contrastSelector(p.lightText, p.darkText, p.warningButtonColor);
      return `
        & button {
          background-color: ${p.infoButtonColor ?? primaryColor};
          color: ${text};
          &:hover {
            background-color: ${p.infoHoverColor ?? primaryColor} !important;
          }
        }

        & label {
          color: ${text};
        }
      `;
  }
};

export const StyledModalErrorRow = styled.div<StyledModalErrorProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  & button {
    display: flex;
    border-radius: ${(p) => p.roundness ?? 1}px;
    height: 45px;
    width: 175px;
    padding: 15px;
    font-weight: 600;
    user-select: none;
    align-items: center;
    justify-content: center;
  }

  & label {
    font-weight: 600;
    text-align: center;
    white-space: pre-wrap;
  }

  ${handleVariant}
`;

const handleVariantModal = (p: StyledModalErrorProps) => {
  switch (p.variant) {
    case "error":
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

const handleVariantTitlebar = (p: StyledModalErrorProps) => {
  let text;
  switch (p.variant) {
    case "error":
      text = contrastSelector(p.lightText, p.darkText, p.error);
      return `
        color: ${text} !important;
      `;
    case "warning":
      text = contrastSelector(p.lightText, p.darkText, p.warning);
      return `
        color: ${text} !important;
      `;
    case "info":
      text = contrastSelector(p.lightText, p.darkText, p.info);
      return `
        color: ${text} !important;
      `;
  }
};

export const StyledModalErrorTitlebar = styled.div<StyledModalErrorProps>`
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
