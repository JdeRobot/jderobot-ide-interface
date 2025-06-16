import type { Meta, StoryObj } from "@storybook/react";
import IdeInterface from "./IdeInterface";
import { newFileModalData } from "Types";

type Story = StoryObj<typeof IdeInterface>;

const meta: Meta<typeof IdeInterface> = {
  component: IdeInterface,
  argTypes: {
    layout: {
      options: ["only-editor", "only-viewers", "both"],
      control: { type: "select" },
      defaultValue: false,
      description: "Layout type",
      table: {
        type: { summary: "only-editor | only-viewers | both" },
        defaultValue: { summary: "both" },
      },
    },
    commsManager: {
      defaultValue: null,
      description: "CommsManager",
      table: {
        type: { summary: "CommsManager | null" },
        defaultValue: { summary: "null" },
      },
    },
  },
};

export default meta;

export const Main: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <IdeInterface
        {...args}
        commsManager={null}
        resetManager={() => {}}
        project={"currentProjectname"}
        explorers={[]}
        editorApi={[]}
        extraEditors={[]}
        viewers={[]}
        options={[]}
      />
    </div>
  ),
  args: {
    layout: "both",
  },
};
