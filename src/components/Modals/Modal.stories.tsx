import type { Meta, StoryObj } from "@storybook/react-webpack5";
import NewFileModal from "./NewFileModal";
import Modal, {
  ModalActionList,
  ModalEditableList,
  ModalRow,
  ModalRowDataText,
  ModalTitlebar,
} from "./Modal";

type Story = StoryObj<typeof ModalEditableList>;

const meta: Meta<typeof ModalEditableList> = {
  component: ModalEditableList,
};

export default meta;

export const Main: Story = {
  render: (args) => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Modal
        id="universes-modal"
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        onReset={() => {}}
      >
        <ModalTitlebar
          title="Manage your Universes"
          htmlFor="actionName"
          hasClose
          handleClose={() => {}}
        />
        <ModalRow>
          <ModalEditableList
            list={[
              "a",
              "sfayguh",
              "stavyjb",
              "ycavybun",
              "cavshbjn",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
            ]}
            onSelect={() => {}}
          />
        </ModalRow>
        <ModalRow>
          <ModalRowDataText
            title="Subtrees"
            data={[
              "a",
              "sfayguh",
              "stavyjb",
              "ycavybun",
              "cavshbjn",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
              "acvsbhnj",
            ]}
          />
        </ModalRow>
        <ModalRow type="buttons">
          <button type="button" onClick={() => {}}>
            New custom universe
          </button>
          <button type="button" onClick={() => {}}>
            Import from zip
          </button>
          <button type="button" onClick={() => {}}>
            Import from
          </button>
        </ModalRow>
      </Modal>
    </div>
  ),
};
