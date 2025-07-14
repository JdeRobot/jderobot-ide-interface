import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Button, { MenuButtonStroke, MenuButton } from "./Button";
import {
  ActionTeplateIcon,
  BackIcon,
  CloseIcon,
  DeleteIcon,
  EmptyTeplateIcon,
  IOTeplateIcon,
  OpenFolderIcon,
  RenameIcon,
  ResetIcon,
  SaveIcon,
  BaseFileIcon,
  ActionFileIcon,
  ClosedFolderIcon,
  ClosedArrowIcon,
  OpenArrowIcon,
  SplashIcon,
} from "Assets";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const Main: Story = {
  render: (args) => (
    <Button {...args}>
      <BackIcon />
    </Button>
  ),
  args: {
    active: false,
    isLabel: false,
    variant: "standard",
    title: "My Button",
    id: "id",
    onClick: () => {
      console.log("click");
    },
    children: undefined,
    iconType: "fill",
  },
};

export const Tabbed: Story = {
  args: {
    active: true,
    variant: "tab",
    title: "My Button",
    id: "id",
    iconType: "fill",
  },

  render: (args) => (
    <Button {...args}>
      <SaveIcon />
    </Button>
  ),
};

export const MenuButtons: Story = {
  args: {
    title: "My Button",
    id: "id",
  },

  render: (args) => (
    <>
      <MenuButtonStroke {...args}>
        <OpenArrowIcon />
      </MenuButtonStroke>
      <MenuButton {...args}>
        <SplashIcon />
      </MenuButton>
    </>
  ),
};
