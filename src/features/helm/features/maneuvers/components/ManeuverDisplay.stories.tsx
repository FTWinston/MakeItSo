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
        ...getManeuver(ManeuverType.SlowForward),
        enabled: true,
    }
}

export const SweepLeft: Story = {
    args: {
        ...getManeuver(ManeuverType.SweepLeft),
        enabled: true,
    }
}

export const SweepRight: Story = {
    args: {
        ...getManeuver(ManeuverType.SweepRight),
        enabled: false,
    }
}