import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import IdeInterface from "./IdeInterface";
import { VncViewer } from "Components";
import { SaveIcon } from "Assets";
import { ExtraApi, Entry } from "Types";

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

const api: ExtraApi = {
  file: {
    save: (project: string, file: Entry, content: string) => {
      return new Promise(() => {});
    },
    get: (project: string, file: Entry) => {
      return new Promise(() => {});
    },
  },
  universes: {
    list: (project: string) => {
      return new Promise(() => {});
    },
    get_config: (universe: string) => {
      return new Promise(() => {});
    },
  },
};

const gazeboViewer = {
  component: <VncViewer commsManager={null} port={6080} />,
  icon: <SaveIcon />,
  name: "Gazebo",
  active: false,
  activate: () => {},
};

const terminalViewer = {
  component: (
    <VncViewer
      commsManager={null}
      port={1108}
      message={"Click Play to connect "}
    />
  ),
  icon: <SaveIcon />,
  name: "Terminal",
  group: "a",
  active: false,
  activate: () => {},
};

const terminalViewer2 = {
  component: (
    <VncViewer
      commsManager={null}
      port={1108}
      message={"Click Play to connect to the Robotics Backend"}
    />
  ),
  icon: <SaveIcon />,
  name: "Terminal 2",
  active: false,
  group: "a",
  activate: () => {},
};

const terminalViewer3 = {
  component: <VncViewer commsManager={null} port={1108} message={"3"} />,
  icon: <SaveIcon />,
  name: "Terminal 3",
  active: false,
  group: "a",
  activate: () => {},
};

export const Main: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <IdeInterface
        {...args}
        commsManager={null}
        connectManager={async () => {
          return;
        }}
        project={"currentProjectname"}
        explorers={[]}
        api={api}
        extraEditors={[]}
        viewers={[
          gazeboViewer,
          terminalViewer,
          terminalViewer2,
          terminalViewer3,
        ]}
        statusBarComponents={{ extras: [] }}
      />
    </div>
  ),
  args: {
    layout: "both",
  },
};
