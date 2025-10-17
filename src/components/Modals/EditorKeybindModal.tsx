import React from "react";
import Modal, { ModalRow, ModalTitlebar } from "./Modal";
import { EditorKeybind } from "Types";

const NewFolderModal = ({
  isOpen,
  onClose,
  keybinds,
}: {
  isOpen: boolean;
  onClose: () => void;
  keybinds: EditorKeybind[];
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleCancel = (event: React.FormEvent<HTMLFormElement> | null) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  return (
    <Modal
      id="editor-keybinds-modal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <ModalTitlebar
        title="Editor Keybord Shortcuts"
        htmlFor="editor-keyboard-shortcuts"
        hasClose
        handleClose={() => {
          handleCancel(null);
        }}
      />
      {keybinds.map((keybind: EditorKeybind) => (
        <ModalRow key={keybind.id}>
          <div>
            <div> {keybind.description}</div>
            <div>
              {keybind.keybind.map((key: string) => (
                <span key={key}>{key}</span>
              ))}
            </div>
          </div>
        </ModalRow>
      ))}
    </Modal>
  );
};

export default NewFolderModal;
