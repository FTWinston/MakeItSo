import { SystemTiles as TilesComponent } from './SystemTiles';
import { StoryFn } from '@storybook/react';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/features/layout';
import { durationToTimeSpan, getTime } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from 'src/features/engineering/types/SystemStatusEffect';
import { ComponentProps } from 'react';
import { SystemState } from 'src/types/SystemState';
import { createEffect } from 'src/features/engineering/utils/SystemStatusEffects';

export default {
    title: 'Engineering/System Tiles',
    component: TilesComponent,
    includeStories: /^[A-Z]/,
};

const Template: StoryFn<ComponentProps<typeof TilesComponent>> = (args) => (
    <Page>
        <TilesComponent {...args} />
    </Page>
);

export const getBasicStoryTiles: () => SystemState[] = () => [
    {
        system: ShipSystem.Hull,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 100,
        power: 2,
        unconstrainedPower: 2,
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
        effects: [
            createEffect(SystemStatusEffectType.Boost1, getTime() - durationToTimeSpan(10)),
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 62,
        power: 2,
        unconstrainedPower: 2,
        effects: [
            createEffect(SystemStatusEffectType.Boost1, getTime() - durationToTimeSpan(10)),
            createEffect(SystemStatusEffectType.Overload, getTime() - durationToTimeSpan(1)),
            createEffect(SystemStatusEffectType.Boost2, getTime() - durationToTimeSpan(6)),
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 40,
        power: 3,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 97,
        power: 1,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 81,
        power: 4,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 15,
        power: 2,
        unconstrainedPower: 2,
        effects: [],
        eventLog: [],
    },
];

export const BasicTiles = Template.bind({});
BasicTiles.args = {
    systems: getBasicStoryTiles(),
};

export const ComplexTiles = Template.bind({});
ComplexTiles.args = {
    systems: getComplexStoryTiles(),
};
