import type { Meta, StoryObj } from "@storybook/react";
import UploadModal from "./UploadModal";

type Story = StoryObj<typeof UploadModal>;

const meta: Meta<typeof UploadModal> = {
  component: UploadModal,
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
      <UploadModal
        onSubmit={() => {}}
        isOpen
        onClose={() => {}}
        upload={() => {}}
        currentProject=""
        location={""}
      />
    </div>
  ),
};
