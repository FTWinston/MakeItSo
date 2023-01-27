import { StoryObj } from '@storybook/react';
import { ManeuverType } from '../types/ManeuverType';
import { ManeuverCard } from './ManeuverCard';

export default {
    title: 'Helm/Maneuvers/Maneuver Card',
    component: ManeuverCard,
};

type Story = StoryObj<typeof ManeuverCard>;

export const SimpleCard: Story = {
    args: {
        maneuvers: [ManeuverType.SlowForward, ManeuverType.SweepLeft, ManeuverType.SweepRight],
        currentPower: 2,
    }
}
