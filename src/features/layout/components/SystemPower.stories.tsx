import { StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import { SystemPower } from './SystemPower';

export default {
    title: 'Layout/Shared/Power Level',
    Component: SystemPower,
};

const Template: StoryFn<ComponentProps<typeof SystemPower>> = (args) => (
    <SystemPower {...args} />
);

export const Zero = Template.bind({});
Zero.args = {
    powerLevel: 0,
};

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