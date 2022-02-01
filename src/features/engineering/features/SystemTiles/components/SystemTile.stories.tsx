import { SystemTile } from './SystemTile';
import { ComponentStory } from '@storybook/react';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { durationToTimeSpan } from 'src/utils/timeSpans';

export default {
    title: 'Engineering/System Tiles/Tile',
    component: SystemTile,
};

const Template: ComponentStory<typeof SystemTile> = (args) => (
    <div style={{width: '10em', height: '6em', display: 'flex', alignItems: 'stretch'}}>
        <SystemTile {...args} />
    </div>
);

export const Full = Template.bind({});
Full.args = {
    name: 'Engines',
    health: 100,
    effects: [],
};

export const Zero = Template.bind({});
Zero.args = {
    name: 'Hull',
    health: 0,
    effects: [],
};

export const OneEffect = Template.bind({});
OneEffect.args = {
    name: 'Weapons',
    health: 75,
    effects: [
        {
            type: SystemStatusEffectType.Boost1,
            startTime: Date.now(),
            endTime: Date.now() + durationToTimeSpan(15),
            positive: true,
        },
    ],
};

export const ThreeEffects = Template.bind({});
ThreeEffects.args = {
    name: 'Sensors',
    health: 82,
    effects: [
        {
            type: SystemStatusEffectType.Overload,
            startTime: Date.now(),
            endTime: Date.now() + durationToTimeSpan(15),
            positive: true,
        },
        {
            type: SystemStatusEffectType.Damage,
            startTime: Date.now(),
            endTime: Date.now() + durationToTimeSpan(12),
            positive: false,
        },
        {
            type: SystemStatusEffectType.Repair,
            startTime: Date.now(),
            endTime: Date.now() + durationToTimeSpan(5),
            positive: true,
        },
    ],
};
