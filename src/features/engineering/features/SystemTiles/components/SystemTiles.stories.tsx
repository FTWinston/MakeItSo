import { SystemTiles as TilesComponent } from './SystemTiles';
import { ComponentStory } from '@storybook/react';
import { ShipSystem } from 'src/types/ShipSystem';
import { Page } from 'src/components/Page';

export default {
    title: 'Engineering/System Tiles',
    component: TilesComponent,
};

const Template: ComponentStory<typeof TilesComponent> = (args) => (
    <Page>
        <TilesComponent {...args} />
    </Page>
);

export const SystemTiles = Template.bind({});
SystemTiles.args = {
    systems: [
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
    ],
};

