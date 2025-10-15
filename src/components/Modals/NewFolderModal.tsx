import React, { useState, useEffect, useRef } from "react";
import Modal, { ModalInputBox, ModalRow, ModalTitlebar } from "./Modal";
import { Entry } from "Types";

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
  const focusInputRef = useRef<HTMLInputElement>(null);
  const [folderName, setName] = useState<string>("");
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
        const path = location.split("/");

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
    let isValidName = true;

    setName(value);

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
    onSubmit(location, folderName);
    setName("");
    allowCreation(false);
    onClose();
  };

  const handleCancel = (event: React.FormEvent<HTMLFormElement> | null) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
    setName("");
    allowCreation(false);
  };

  return (
    <Modal
      id="new-folder-modal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <ModalTitlebar
        title="Create new folder"
        htmlFor="folderName"
        hasClose
        handleClose={() => {
          handleCancel(null);
        }}
      />
      <ModalRow type="input">
        <ModalInputBox
          isInputValid={isCreationAllowed || folderName === ""}
          ref={focusInputRef}
          id="folderName"
          placeholder="Folder Name"
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          required
        />
      </ModalRow>
      <ModalRow type="buttons">
        <button
          type="submit"
          id="create-new-action"
          disabled={!isCreationAllowed}
        >
          Create
        </button>
      </ModalRow>
    </Modal>
  );
};

export default NewFolderModal;
