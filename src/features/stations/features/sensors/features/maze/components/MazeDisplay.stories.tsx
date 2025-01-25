import { StoryObj } from '@storybook/react';
import { MazeDisplay } from './MazeDisplay';
import { generate, GenerationConfig } from '../utils/generate';
import { useEffect, useReducer, useRef } from 'react';
import { mazeReducer } from '../utils/mazeReducer';
import { produce } from 'immer';
import { north, west, south, east } from '../types/Maze';
import { Box, Button } from 'src/lib/mui';

const MazeFromConfig: React.FC<GenerationConfig> = (config) => {
  const [maze, dispatch] = useReducer(produce(mazeReducer), config, generate);

  const upButton = useRef<HTMLButtonElement>(null);
  const downButton = useRef<HTMLButtonElement>(null);
  const leftButton = useRef<HTMLButtonElement>(null);
  const rightButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          upButton.current?.click();
          break;
        case 'ArrowLeft':
          leftButton.current?.click();
          break;
        case 'ArrowDown':
          downButton.current?.click();
          break;
        case 'ArrowRight':
          rightButton.current?.click();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);
  
  return (
    <div>
      <MazeDisplay maze={maze} />

      <Box display="grid" width="14em" margin="1em" gridTemplateColumns="1fr 1fr 1fr" gridTemplateRows="1fr 1fr" gap="0.25em">
        <Button ref={upButton} variant="outlined" onClick={() => dispatch({ type: 'move', direction: north, entity: 1 })} style={{ gridRow: 1, gridColumn: 2 }}>/\</Button>
        <Button ref={leftButton} variant="outlined" onClick={() => dispatch({ type: 'move', direction: west, entity: 1 })} style={{ gridRow: 2, gridColumn: 1 }}>&lt;</Button>
        <Button ref={downButton} variant="outlined" onClick={() => dispatch({ type: 'move', direction: south, entity: 1 })} style={{ gridRow: 2, gridColumn: 2 }}>\/</Button>
        <Button ref={rightButton} variant="outlined" onClick={() => dispatch({ type: 'move', direction: east, entity: 1 })} style={{ gridRow: 2, gridColumn: 3 }}>&gt;</Button>
      </Box>
    </div>
  );
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
    connectivity: 0.95,
    numGroups: 4,
    seed: 'x',
  }
}

export const SingleGroup: Story = {
  args: {
    width: 27,
    height: 10,
    connectivity: 0.25,
    numGroups: 1,
    seed: 'x',
    shapeOutline: [
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    ]
  }
}
