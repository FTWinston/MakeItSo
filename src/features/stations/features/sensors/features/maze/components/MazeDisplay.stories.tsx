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
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
        ],
        [
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, false, true] },
          { group: 1, links: [true, true, false, true] },
        ],
        [
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, false, true, true] },
          { group: 1, links: [true, false, false, false] },
          { group: 1, links: [false, true, true, false] },
          { group: 1, links: [false, true, true, true] },
        ],
        [
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, false, true, true] },
          { group: 1, links: [false, true, true, false] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
        ],
        [
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
          { group: 1, links: [true, true, true, true] },
        ],
      ]
    }
  }
}

export const LowConnectivity: Story = {
  args: {
    maze: generate({ width: 16, height: 16, connectivity: 0.001, numGroups: 2 }, new Random()),
  }
}

export const HighConnectivity: Story = {
  args: {
    maze: generate({ width: 16, height: 16, connectivity: 0.85, numGroups: 3 }, new Random()),
  }
}
