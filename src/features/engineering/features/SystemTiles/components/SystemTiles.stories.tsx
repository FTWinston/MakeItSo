import { SystemTiles as TilesComponent } from './SystemTiles';
import { StoryFn } from '@storybook/react';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/features/layout';
import { durationToTicks, getTime } from 'src/utils/timeSpans';
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
            createEffect(1, SystemStatusEffectType.Boost1, getTime() - durationToTicks(10)),
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
            createEffect(1, SystemStatusEffectType.Boost1, getTime() - durationToTicks(10)),
            createEffect(2, SystemStatusEffectType.Overload, getTime() - durationToTicks(1)),
            createEffect(3, SystemStatusEffectType.Boost2, getTime() - durationToTicks(6)),
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

export const BasicTiles = Template.bind({});
BasicTiles.args = {
    systems: getBasicStoryTiles(),
};

export const ComplexTiles = Template.bind({});
ComplexTiles.args = {
    systems: getComplexStoryTiles(),
};
