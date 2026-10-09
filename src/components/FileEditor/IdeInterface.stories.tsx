import type { StoryObj } from "@storybook/react-webpack5";
import TextEditor from "./TextEditor";

type Story = StoryObj<typeof TextEditor>;

export const Main: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TextEditor
        commsManager={null}
        fileContent={""}
        setFileContent={() => {}}
        saveFile={() => {}}
        language={"python"}
        zoomLevel={0}
      />
    </div>
  )
};
