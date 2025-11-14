import React from "react";
import Modal, { ModalRow, ModalTitlebar } from "./Modal";
import { EditorKeybind } from "Types";
import { StyledModalEditorKeybind } from "./EditorKeybindModal.styles";
import { useTheme } from "Utils";

const NewFolderModal = ({
  isOpen,
  onClose,
  keybinds,
}: {
  isOpen: boolean;
  onClose: () => void;
  keybinds: EditorKeybind[];
}) => {
  const theme = useTheme();

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
        title="Editor Keyboard Shortcuts"
        htmlFor="editor-keyboard-shortcuts"
        hasClose
        handleClose={() => {
          handleCancel(null);
        }}
      />
      {keybinds.map((keybind: EditorKeybind) => (
        <ModalRow key={keybind.id}>
          <StyledModalEditorKeybind
            lightText={theme.palette.text}
            darkText={theme.palette.darkText}
            bg={theme.palette.bg}
          >
            <div> {keybind.description}</div>
            <div>
              {keybind.keybind.map((key: string, i: number) => (
                <span key={key}>{`${i > 0 ? " + " : ""}${key}`}</span>
              ))}
            </div>
          </StyledModalEditorKeybind>
        </ModalRow>
      ))}
    </Modal>
  );
};

export default NewFolderModal;
