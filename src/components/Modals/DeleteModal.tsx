import React from "react";
import Modal, { ModalRow, ModalTitlebar } from "./Modal";
import { Entry } from "Types";
import { StyledModalButtonDelete } from "./Modal.styles";
import { useTheme } from "Utils";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  width: fit-content;
`;

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
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <ModalTitlebar
        title="Delete confirmation"
        htmlFor="delete-modal"
        hasClose
        handleClose={() => {
          handleCancel(undefined);
        }}
      />
      <ModalRow>
        <label> Do you want to delete {selectedEntry.name} ?</label>
      </ModalRow>
      <ModalRow type="buttons">
        <button type="reset" id="cancel-delete-selected">
          Cancel
        </button>
        <StyledModalButtonDelete
          bgColor={theme.palette.button.error}
          type="submit"
          id="delete-selected-button"
        >
          Delete
        </StyledModalButtonDelete>
      </ModalRow>
    </StyledModal>
  );
};

export default DeleteModal;
