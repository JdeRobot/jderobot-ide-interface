import { useEffect } from "react";
import "./DeleteModal.css";
import Modal, { ModalTitlebar } from "./Modal";
import { Entry } from "Types";
import {
  StyledModalButtonDelete,
  StyledModalButtonRow,
  StyledModalRow,
} from "./Modal.styles";
import { useTheme } from "Utils";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  width: fit-content;
`;

// TODO add a way to select if plain text file
const DeleteModal = ({
  onSubmit,
  isOpen,
  onClose,
  selectedEntry,
}: {
  onSubmit: Function;
  isOpen: boolean;
  onClose: Function;
  selectedEntry: Entry;
}) => {
  const theme = useTheme();
  //TODO: use relative path instead of absolute one

  useEffect(() => {
    // if (isOpen && focusInputRef.current) {
    //   setTimeout(() => {
    //     focusInputRef.current.focus();
    //   }, 0);
    // }
  }, [isOpen]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  const handleCancel = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  return (
    <StyledModal
      id="delete-modal"
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} onReset={handleCancel}>
        <ModalTitlebar
          title="Delete confirmation"
          htmlFor="delete-modal"
          hasClose
          handleClose={() => {
            handleCancel(undefined);
          }}
        />
        <StyledModalRow
          color={theme.palette.text}
          buttonColor={theme.palette.primary}
          roundness={theme.roundness}
        >
          <div>
            <label> Do you want to delete {selectedEntry.name} ?</label>
          </div>
        </StyledModalRow>
        <StyledModalButtonRow
          color={theme.palette.text}
          buttonColor={theme.palette.primary}
          roundness={theme.roundness}
        >
          <button type="reset" id="cancel-delete-selected">
            Cancel
          </button>
          <StyledModalButtonDelete
            bgColor={theme.palette.primary}
            type="submit"
            id="delete-selected-button"
          >
            Delete
          </StyledModalButtonDelete>
        </StyledModalButtonRow>
      </form>
    </StyledModal>
  );
};

export default DeleteModal;
