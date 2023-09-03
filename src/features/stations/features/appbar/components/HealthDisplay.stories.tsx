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

export const Zero = {
  render: Template,

  args: {
    health: 0,
  },
};

export const One = {
  render: Template,

  args: {
    health: 1,
  },
};

export const TwentyFive = {
  render: Template,

  args: {
    health: 25,
  },
};

export const Fifty = {
  render: Template,

  args: {
    health: 50,
  },
};

export const Full = {
  render: Template,

  args: {
    health: 100,
  },
};
