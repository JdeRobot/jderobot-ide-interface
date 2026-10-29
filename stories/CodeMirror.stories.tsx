/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react-vite';
import FileEditor from './../src/components/FileEditor/CodeMirror';

const meta = {
  component: FileEditor,
} satisfies Meta<typeof FileEditor>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FileEditor/>
    </div>
  )
};