import { useState, useEffect, useRef } from "react";
import Modal, { ModalTitlebar } from "./Modal";
import { Entry } from "Types";
import { useTheme } from "Utils";
import {
  StyledModalButtonRow,
  StyledModalInput,
  StyledModalInputRowContainer,
  StyledModalRow,
} from "./Modal.styles";

const initialNewFolderModalData = {
  renameData: "",
};

const RenameModal = ({
  onSubmit,
  isOpen,
  onClose,
  fileList,
  selectedEntry,
}: {
  onSubmit: Function;
  isOpen: boolean;
  onClose: Function;
  fileList: Entry[];
  selectedEntry: Entry;
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
      setFormState((prevFormData) => ({
        ...prevFormData,
        renameData: selectedEntry.name,
      }));

      const rename = document.getElementById("renameData");

      if (rename) {
        (rename as HTMLFormElement).value = selectedEntry.name;
      }

      var path = selectedEntry.path.split("/");

      if (path.length === 1) {
        return setSearchList(fileList);
      }

      let search_list = fileList;

      for (let index = 0; index < path.length - 1; index++) {
        search_list = search_list.find(
          (entry) => entry.name === path[index] && entry.is_dir,
        )!.files;
      }

      if (search_list) {
        setSearchList(search_list);
      } else {
        setSearchList([]);
      }
    }
  }, [isOpen]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    var isValidName = true;

    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "renameData") {
      //TODO: improve check
      var preCheck;
      if (selectedEntry.is_dir) {
        preCheck = value !== "" && !value.includes(".");
      } else {
        preCheck = value !== "";
      }

      if (preCheck) {
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

  const getNewPath = (new_name: string) => {
    var split_path = selectedEntry.path.split("/"); // TODO: add for windows
    var parent_path = split_path.slice(0, split_path.length - 1).join("/");
    return parent_path + "/" + new_name;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(getNewPath(formState.renameData));
    setFormState(initialNewFolderModalData);
    allowCreation(false);
    onClose();
  };

  const handleCancel = (event: any) => {
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
          title={`Rename ${selectedEntry.is_dir ? "Folder" : "File"}`}
          htmlFor="renameData"
          hasClose
          handleClose={() => {
            handleCancel(undefined);
          }}
        />
        <StyledModalInputRowContainer>
          <StyledModalInput
            color={theme.palette.text}
            placeholderColor={theme.palette.placeholderText}
            bgColor={theme.palette.background}
            borderColor={theme.palette.background}
            focusBorderColor={theme.palette.background}
            invalidBorderColor={theme.palette.background}
            roundness={theme.roundness}
            valid={isCreationAllowed}
          >
            <input
              ref={focusInputRef}
              type="text"
              id="renameData"
              name="renameData"
              onChange={handleInputChange}
              autoComplete="off"
              placeholder={
                selectedEntry.is_dir ? "Rename Folder" : "Rename File"
              }
              required
            />
            <label htmlFor="renameData">
              Rename {selectedEntry.is_dir ? "Folder" : "File"}
            </label>
          </StyledModalInput>
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
            <button type="reset">Cancel</button>
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

export default RenameModal;
