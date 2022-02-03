import { SystemTiles as TilesComponent } from './SystemTiles';
import { ComponentStory } from '@storybook/react';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/components/Page';
import { TileDisplayInfo } from '../types/TileInfo';
import { determineEndTime, durationToTimeSpan } from 'src/utils/timeSpans';
import { SystemStatusEffectType } from 'src/features/engineering/types/SystemStatusEffect';

export default {
    title: 'Engineering/System Tiles',
    component: TilesComponent,
    includeStories: /^[A-Z]/,
};

const Template: ComponentStory<typeof TilesComponent> = (args) => (
    <Page>
        <TilesComponent {...args} />
    </Page>
);

export const basicStoryTiles: TileDisplayInfo[] = [
    {
        system: ShipSystem.Hull,
        health: 100,
        name: 'Hull',
        effects: [],
    },
    {
        system: ShipSystem.Shields,
        health: 100,
        name: 'Shields',
        effects: [],
    },
    {
        system: ShipSystem.Sensors,
        health: 100,
        name: 'Sensors',
        effects: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 100,
        name: 'Weapons',
        effects: [],
    },
    {
        system: ShipSystem.Engines,
        health: 100,
        name: 'Engines',
        effects: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 100,
        name: 'Reactor',
        effects: [],
    },
];

export const complexStoryTiles: TileDisplayInfo[] = [
    {
        system: ShipSystem.Hull,
        health: 3,
        name: 'Hull',
        effects: [
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        ],
    },
    {
        system: ShipSystem.Shields,
        health: 62,
        name: 'Shields',
        effects: [
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: false, type: SystemStatusEffectType.Overload },
            { startTime: Date.now() - durationToTimeSpan(10), endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        ],
    },
    {
        system: ShipSystem.Sensors,
        health: 40,
        name: 'Sensors',
        effects: [],
    },
    {
        system: ShipSystem.Weapons,
        health: 97,
        name: 'Weapons',
        effects: [],
    },
    {
        system: ShipSystem.Engines,
        health: 81,
        name: 'Engines',
        effects: [],
    },
    {
        system: ShipSystem.Reactor,
        health: 15,
        name: 'Reactor',
        effects: [],
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

