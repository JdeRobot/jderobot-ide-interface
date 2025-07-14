import type { Meta, StoryObj } from "@storybook/react-webpack5";
import DeleteModal from "./DeleteModal";

type Story = StoryObj<typeof DeleteModal>;

const meta: Meta<typeof DeleteModal> = {
  component: DeleteModal,
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
      <DeleteModal
        onSubmit={() => {}}
        isOpen
        onClose={() => {}}
        selectedEntry={{
          name: "a",
          is_dir: false,
          path: "a",
          group: "",
          access: false,
          files: [],
        }}
      />
    </div>
  ),
};
