import React, { useState, useEffect, useRef } from "react";
import Modal, { ModalTitlebar } from "./Modal";
import { useTheme } from "Utils";
import {
  StyledModalButtonRow,
  StyledModalInput,
  StyledModalInputContainer,
  StyledModalInputRowContainer,
  StyledModalRow,
} from "./Modal.styles";

const initialNewFolderModalData = {
  folderName: "",
};

interface Entry {
  name: string;
  is_dir: boolean;
  path: string;
  files: Entry[];
}

const NewFolderModal = ({
  onSubmit,
  isOpen,
  onClose,
  fileList,
  location,
}: {
  onSubmit: Function;
  isOpen: boolean;
  onClose: Function;
  fileList: Entry[];
  location: string;
}) => {
  const theme = useTheme();
  const focusInputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState(initialNewFolderModalData);
  const [isCreationAllowed, allowCreation] = useState(false);
  const [searchList, setSearchList] = useState<Entry[]>([]);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }

    if (isOpen) {
      let search_list = fileList;

      if (location) {
        var path = location.split("/");

        for (let index = 0; index < path.length; index++) {
          search_list = search_list.find(
            (entry: Entry) => entry.name === path[index] && entry.is_dir,
          )!.files;
        }
      }

      if (search_list) {
        setSearchList(search_list);
      } else {
        setSearchList([]);
      }
    }
  }, [isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    var isValidName = true;

    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "folderName") {
      if (value !== "" && !value.includes(".")) {
        searchList.some((element) => {
          if (element.name === value) {
            isValidName = false;
            return true;
          }
          return false;
        });
      } else {
        isValidName = false;
      }

      allowCreation(isValidName);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(location, formState.folderName);
    setFormState(initialNewFolderModalData);
    allowCreation(false);
    onClose();
  };

  const handleCancel = (event: React.FormEvent<HTMLFormElement> | null) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
    setFormState(initialNewFolderModalData);
    allowCreation(false);
  };

  return (
    <Modal
      id="new-folder-modal"
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} onReset={handleCancel}>
        <ModalTitlebar
          title="Create new folder"
          htmlFor="folderName"
          hasClose
          handleClose={() => {
            handleCancel(null);
          }}
        />
        <StyledModalInputRowContainer>
          <StyledModalInputContainer>
            <StyledModalInput
              ref={focusInputRef}
              type="text"
              id="folderName"
              name="folderName"
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="Folder Name"
              required
              color={theme.palette.text}
              placeholderColor={theme.palette.placeholderText}
              bgColor={theme.palette.background}
              borderColor={theme.palette.background}
              focusBorderColor={theme.palette.background}
              invalidBorderColor={theme.palette.background}
              roundness={theme.roundness}
              valid={isCreationAllowed || formState.folderName === ""}
            />
            <label htmlFor="folderName">Folder Name</label>
          </StyledModalInputContainer>
        </StyledModalInputRowContainer>
        <StyledModalRow
          color={theme.palette.text}
          buttonColor={theme.palette.primary}
          roundness={theme.roundness}
        >
          <StyledModalButtonRow
            color={theme.palette.text}
            buttonColor={theme.palette.primary}
            roundness={theme.roundness}
          >
            <button
              type="submit"
              id="create-new-action"
              disabled={!isCreationAllowed}
            >
              Create
            </button>
          </StyledModalButtonRow>
        </StyledModalRow>
      </form>
    </Modal>
  );
};

export default NewFolderModal;
