import { StoryObj } from '@storybook/react';
import { produce } from 'immer';
import { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import { Box, Button } from 'src/lib/mui';
import { MazeDisplay } from './MazeDisplay';
import { generateSystem, generateShipOverview, SystemGenerationConfig, ShipOverviewGenerationConfig } from '../utils/generate';
import { mazeReducer } from '../utils/mazeReducer';
import { north, west, south, east } from '../types/Maze';

type Props = ({
    type: 'ship';
    config: ShipOverviewGenerationConfig;
} | {
    type: 'system';
    config: SystemGenerationConfig;
}) & {
    damageFraction: number;
    visibilityRange: number;
}

const MazeFromConfig: React.FC<Props> = (props) => {
    const [maze, dispatch] = useReducer(produce(mazeReducer), props.config as any, props.type === 'ship' ? generateShipOverview : generateSystem as any);

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

        const tickInterval = setInterval(() => dispatch({ type: 'tick' }), 500);

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(tickInterval);
        };
    }, [dispatch]);
  
    useLayoutEffect(() => {
       dispatch({ type: 'damage', fraction: props.damageFraction });
    }, [props.damageFraction]);
    
    useLayoutEffect(() => {
        dispatch({ type: 'visibility', range: props.visibilityRange });
    }, [props.visibilityRange]);

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

export const ShipOverview: Story = {
    args: {
        type: 'ship',
        config: {
            width: 27,
            height: 10,
            connectivity: 0.25,
            seed: 'x',
            numFakeGoals: 5,
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
        },
        damageFraction: 0,
        visibilityRange: 3,
    }
}

export const SystemDetail: Story = {
    args: {
        type: 'system',
        config: {
            width: 16,
            height: 16,
            connectivity: 0.95,
            numGroups: 4,
            seed: 'x',
        },
        damageFraction: 0,
        visibilityRange: 6,
    }
}
