import { StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import { HealthDisplay } from './HealthDisplay';

export default {
    title: 'Layout/Shared/Health Indicator',
    Component: HealthDisplay,
};


const Template: StoryFn<ComponentProps<typeof HealthDisplay>> = (args) => (
    <HealthDisplay {...args} />
);

export const Zero = Template.bind({});
Zero.args = {
    health: 0,
};

export const One = Template.bind({});
One.args = {
    health: 1,
};

export const TwentyFive = Template.bind({});
TwentyFive.args = {
    health: 25,
};

export const Fifty = Template.bind({});
Fifty.args = {
    health: 50,
};

export const Full = Template.bind({});
Full.args = {
    health: 100,
};