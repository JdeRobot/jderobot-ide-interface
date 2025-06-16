import type { Meta, StoryObj } from "@storybook/react";
import VncViewer from "./VncViewer";

type Story = StoryObj<typeof VncViewer>;

const meta: Meta<typeof VncViewer> = {
  component: VncViewer,
};

export default meta;

export const Main: Story = {
  render: () => (
    <div style={{ width: "100vh", height: "100vh" }}>
      <VncViewer commsManager={null} port={0} />
    </div>
  ),
};