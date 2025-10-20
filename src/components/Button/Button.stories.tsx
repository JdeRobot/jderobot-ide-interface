import React from 'react';
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Button, { MenuButtonStroke, MenuButton } from "./Button";
import {
  BackIcon,
  SaveIcon,
  OpenArrowIcon,
  SplashIcon,
  KeyboardIcon,
} from "Assets";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

export const Main: Story = {
  render: (args) => (
    <Button {...args}>
      <KeyboardIcon />
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
        <KeyboardIcon />
      </MenuButton>
    </>
  ),
};
