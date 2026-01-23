import React from "react";
import { useRef, useEffect, useState, ReactNode } from "react";
import {
  StyledModal,
  StyledModalActionEntry,
  StyledModalBackButton,
  StyledModalButtonRow,
  StyledModalCloseButton,
  StyledModalContent,
  StyledModalDropArea,
  StyledModalEditableList,
  StyledModalEntryList,
  StyledModalImageRow,
  StyledModalInput,
  StyledModalInputRowContainer,
  StyledModalInputSelector,
  StyledModalInputSelectorTitle,
  StyledModalRow,
  StyledModalRowDataText,
  StyledModalRowDataTextEntries,
  StyledModalRowDataTextTitle,
  StyledModalSelectIcon,
  StyledModalTitlebar,
} from "./Modal.styles";
import { contrastSelector, useTheme } from "Utils";
import { ModalInputSelectIconEntry, ModelRowTypes } from "Types";
import { MinusIcon } from "Assets";

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
      bgColor={theme.palette.bg}
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

  const text = contrastSelector(
    theme.palette.text,
    theme.palette.darkText,
    theme.palette.bg,
  );

  return (
    <StyledModalTitlebar
      color={theme.palette.text}
      altColor={theme.palette.darkText}
      bg={theme.palette.bg}
      hoverColor={theme.palette.secondary}
      roundness={theme.roundness}
    >
      {hasBack && (
        <StyledModalBackButton
          id="back-modal"
          onClick={() => {
            handleBack();
          }}
          htmlColor={text}
        />
      )}
      <label htmlFor={htmlFor}>{title}</label>
      {hasClose && (
        <StyledModalCloseButton
          id="close-modal"
          onClick={() => {
            handleClose();
          }}
          htmlColor={text}
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
    case "img":
      return (
        <StyledModalImageRow
          color={theme.palette.bg}
          roundness={theme.roundness}
          id={id}
        >
          {children}
        </StyledModalImageRow>
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

export const ModalRowDataText = ({
  id,
  title,
  data,
}: {
  id?: string;
  title: string;
  data: string[];
}) => {
  const theme = useTheme();

  if (data.length == 0) {
    return (
      <StyledModalRowDataText>
        <StyledModalRowDataTextTitle color={theme.palette.text}>
          {`${title}:`}
        </StyledModalRowDataTextTitle>
      </StyledModalRowDataText>
    );
  }

  return (
    <StyledModalRowDataText>
      <StyledModalRowDataTextTitle color={theme.palette.text}>
        {`${title}:`}
      </StyledModalRowDataTextTitle>
      <StyledModalRowDataTextEntries>
        {data.map((entry) => {
          return <label key={entry}>{entry}</label>;
        })}
      </StyledModalRowDataTextEntries>
    </StyledModalRowDataText>
  );
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
  title,
  onSelect,
  onDelete,
}: {
  list: string[];
  title?: string;
  onSelect: (event: any, entry: string) => void;
  onDelete?: (event: any, entry: string) => void;
}) => {
  const theme = useTheme();

  return (
    <>
      {title && (
        <StyledModalInputSelectorTitle>{title}</StyledModalInputSelectorTitle>
      )}
      <StyledModalEditableList
        scrollBarColor={theme.palette.scrollbar}
        roundness={theme.roundness}
      >
        {list.map((entry) => {
          return (
            <StyledModalEntryList
              color={theme.palette.text}
              entryColor={theme.palette.primary}
              hoverColor={theme.palette.secondary}
              deleteColor={theme.palette.button.error}
              roundness={theme.roundness}
              id={"project-" + entry}
              key={entry}
              onClick={(e: any) => onSelect(e, entry)}
            >
              <label>{entry}</label>
              {onDelete && (
                <MinusIcon
                  // title="Delete"
                  id={"delete-" + entry}
                  onClick={(e: any) => onDelete(e, entry)}
                  htmlColor={theme.palette.text}
                />
              )}
            </StyledModalEntryList>
          );
        })}
      </StyledModalEditableList>
    </>
  );
};

export const ModalActionList = ({
  list,
  title,
  selected,
}: {
  list: { name: string; component: JSX.Element }[];
  title?: string;
  selected: string;
}) => {
  const theme = useTheme();
  const [isOpen, open] = useState<string | undefined>(undefined);

  const openActionModal = (entry: string) => {
    if (isOpen === entry) {
      open(undefined);
    } else {
      open(entry);
    }
  };

  return (
    <>
      {title && (
        <StyledModalInputSelectorTitle>{title}</StyledModalInputSelectorTitle>
      )}
      <StyledModalEditableList
        scrollBarColor={theme.palette.scrollbar}
        roundness={theme.roundness}
      >
        {list.map((entry) => {
          return (
            <>
              <StyledModalEntryList
                color={theme.palette.text}
                entryColor={
                  selected == entry.name
                    ? theme.palette.secondary
                    : theme.palette.primary
                }
                hoverColor={theme.palette.secondary}
                deleteColor={theme.palette.button.error}
                roundness={theme.roundness}
                id={"list-" + entry.name}
                key={entry.name}
                onClick={(e: any) => openActionModal(entry.name)}
              >
                <label>{entry.name}</label>
              </StyledModalEntryList>
              {isOpen === entry.name && (
                <StyledModalActionEntry
                  color={theme.palette.text}
                  entryColor={
                    selected == entry.name
                      ? theme.palette.secondary
                      : theme.palette.primary
                  }
                  hoverColor={theme.palette.secondary}
                  deleteColor={theme.palette.button.error}
                  roundness={theme.roundness}
                  id={"list-open-" + entry.name}
                >
                  {entry.component}
                </StyledModalActionEntry>
              )}
            </>
          );
        })}
      </StyledModalEditableList>
    </>
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
        {entries && entries.map((name) => <option key={name} value={name} />)}
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
      bgColor={theme.palette.bg}
      buttonColor={theme.palette.primary}
      hoverColor={theme.palette.secondary}
      borderColor={theme.palette.primary}
      hoverBorderColor={theme.palette.bg}
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

interface ModalInputSelectIconProps {
  id: string;
  title: string;
  onChange: (event: any) => void;
  selected: string;
  entries: ModalInputSelectIconEntry[];
}

export const ModalInputSelectIcon = ({
  title,
  id,
  onChange,
  selected,
  entries,
}: ModalInputSelectIconProps) => {
  const theme = useTheme();

  return (
    <>
      <StyledModalInputSelectorTitle htmlFor={id}>
        {title}
      </StyledModalInputSelectorTitle>
      <StyledModalInputSelector>
        {entries.map((entry) => (
          <StyledModalSelectIcon
            hoverColor={theme.palette.secondary}
            selectedColor={theme.palette.primary}
            color={theme.palette.text}
            roundness={theme.roundness}
            icon={entry.iconType}
            key={entry.id}
            active={selected === entry.id}
          >
            <label>
              <input
                type="radio"
                name={id}
                value={entry.id}
                id={entry.id}
                checked={selected === entry.id}
                onChange={onChange}
              />
              <div id={"button-" + entry.id}>
                {entry.icon}
                <p> {entry.title} </p>
              </div>
            </label>
          </StyledModalSelectIcon>
        ))}
      </StyledModalInputSelector>
    </>
  );
};
