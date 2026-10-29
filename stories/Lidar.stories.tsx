/* eslint-disable react/react-in-jsx-scope */
import { Points, ThreeDimensionalCanvas, ThreeDimensionalControls, type PointBaseProps } from '@arizeai/point-cloud';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const data: PointBaseProps[] = [
  { position: [0, 0, 0], metaData: {} },
  { position: [1, 1, 1], metaData: {} },
];

export const PointCloud = () => {
  const [scale, setScale] = useState(1);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>

    <ThreeDimensionalCanvas>
      <ThreeDimensionalControls />
      <Points data={data} pointProps={{ color: '#7BFFFF' ,scale:scale, size:1}} />
    </ThreeDimensionalCanvas>
          <input
        type="range"
        min={0.1}
        max={10}
        step={0.1}
        value={scale}
        onChange={(e) => setScale(parseFloat(e.target.value))}
      />
    </div>
  );
};

const meta = {
  component: PointCloud,
} satisfies Meta<typeof PointCloud>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <PointCloud/>
    </div>
  )
};