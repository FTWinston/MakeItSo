import { SystemTile } from './SystemTile';
import { ComponentStory } from '@storybook/react';

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
    name: 'Engineering',
    health: 100,
    effects: [],
};

export const Zero = Template.bind({});
Zero.args = {
    name: 'Hull',
    health: 0,
    effects: [],
};
