import { StoryObj } from '@storybook/react';
import { MazeDisplay } from './MazeDisplay';
import { generate, GenerationConfig } from '../utils/generate';

const MazeFromConfig: React.FC<GenerationConfig> = (config) => {
  const maze = generate(config);
  return <MazeDisplay maze={maze} />;
}

export default {
  title: 'Sensors/Maze',
  component: MazeFromConfig,
};

type Story = StoryObj<typeof MazeFromConfig>;

export const LowConnectivity: Story = {
  args: {
    width: 16,
    height: 16,
    connectivity: 0.001,
    numGroups: 2,
    seed: 'y',
  }
}

export const HighConnectivity: Story = {
  args: {
    width: 16,
    height: 16,
    connectivity: 0.85,
    numGroups: 4,
    seed: 'x',
  }
}
