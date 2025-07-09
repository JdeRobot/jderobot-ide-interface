import { useState, useEffect, useRef } from "react";
import Modal, { ModalInputBox, ModalRow, ModalTitlebar } from "./Modal";

import { EmptyTeplateIcon, ActionTeplateIcon, IOTeplateIcon } from "Assets";
import { Entry } from "Types";
import { useTheme } from "Utils";
import styled from "styled-components";
import {
  StyledModalCardsContainer,
  StyledModalCardsEntry,
  StyledModalCardsTitle,
} from "./NewFileModal.styles";

const initialNewFileModalData = {
  fileType: "plain",
  fileName: "",
  templateType: "empty",
};

class CardEntryProps {
  public value: string;
  public id: string;
  public icon: any;
  public text: string;

  constructor(value: string, id: string, icon: any, text: string) {
    this.value = value;
    this.id = id;
    this.icon = icon;
    this.text = text;
  }
}

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
  const theme = useTheme();
  const focusInputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState(initialNewFileModalData);
  const [template, setTemplate] = useState<string>("empty");
  const [creationType, setCreationType] = useState<string>("plain");
  const [isCreationAllowed, allowCreation] = useState<boolean>(false);
  // Search lists for valid names
  const [searchActionsList, setSearchActionsList] = useState<Entry[]>([]);
  const [searchPlainList, setSearchPlainList] = useState<Entry[]>([]);

  ///////////////////////// TYPES ////////////////////////////////////////////////
  const plain = new CardEntryProps(
    "plain",
    "plainType",
    <ActionTeplateIcon viewBox="0 0 6.4 6.4" fill={theme.palette.text} />,
    "Plain File",
  );
  const actions = new CardEntryProps(
    "actions",
    "actionsType",
    <IOTeplateIcon viewBox="0 0 20 20" fill={theme.palette.text} />,
    "Action",
  );

  ///////////////////////// ACTIONS //////////////////////////////////////////////
  const empty = new CardEntryProps(
    "empty",
    "emptyTemplate",
    <EmptyTeplateIcon viewBox="0 0 20 20" stroke={theme.palette.text} />,
    "Empty",
  );
  const action = new CardEntryProps(
    "action",
    "actionTemplate",
    <ActionTeplateIcon viewBox="0 0 6.4 6.4" fill={theme.palette.text} />,
    "Action",
  );
  const io = new CardEntryProps(
    "io",
    "ioTemplate",
    <IOTeplateIcon viewBox="0 0 20 20" fill={theme.palette.text} />,
    "I/O",
  );

  const typesCardEntryProps = [plain, actions];
  const actionsCardEntryProps = [empty, action, io];

  const onOptionTypeChange = (e: any) => {
    console.log(e);
    setCreationType(e.target.value);
    handleInputChange(e);
  };

  const onOptionTemplateChange = (e: any) => {
    setTemplate(e.target.value);
    handleInputChange(e);
  };

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
    setCreationType("plain");
    setTemplate("empty");

    if (isOpen) {
      //NOTE: One for actions and one for location
      createValidNamesList(location, setSearchPlainList);
      createValidNamesList("actions", setSearchActionsList);
    }
  }, [isOpen]);

  useEffect(() => {
    updateCreation(formState["fileName"]);
  }, [creationType]);

  const createValidNamesList = (orig_path: string, callback: Function) => {
    let search_list = fileList;

    if (orig_path) {
      var path = orig_path.split("/");

      for (let index = 0; index < path.length; index++) {
        const find = search_list.find(
          (entry) => entry.name === path[index] && entry.is_dir,
        );

        if (find !== undefined) {
          search_list = find.files;
        } else {
          search_list = [];
        }
      }
    }

    if (search_list) {
      callback(search_list);
    } else {
      callback([]);
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "fileName") {
      updateCreation(value);
    }
  };

  const updateCreation = (newName: string) => {
    var isValidName = true;
    var preCheck, checkList;

    if (creationType === "actions") {
      preCheck =
        newName !== "" && !newName.includes(".") && !newName.includes("/");
      checkList = searchActionsList;
    } else {
      preCheck = newName !== "" && !newName.includes("/");
      checkList = searchPlainList;
    }

    if (preCheck && checkList) {
      checkList.some((element) => {
        var name = element.name;

        if (creationType === "actions") {
          name = name.replace(".py", "");
        }

        if (name === newName) {
          isValidName = false;
          return true;
        }
        return false;
      });
    } else {
      isValidName = false;
    }
    console.log(creationType, checkList);

    allowCreation(isValidName);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(location, formState);
    setFormState(initialNewFileModalData);
    allowCreation(false);
  };

  const handleCancel = (event: any) => {
    if (event) {
      event.preventDefault();
    }

    onClose();
    setFormState(initialNewFileModalData);
    allowCreation(false);
  };

  return (
    <Modal
      id="new-action-modal"
      isOpen={isOpen}
      onClose={handleCancel}
      onSubmit={handleSubmit}
      onReset={handleCancel}
    >
      <ModalTitlebar
        title="Create new file"
        htmlFor="fileName"
        hasClose
        handleClose={handleCancel}
      />
      <ModalRow type="input">
        <ModalInputBox
          isInputValid={isCreationAllowed || formState.fileName === ""}
          ref={focusInputRef}
          id="renameData"
          placeholder="File Name"
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          required
        />
      </ModalRow>
      <CardSelector
        contentArray={typesCardEntryProps}
        title="Select File Type"
        id="types-list"
        name="fileType"
        checkedVariable={creationType}
        checkedCallback={onOptionTypeChange}
      />
      {creationType === "actions" && (
        <TemplatesCardSelector
          contentArray={actionsCardEntryProps}
          title="Select Template Type"
          id="templates-list"
          name="templateType"
          checkedVariable={template}
          checkedCallback={onOptionTemplateChange}
        />
      )}
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

export default NewFileModal;

const CardSelector = ({
  contentArray,
  title,
  id,
  name,
  checkedVariable,
  checkedCallback,
}: {
  contentArray: CardEntryProps[];
  title: string;
  id: string;
  name: string;
  checkedVariable: string;
  checkedCallback: (e: any) => void;
}) => {
  const theme = useTheme();
  return (
    <ModalRow>
      <StyledModalCardsTitle htmlFor="templateType">
        {title}
      </StyledModalCardsTitle>
      <StyledModalCardsContainer>
        {contentArray.map((x) => (
          <CardEntry
            cardEntryProp={x}
            name={name}
            checkedVariable={checkedVariable}
            checkedCallback={checkedCallback}
          />
        ))}
      </StyledModalCardsContainer>
    </ModalRow>
  );
};

const TemplatesCardSelector = styled(CardSelector)`
  height: 170px;
`;

const CardEntry = ({
  cardEntryProp,
  name,
  checkedVariable,
  checkedCallback,
}: {
  cardEntryProp: CardEntryProps;
  name: string;
  checkedVariable: string;
  checkedCallback: (e: any) => void;
}) => {
  const theme = useTheme();

  return (
    <StyledModalCardsEntry
      hoverColor={theme.palette.secondary}
      selectedColor={theme.palette.primary}
      color={theme.palette.text}
      roundness={theme.roundness}
      active={checkedVariable === cardEntryProp.value}
    >
      <label>
        <input
          type="radio"
          name={name}
          value={cardEntryProp.value}
          id={cardEntryProp.id}
          checked={checkedVariable === cardEntryProp.value}
          onChange={(e: any) => {
            checkedCallback(e);
            console.log(e);
          }}
        />
        <div id={"button-" + cardEntryProp.id}>
          {cardEntryProp.icon}
          <p> {cardEntryProp.text} </p>
        </div>
      </label>
    </StyledModalCardsEntry>
  );
};
