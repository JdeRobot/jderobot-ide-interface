import { useRef, useEffect, useState, ReactNode } from "react";
import {
  StyledModal,
  StyledModalBackButton,
  StyledModalButtonRow,
  StyledModalCloseButton,
  StyledModalContent,
  StyledModalDeleteButton,
  StyledModalDropArea,
  StyledModalEditableList,
  StyledModalInput,
  StyledModalInputRowContainer,
  StyledModalRow,
  StyledModalTitlebar,
} from "./Modal.styles";
import { useTheme } from "Utils";
import { ModelRowTypes } from "Types";

const Modal = ({
  id = "modal",
  isOpen,
  onClose,
  children,
  onSubmit,
  onReset,
}: {
  id: string;
  isOpen: boolean;
  onClose: Function;
  children: any;
  onSubmit?: (event: any) => void;
  onReset?: (event: any) => void;
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
      <StyledModalContent id="bt-modal-contents">
        {onSubmit !== undefined && onReset !== undefined ? (
          <form onSubmit={onSubmit} onReset={onReset}>
            {children}
          </form>
        ) : (
          <>{children}</>
        )}
      </StyledModalContent>
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
          viewBox="-2.4 -2.4 36 36"
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
          viewBox="0 0 20 20"
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

export const ModalRow = ({
  type,
  id,
  children,
}: {
  type: ModelRowTypes;
  id?: string;
  children?: ReactNode;
}) => {
  const theme = useTheme();

  switch (type) {
    case "buttons":
      return (
        <StyledModalRow
          id={id}
          color={theme.palette.text}
          buttonColor={theme.palette.primary}
          roundness={theme.roundness}
        >
          <StyledModalButtonRow
            color={theme.palette.text}
            buttonColor={theme.palette.primary}
            roundness={theme.roundness}
          >
            {children}
          </StyledModalButtonRow>
        </StyledModalRow>
      );
    case "input":
      return (
        <StyledModalInputRowContainer id={id}>
          {children}
        </StyledModalInputRowContainer>
      );
    case "list":
      return (
        <StyledModalEditableList id={id}>{children}</StyledModalEditableList>
      );

    default:
      return (
        <StyledModalRow
          id={id}
          color={theme.palette.text}
          buttonColor={theme.palette.primary}
          roundness={theme.roundness}
        >
          {children}
        </StyledModalRow>
      );
  }
};

ModalRow.defaultProps = {
  type: "all",
};

interface ModalInputBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
  id: string;
  description?: string;
  placeholder: string;
  onChange: (event: any) => void;
  isInputValid: boolean;
}

export const ModalInputBox = ({
  ref,
  id,
  placeholder,
  onChange,
  isInputValid,
  description,
  ...props
}: ModalInputBoxProps) => {
  const theme = useTheme();

  return (
    <StyledModalInput
      color={theme.palette.text}
      placeholderColor={theme.palette.placeholderText}
      bgColor={theme.palette.primary}
      borderColor={theme.palette.text}
      focusBorderColor={theme.palette.secondary}
      invalidBorderColor={theme.palette.error}
      roundness={theme.roundness}
      valid={isInputValid}
    >
      <input
        ref={ref}
        id={id}
        name={id}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <label htmlFor={id}>{placeholder}</label>
      {description && <div>{description}</div>}
    </StyledModalInput>
  );
};

export const ModalEditableList = ({
  list,
  onSelect,
  onDelete,
}: {
  list: string[];
  onSelect: (event: any, entry: string) => void;
  onDelete: (event: any, entry: string) => void;
}) => {
  const theme = useTheme();

  return (
    <StyledModalEditableList
      bgColor={theme.palette.background}
      color={theme.palette.text}
      scrollBarColor={theme.palette.scrollbar}
      entryColor={theme.palette.primary}
      hoverColor={theme.palette.secondary}
      deleteColor={theme.palette.button.error}
      roundness={theme.roundness}
    >
      {list.map((entry) => {
        return (
          <div id={"project-" + entry} onClick={(e: any) => onSelect(e, entry)}>
            <label>{entry}</label>
            <StyledModalDeleteButton
              viewBox="0 0 20 20"
              title="Delete"
              id={"delete-" + entry}
              onClick={(e: any) => onDelete(e, entry)}
              color={theme.palette.text}
            />
          </div>
        );
      })}
    </StyledModalEditableList>
  );
};

interface ModalInputDropdownProps extends ModalInputBoxProps {
  entries?: string[];
}

export const ModalInputDropdown = ({
  ref,
  id,
  placeholder,
  onChange,
  isInputValid,
  description,
  entries,
  ...props
}: ModalInputDropdownProps) => {
  const theme = useTheme();

  return (
    <StyledModalInput
      color={theme.palette.text}
      placeholderColor={theme.palette.placeholderText}
      bgColor={theme.palette.primary}
      borderColor={theme.palette.text}
      focusBorderColor={theme.palette.secondary}
      invalidBorderColor={theme.palette.error}
      roundness={theme.roundness}
      valid={isInputValid}
    >
      <input
        ref={ref}
        id={id}
        name={id}
        list={id + "-list"}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <label htmlFor={id}>{placeholder}</label>
      <datalist id={id + "-list"}>
        {entries && entries.map((name) => <option value={name} />)}
      </datalist>
      {description && <div>{description}</div>}
    </StyledModalInput>
  );
};

interface ModalInputDropAreaProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  areaRef: React.RefObject<HTMLLabelElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  id: string;
  dropTitle: string;
  onChange: (event: any) => void;
  onDrop: (event: any) => void;
}

export const ModalInputDropArea = ({
  areaRef,
  inputRef,
  id,
  dropTitle,
  onChange,
  onDrop,
  ...props
}: ModalInputDropAreaProps) => {
  const theme = useTheme();
  const [dropActive, setDropActive] = useState<boolean>(false);

  return (
    <StyledModalDropArea
      ref={areaRef}
      id={id + "-area"}
      htmlFor={id}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={() => setDropActive(true)}
      onDragLeave={() => setDropActive(false)}
      onDrop={(e) => onDrop(e)}
      text={theme.palette.text}
      bgColor={theme.palette.background}
      buttonColor={theme.palette.primary}
      hoverColor={theme.palette.secondary}
      borderColor={theme.palette.primary}
      hoverBorderColor={theme.palette.background}
      roundness={theme.roundness}
      active={dropActive}
    >
      <span className="bt-modal-drop-title">{dropTitle}</span>
      or
      <input
        ref={inputRef}
        id={id}
        name={id}
        title={dropTitle}
        onChange={onChange}
        {...props}
      />
    </StyledModalDropArea>
  );
};
