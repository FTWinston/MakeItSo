import { StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { SpaceMap } from 'src/features/spacemap';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { getManeuver, ManeuverType } from '../features/maneuvers';

type PartialPropsWithMotion = Partial<GameObjectInfo> & Pick<GameObjectInfo, 'motion'>;

const ShipMotion: React.FC<PartialPropsWithMotion> = (props) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const currentTime = getTime();

    const ship: GameObjectInfo = {
        id: 1,
        draw: 'ship',
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
            objects={[ship]}
            drawExtraBackground={(ctx) => {
                ctx.fillStyle = 'green';
                for (const keyframe of props.motion) {
                    ctx.beginPath();
                    ctx.ellipse(keyframe.val.x, keyframe.val.y, 0.1, 0.1, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
            }}
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

export const Straight: Story = {
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
                time: durationToTicks(4),
                val: {
                    x: 10,
                    y: 0,
                    angle: 0,
                },
            },
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

export const StraightManeuver: Story = {
    args: {
        motion: [
            ...getManeuver(ManeuverType.SlowForward, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion,
            getManeuver(ManeuverType.SlowForward, { time: 2000, val: { x: 3.5, y: 0, angle: 0 }}).motion[1],
        ]
    }
}

export const SweepRightManeuver: Story = {
    args: {
        motion: getManeuver(ManeuverType.SweepRight, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion
    }
}

export const HardLeftManeuver: Story = {
    args: {
        motion: getManeuver(ManeuverType.HardLeft, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion
    }
}

export const DriftRightManeuver: Story = {
    args: {
        motion: getManeuver(ManeuverType.DriftRight, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion
    }
}

export const ClockwiseSpinManeuver: Story = {
    args: {
        motion: getManeuver(ManeuverType.ClockwiseSpin, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion
    }
}

export const LeftUTurn: Story = {
    args: {
        motion: getManeuver(ManeuverType.LeftUTurn, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion
    }
}

export const Backslide: Story = {
    args: {
        motion: getManeuver(ManeuverType.Backslide, { time: 0, val: { x: 0, y: 0, angle: 0 }}).motion
    }
}
