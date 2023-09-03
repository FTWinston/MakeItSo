import { StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import { SystemPower } from './SystemPower';

export default {
  title: 'Layout/Shared/Power Level',
  Component: SystemPower,
};

const Template: StoryFn<ComponentProps<typeof SystemPower>> = (args) => <SystemPower {...args} />;

export const Zero = {
  render: Template,

  args: {
    powerLevel: 0,
  },
};

export const One = {
  render: Template,

  args: {
    powerLevel: 1,
  },
};

export const Two = {
  render: Template,

  args: {
    powerLevel: 2,
  },
};

export const Three = {
  render: Template,

  args: {
    powerLevel: 3,
  },
};

export const Four = {
  render: Template,

  args: {
    powerLevel: 4,
  },
};
