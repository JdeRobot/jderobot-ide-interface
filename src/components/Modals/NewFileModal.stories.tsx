import React from 'react';
import type { Meta, StoryObj } from "@storybook/react-webpack5";
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
