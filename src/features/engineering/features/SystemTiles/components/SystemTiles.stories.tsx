import { Meta, StoryObj } from '@storybook/react';
import { SystemTiles } from './SystemTiles';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/features/layout';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from 'src/features/engineering/types/SystemStatusEffect';
import { SystemState } from 'src/types/SystemState';
import { createEffect } from 'src/features/engineering/utils/SystemStatusEffects';

type Story = StoryObj<typeof SystemTiles>;

const meta: Meta<typeof SystemTiles> = {
    title: 'Engineering/System Tiles',
    component: SystemTiles,
    includeStories: /^[A-Z]/,
    decorators: [
        (story) => (<Page>{story()}</Page>)
    ]
};

export default meta;

export const getBasicStoryTiles: () => SystemState[] = () => [
    {
        system: ShipSystem.Hull,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
];

export const getComplexStoryTiles: () => SystemState[] = () => [
    {
        system: ShipSystem.Hull,
        health: 3,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [
            createEffect(1, SystemStatusEffectType.ReactorSurplus, getTime() - durationToTicks(10)),
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 62,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [
            createEffect(1, SystemStatusEffectType.DivertTo, getTime() - durationToTicks(10)),
            createEffect(2, SystemStatusEffectType.Overcharge, getTime() - durationToTicks(1)),
            createEffect(3, SystemStatusEffectType.DivertFrom, getTime() - durationToTicks(6)),
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 40,
        power: 3,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 97,
        power: 1,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 81,
        power: 4,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 15,
        power: 2,
        unconstrainedPower: 2,
        powerLevelChanged: false,
        effects: [],
        eventLog: [],
    },
];

export const BasicTiles: Story = {
    args: {
        systems: getBasicStoryTiles(),
    }
};

export const ComplexTiles: Story = {
    args: {
        systems: getComplexStoryTiles(),
    }
};
