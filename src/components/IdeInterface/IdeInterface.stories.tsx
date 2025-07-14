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
  component: <VncViewer commsManager={null} port={1108} />,
  icon: <SaveIcon />,
  name: "Terminal",
  active: false,
  activate: () => {},
};

export const Main: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <IdeInterface
        {...args}
        commsManager={null}
        resetManager={() => {}}
        project={"currentProjectname"}
        explorers={[]}
        api={api}
        extraEditors={[]}
        viewers={[gazeboViewer, terminalViewer]}
        statusBarComponents={{ extras: [] }}
      />
    </div>
  ),
  args: {
    layout: "both",
  },
};

// const explorer: ExplorerEntry = {
//   name: "string";
//   list(project: string): Promise<string>;
//   file: {
//     create(
//       project: string,
//       location: string,
//       data: newFileData,
//     ): Promise<void>;
//     get(project: string, path: string): Promise<string>;
//     rename(project: string, oldPath: string, newPath: string): Promise<void>;
//     delete(project: string, path: string): Promise<void>;
//   };
//   folder: {
//     create(project: string, location: string, name: string): Promise<void>;
//     rename(project: string, oldPath: string, newPath: string): Promise<void>;
//     delete(project: string, path: string): Promise<void>;
//   };
// }

// export const WithExplorers: Story = {
//   render: (args) => (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <IdeInterface
//         {...args}
//         commsManager={null}
//         resetManager={() => {}}
//         project={"currentProjectname"}
//         explorers={[]}
//         editorApi={[]}
//         extraEditors={[]}
//         viewers={[gazeboViewer, terminalViewer]}
//         options={[]}
//       />
//     </div>
//   ),
//   args: {
//     layout: "both",
//   },
// };
