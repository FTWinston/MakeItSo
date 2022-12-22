import { SystemTile } from './SystemTile';
import { StoryFn } from '@storybook/react';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { durationToTimeSpan } from 'src/utils/timeSpans';
import { ComponentProps } from 'react';
import { ShipSystem } from 'src/types/ShipSystem';

export default {
    title: 'Engineering/System Tiles/Tile',
    component: SystemTile,
};

const Template: StoryFn<ComponentProps<typeof SystemTile>> = (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2em'}}>
        <SystemTile {...args} />
    </div>
);

export const Full = Template.bind({});
Full.args = {
    system: ShipSystem.Engines,
    health: 100,
    power: 2,
    effects: [],
};

export const Partial = Template.bind({});
Partial.args = {
    system: ShipSystem.Engines,
    health: 25,
    power: 2,
    effects: [],
};

export const Healing = Template.bind({});
Healing.args = {
    system: ShipSystem.Engines,
    health: 70,
    healAmount: 10,
    validTarget: true,
    power: 2,
    effects: [],
};


export const Zero = Template.bind({});
Zero.args = {
    system: ShipSystem.Hull,
    health: 0,
    restoration: 0,
    power: 2,
    effects: [],
};

export const PartiallyRestored = Template.bind({});
PartiallyRestored.args = {
    system: ShipSystem.Hull,
    health: 0,
    restoration: 50,
    power: 2,
    effects: [],
};

export const Restoring = Template.bind({});
Restoring.args = {
    system: ShipSystem.Hull,
    health: 0,
    restoration: 50,
    healAmount: 25,
    power: 2,
    effects: [],
};

export const OneEffect = Template.bind({});
OneEffect.args = {
    system: ShipSystem.Weapons,
    health: 75,
    power: 2,
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
    system: ShipSystem.Sensors,
    health: 82,
    power: 2,
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

export const ValidTarget = Template.bind({});
ValidTarget.args = {
    system: ShipSystem.Weapons,
    health: 88,
    validTarget: true,
    power: 2,
    effects: [
        {
            type: SystemStatusEffectType.Boost1,
            startTime: Date.now(),
            endTime: Date.now() + durationToTimeSpan(15),
            positive: true,
        },
    ],
};

export const InvalidTarget = Template.bind({});
InvalidTarget.args = {
    system: ShipSystem.Weapons,
    health: 53,
    validTarget: false,
    power: 2,
    effects: [
        {
            type: SystemStatusEffectType.Boost1,
            startTime: Date.now(),
            endTime: Date.now() + durationToTimeSpan(15),
            positive: true,
        },
    ],
};