import { SystemTiles as TilesComponent } from './SystemTiles';
import { StoryFn } from '@storybook/react';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/components/Page';
import { determineEndTime, durationToTimeSpan } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from 'src/features/engineering/types/SystemStatusEffect';
import { ComponentProps } from 'react';
import { SystemState } from 'src/types/SystemState';

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
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 100,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 100,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 100,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 100,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 100,
        power: 100,
        effects: [],
        eventLog: [],
    },
];

export const getComplexStoryTiles: () => SystemState[] = () => [
    {
        system: ShipSystem.Hull,
        health: 3,
        power: 100,
        effects: [
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 62,
        power: 100,
        effects: [
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: Date.now() - durationToTimeSpan(1), endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Overload },
            { startTime: Date.now() - durationToTimeSpan(6), endTime: determineEndTime(8), positive: true, type: SystemStatusEffectType.Boost2 },
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 40,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 97,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 81,
        power: 100,
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 15,
        power: 100,
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

