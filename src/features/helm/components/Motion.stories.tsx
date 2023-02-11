import { StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { SpaceMap } from 'src/features/spacemap';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { durationToTicks, getTime } from 'src/utils/timeSpans';

const ShipMotion: React.FC<GameObjectInfo> = (props) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const currentTime = getTime();

    const ship = {
        ...props,
        motion: props.motion.map(frame => ({
            ...frame,
            time: frame.time + currentTime,
        }))
    }

    return (
        <SpaceMap
            ref={canvas}
            gridColor="secondary"
            getCellRadius={() => 32}
            getCenter={() => ({ x: 0, y: 0 })}
            vessels={[ship]}
            localVessel={ship}
            sx={{
                height: '100vh',
            }}
        />
    );
};

export default {
    title: 'Helm/Motion',
    component: ShipMotion,
};

type Story = StoryObj<typeof ShipMotion>;

export const Rotate: Story = {
    args: {
        motion: [
            {
                time: 0,
                val: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
            },
            {
                time: durationToTicks(2),
                val: {
                    x: 0,
                    y: 0,
                    angle: Math.PI * 0.6667,
                },
            },
            {
                time: durationToTicks(4),
                val: {
                    x: 0,
                    y: 0,
                    angle: Math.PI * 1.3333,
                },
            },
            {
                time: durationToTicks(6),
                val: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
            }
        ]
    }
}

export const Square: Story = {
    args: {
        motion: [
            {
                time: 0,
                val: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
            },
            {
                time: durationToTicks(2),
                val: {
                    x: 5,
                    y: 0,
                    angle: 0,
                },
            },
            {
                time: durationToTicks(4),
                val: {
                    x: 5,
                    y: 5,
                    angle: 0,
                },
            },
            {
                time: durationToTicks(6),
                val: {
                    x: 0,
                    y: 5,
                    angle: 0,
                },
            },
            {
                time: durationToTicks(8),
                val: {
                    x: 0,
                    y: 0,
                    angle: 0,
                },
            },
        ]
    }
}
