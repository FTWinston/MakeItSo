import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useInterval } from 'src/hooks/useInterval';
import { PowerLevel } from 'src/types/ShipSystem';
import { getManeuver } from '../data/Maneuvers';
import { ManeuverType } from '../types/ManeuverType';
import { ManeuverDisplay } from './ManeuverDisplay';

interface Props {
    maneuver: ManeuverType;
    currentPower: PowerLevel;
}

const RotatingManeuver: React.FC<Props> = props => {
    const [angle, setAngle] = useState(0);

    useInterval(() => {
        let newAngle = angle + 1;
        if (newAngle >= 6) {
            newAngle = 0;
        }
        setAngle(newAngle);
    }, 2000);

    return <ManeuverDisplay
        currentPower={props.currentPower}
        {...getManeuver(props.maneuver, { val: { x: 0, y: 0, angle: angle * Math.PI / 3 }, time: 0 })}
    />
}

export default {
    title: 'Helm/Maneuvers/Maneuver Display',
    component: RotatingManeuver,
};


type Story = StoryObj<typeof RotatingManeuver>;

export const SlowForward: Story = {
    args: {
        maneuver: ManeuverType.SlowForward,
        currentPower: 1,
    }
}

export const SweepLeft: Story = {
    args: {
        maneuver: ManeuverType.SweepLeft,
        currentPower: 2,
    }
}

export const HardRight: Story = {
    args: {
        maneuver: ManeuverType.HardRight,
        currentPower: 3,
    }
}

export const DriftLeft: Story = {
    args: {
        maneuver: ManeuverType.DriftLeft,
        currentPower: 4,
    }
}

export const ClockwiseSpin: Story = {
    args: {
        maneuver: ManeuverType.ClockwiseSpin,
        currentPower: 4,
    }
}

export const Backslide: Story = {
    args: {
        maneuver: ManeuverType.Backslide,
        currentPower: 4,
    }
}

export const AboutTurn: Story = {
    args: {
        maneuver: ManeuverType.AboutTurn,
        currentPower: 3,
    }
}
