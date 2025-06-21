import type { Meta, StoryObj } from "@storybook/react";
import NewFileModal from "./NewFileModal";

type Story = StoryObj<typeof NewFileModal>;

const meta: Meta<typeof NewFileModal> = {
  component: NewFileModal,
};

export default meta;

export const Main: Story = {
  render: (args) => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      }}
    >
      <NewFileModal
        onSubmit={() => {}}
        isOpen
        onClose={() => {}}
        fileList={[
          {
            name: "a",
            is_dir: false,
            path: "a",
            group: "",
            access: false,
            files: [],
          },
        ]}
        location={""}
      />
    </div>
  ),
};
