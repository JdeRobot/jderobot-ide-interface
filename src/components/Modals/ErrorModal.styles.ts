import styled from "styled-components";
import { ErrorVariant } from "./ErrorModal";
import Modal, { ModalTitlebar } from "./Modal";

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
}

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

export const StyledModalError = styled(Modal)<StyledModalErrorProps>`
  ${handleVariantModal}
`;

interface StyledModalErrorTitlebarProps {
  variant: ErrorVariant;
  color?: string;
  darkColor?: string;
}

const handleVariantTitlebar = (p: StyledModalErrorTitlebarProps) => {
  switch (p.variant) {
    case "error":
      return `
        & label {
          color: ${p.color ?? primaryColor} !important;
        }
      `;
    case "warning":
      return `
        & label {
          color: ${p.darkColor ?? primaryColor} !important;
        }
      `;
    case "info":
      return `
        & label {
          color: ${p.color ?? primaryColor} !important;
        }
      `;
  }
};

export const StyledModalErrorTitlebar = styled(ModalTitlebar)<StyledModalErrorTitlebarProps>`
  ${handleVariantTitlebar}
`;


