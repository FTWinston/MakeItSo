import { Meta, StoryObj } from '@storybook/react';
import { SystemTiles } from './SystemTiles';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/features/layout';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from 'src/features/engineering/types/SystemStatusEffect';
import { SystemState } from 'src/types/SystemState';
import { createEffect } from 'src/features/engineering/utils/SystemStatusEffects';
import { getDefaultSystemState, getDefaultSystemStates } from 'src/utils/getDefaultSystemStates';

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

export const getComplexStoryTiles: () => SystemState[] = () => [
    {
        ...getDefaultSystemState(ShipSystem.Hull),
        health: 3,
        effects: [
            createEffect(1, SystemStatusEffectType.ReactorSurplus, getTime() - durationToTicks(10)),
        ],
    },
    {
        ...getDefaultSystemState(ShipSystem.Shields),
        health: 62,
        effects: [
            createEffect(1, SystemStatusEffectType.DivertTo, getTime() - durationToTicks(10)),
            createEffect(2, SystemStatusEffectType.Overcharge, getTime() - durationToTicks(1)),
            createEffect(3, SystemStatusEffectType.DivertFrom, getTime() - durationToTicks(6)),
        ],
    },
    {
        ...getDefaultSystemState(ShipSystem.Sensors),
        health: 40,
        power: 3,
        unconstrainedPower: 3,
    },
    {
        ...getDefaultSystemState(ShipSystem.Weapons),
        health: 97,
        power: 1,
        unconstrainedPower: 1,
    },
    {
        ...getDefaultSystemState(ShipSystem.Engines),
        health: 81,
        power: 4,
        unconstrainedPower: 4,
    },
    {
        ...getDefaultSystemState(ShipSystem.Reactor),
        health: 15,
    },
];

export const BasicTiles: Story = {
    args: {
        systems: [...getDefaultSystemStates().values()],
    }
};

export const ComplexTiles: Story = {
    args: {
        systems: getComplexStoryTiles(),
    }
};
