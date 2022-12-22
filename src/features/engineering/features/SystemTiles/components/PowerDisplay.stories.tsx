import { StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import { PowerDisplay } from './PowerDisplay';

export default {
    title: 'Engineering/System Tiles/Power Level',
    Component: PowerDisplay,
};


const Template: StoryFn<ComponentProps<typeof PowerDisplay>> = (args) => (
    <PowerDisplay {...args} />
);


export const One = Template.bind({});
One.args = {
    powerLevel: 1,
};

export const Two = Template.bind({});
Two.args = {
    powerLevel: 2,
};

export const Three = Template.bind({});
Three.args = {
    powerLevel: 3,
};

export const Four = Template.bind({});
Four.args = {
    powerLevel: 4,
};