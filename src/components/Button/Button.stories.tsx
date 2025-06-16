import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { SaveIcon } from "Assets";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const Main: Story = {
  render: (args) => <Button {...args}> <SaveIcon className="bt-icon" fill={"black"} /> </Button>,
  args: {
    active: false,
    variant: "standard",
    title: "My Button",
    id: "id",
    onClick: () => {console.log("click")},
    children: undefined,
  },
};
