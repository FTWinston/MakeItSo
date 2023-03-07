import { StoryObj } from '@storybook/react';
import { getManeuver } from '../data/Maneuvers';
import { ManeuverType } from '../types/ManeuverType';
import { ManeuverDisplay } from './ManeuverDisplay';

export default {
    title: 'Helm/Maneuvers/Maneuver Display',
    component: ManeuverDisplay,
};

type Story = StoryObj<typeof ManeuverDisplay>;

export const SlowForward: Story = {
    args: {
        ...getManeuver(ManeuverType.SlowForward, { val: { x: 0, y: 0, angle: 0, evade: 0 }, time: 0 }),
        currentPower: 1,
    }
}

export const SweepLeft: Story = {
    args: {
        ...getManeuver(ManeuverType.SweepLeft, { val: { x: 0, y: 0, angle: 0, evade: 0 }, time: 0 }),
        currentPower: 2,
    }
}

export const HardRight: Story = {
    args: {
        ...getManeuver(ManeuverType.HardRight, { val: { x: 0, y: 0, angle: 0, evade: 0 }, time: 0 }),
        currentPower: 3,
    }
}