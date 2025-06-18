import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { SaveIcon } from "Assets";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const Main: Story = {
  render: (args) => (
    <Button {...args}>
      <SaveIcon />
    </Button>
  ),
  args: {
    active: false,
    variant: "standard",
    title: "My Button",
    id: "id",
    onClick: () => {
      console.log("click");
    },
    children: undefined,
  },
};

export const Tabbed: Story = {
  args: {
    active: true,
    variant: "tab",
    title: "My Button",
    id: "id",
  },

  render: (args) => (
    <Button {...args}>
      <SaveIcon />
    </Button>
  ),
};
