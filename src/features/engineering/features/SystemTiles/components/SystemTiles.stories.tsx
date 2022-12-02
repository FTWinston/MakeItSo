import { SystemTiles as TilesComponent } from './SystemTiles';
import { StoryFn } from '@storybook/react';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/components/Page';
import { SystemInfo } from '../types/TileInfo';
import { determineEndTime, durationToTimeSpan } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from 'src/features/engineering/types/SystemStatusEffect';
import { ComponentProps } from 'react';

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

export const basicStoryTiles: SystemInfo[] = [
    {
        system: ShipSystem.Hull,
        health: 100,
        name: 'Hull',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 100,
        name: 'Shields',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 100,
        name: 'Sensors',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 100,
        name: 'Weapons',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 100,
        name: 'Engines',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 100,
        name: 'Reactor',
        effects: [],
        eventLog: [],
    },
];

export const complexStoryTiles: SystemInfo[] = [
    {
        system: ShipSystem.Hull,
        health: 3,
        name: 'Hull',
        effects: [
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Shields,
        health: 62,
        name: 'Shields',
        effects: [
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: Date.now() - durationToTimeSpan(1), endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Overload },
            { startTime: Date.now() - durationToTimeSpan(6), endTime: determineEndTime(8), positive: true, type: SystemStatusEffectType.Boost1 },
        ],
        eventLog: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 40,
        name: 'Sensors',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 97,
        name: 'Weapons',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Engines,
        health: 81,
        name: 'Engines',
        effects: [],
        eventLog: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 15,
        name: 'Reactor',
        effects: [],
        eventLog: [],
    },
];

export const BasicTiles = Template.bind({});
BasicTiles.args = {
    systems: basicStoryTiles,
};

export const ComplexTiles = Template.bind({});
ComplexTiles.args = {
    systems: complexStoryTiles,
};

