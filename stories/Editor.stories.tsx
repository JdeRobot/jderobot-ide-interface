import type { Meta, StoryObj } from '@storybook/react-vite';
import TextEditor from "./../src/components/FileEditor/TextEditor";

const meta = {
  component: TextEditor,
} satisfies Meta<typeof TextEditor>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
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