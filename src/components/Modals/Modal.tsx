import { useRef, useEffect, useState } from "react";
import {
  StyledModal,
  StyledModalBackButton,
  StyledModalCloseButton,
  StyledModalContent,
  StyledModalTitlebar,
} from "./Modal.styles";
import { useTheme } from "Utils";

const Modal = ({
  id = "modal",
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
}: {
  id: string;
  isOpen: boolean;
  hasCloseBtn: boolean;
  onClose: Function;
  children: any;
}) => {
  const theme = useTheme();
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

    document.getElementById(id)!.focus();
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <StyledModal
      id={id}
      ref={modalRef}
      onKeyDown={handleKeyDown}
      bgColor={theme.palette.background}
      borderColor={theme.palette.secondary}
      roundness={theme.roundness}
    >
      <StyledModalContent id="bt-modal-contents">{children}</StyledModalContent>
    </StyledModal>
  );
};

export default Modal;

export const ModalTitlebar = ({
  title,
  htmlFor,
  hasClose,
  hasBack,
  handleClose,
  handleBack,
}: {
  title: string;
  htmlFor: string;
  hasClose: boolean;
  hasBack: boolean;
  handleClose: Function;
  handleBack: Function;
}) => {
  const theme = useTheme();
  return (
    <StyledModalTitlebar
      color={theme.palette.text}
      hoverColor={theme.palette.secondary}
      roundness={theme.roundness}
    >
      {hasBack && (
        <StyledModalBackButton
          id="back-modal"
          onClick={() => {
            handleBack();
          }}
          color={theme.palette.text}
        />
      )}
      <label htmlFor={htmlFor}>{title}</label>
      {hasClose && (
        <StyledModalCloseButton
          id="close-modal"
          onClick={() => {
            handleClose();
          }}
          color={theme.palette.text}
        />
      )}
    </StyledModalTitlebar>
  );
};

ModalTitlebar.defaultProps = {
  hasClose: false,
  hasBack: false,
  handleClose: () => {},
  handleBack: () => {},
};
