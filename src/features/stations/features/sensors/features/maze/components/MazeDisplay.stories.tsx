import { StoryObj } from '@storybook/react';
import { MazeDisplay } from './MazeDisplay';
import { Random } from 'src/utils/random';
import { generate } from '../utils/generate';

export default {
  title: 'Sensors/Maze',
  component: MazeDisplay,
};

type Story = StoryObj<typeof MazeDisplay>;

export const Fixed: Story = {
  args: {
    maze: {
      cells: [
        [
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
        ],
        [
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, false, true] },
          { links: [true, true, false, true] },
        ],
        [
          { links: [true, true, true, true] },
          { links: [true, false, true, true] },
          { links: [true, false, false, false] },
          { links: [false, true, true, false] },
          { links: [false, true, true, true] },
        ],
        [
          { links: [true, true, true, true] },
          { links: [true, false, true, true] },
          { links: [false, true, true, false] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
        ],
        [
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
          { links: [true, true, true, true] },
        ],
      ]
    }
  }
}

export const LowConnectivity: Story = {
  args: {
    maze: generate({ width: 16, height: 16, connectivity: 0.001 }, new Random()),
  }
}

export const HighConnectivity: Story = {
  args: {
    maze: generate({ width: 16, height: 16, connectivity: 0.85 }, new Random()),
  }
}
