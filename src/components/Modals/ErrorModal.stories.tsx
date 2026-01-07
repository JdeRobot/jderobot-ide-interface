import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import ErrorModal from "./ErrorModal";

type Story = StoryObj<typeof ErrorModal>;

const meta: Meta<typeof ErrorModal> = {
  component: ErrorModal,
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
      <ErrorModal />
    </div>
  ),
};
