import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import VncViewer from "./VncViewer";

type Story = StoryObj<typeof VncViewer>;

const meta: Meta<typeof VncViewer> = {
  component: VncViewer,
};

export default meta;

export const Main: Story = {
  render: () => (
    <div style={{ width: "100%", height: "50vh" }}>
      <VncViewer commsManager={null} port={0} />
    </div>
  ),
};
