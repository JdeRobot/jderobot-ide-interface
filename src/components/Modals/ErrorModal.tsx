import { useError, useTheme } from "Utils";
import { ErrorType } from "Types";
import {
  StyledModalError,
  StyledModalErrorRow,
  StyledModalErrorTitlebar,
} from "./ErrorModal.styles";
import { ModalRow } from "./Modal";
import { useEffect, useRef, useState } from "react";
import { StyledModalContent } from "./Modal.styles";

export type ErrorVariant = "error" | "warning" | "info";

const ErrorModal = () => {
  const theme = useTheme();
  const { isOpen, msg, type, close } = useError();

  const [isModalOpen, setModalOpen] = useState<boolean>(isOpen);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    document.getElementById(`${type_str}-modal`)!.focus();
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  var type_str: ErrorVariant = "error";
  var type_header = "Error";

  var onClose = () => close();

  switch (type) {
    case ErrorType.ERROR:
      type_str = "error";
      type_header = "Error";
      break;
    case ErrorType.ERROR_CRITICAL:
      type_str = "error";
      type_header = "Error";
      onClose = () => {
        document.location.href = "/apps";
      };
      break;
    case ErrorType.WARNING:
      type_str = "warning";
      type_header = "Warning";
      break;
    case ErrorType.INFO:
      type_str = "info";
      type_header = "Info";
      break;

    default:
      break;
  }

  const styledProps = {
    variant: type_str,
    roundness: theme.roundness,
    error: theme.palette.error,
    errorBorder: theme.palette.border.error,
    info: theme.palette.background,
    infoBorder: theme.palette.border.info,
    warning: theme.palette.warning,
    warningBorder: theme.palette.border.warning,
    errorButtonColor: theme.palette.button.error,
    errorHoverColor: theme.palette.button.hoverError,
    infoButtonColor: theme.palette.button.info,
    infoHoverColor: theme.palette.button.hoverInfo,
    warningButtonColor: theme.palette.button.warning,
    warningHoverColor: theme.palette.button.hoverWarning,
  };

  return (
    <StyledModalError
      id={`${type_str}-modal`}
      ref={modalRef}
      onKeyDown={handleKeyDown}
      {...styledProps}
    >
      <StyledModalContent id="bt-modal-contents">
        <StyledModalErrorTitlebar {...styledProps}>
          <label htmlFor="actionName">{type_header}</label>
        </StyledModalErrorTitlebar>
        <ModalRow>
          <StyledModalErrorRow {...styledProps}>
            <label id="errorMsg">{msg}</label>
          </StyledModalErrorRow>
        </ModalRow>
        <ModalRow>
          <StyledModalErrorRow {...styledProps}>
            <button onClick={() => onClose()}>Close</button>
          </StyledModalErrorRow>
        </ModalRow>
      </StyledModalContent>
    </StyledModalError>
  );
};

export default ErrorModal;
