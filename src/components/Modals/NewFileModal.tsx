import React, { useState, useEffect, useRef } from "react";
import Modal, { ModalInputBox, ModalRow, ModalTitlebar } from "./Modal";
import { Entry } from "Types";

const NewFileModal = ({
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
  const [fileName, setName] = useState<string>("");
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
          const find = search_list.find(
            (entry: Entry) => entry.name === path[index] && entry.is_dir,
          );

          if (find !== undefined) {
            search_list = find.files;
          } else {
            search_list = [];
          }
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

    setName(value);

    if (name === "fileName") {
      if (value !== "" && !value.includes("/")) {
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
    onSubmit(location, fileName);
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
      id="new-file-modal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <ModalTitlebar
        title="Create new file"
        htmlFor="fileName"
        hasClose
        handleClose={() => {
          handleCancel(null);
        }}
      />
      <ModalRow type="input">
        <ModalInputBox
          isInputValid={isCreationAllowed || fileName === ""}
          ref={focusInputRef}
          id="fileName"
          placeholder="File Name"
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          required
        />
      </ModalRow>
      <ModalRow type="buttons">
        <button
          type="submit"
          id="create-new-file"
          disabled={!isCreationAllowed}
        >
          Create
        </button>
      </ModalRow>
    </Modal>
  );
};

export default NewFileModal;
