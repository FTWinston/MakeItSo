import { StoryObj } from '@storybook/react';
import { SensorBreadcrumbs } from './SensorBreadcrumbs';
import { useState } from 'react';

export default {
  title: 'Sensors/Breadcrumbs',
  component: SensorBreadcrumbs,
};

type Story = StoryObj<typeof SensorBreadcrumbs>;

export const Breadcrumbs: Story = {
  args: {
    depth: 3,
  },
  render: ({ depth: initialDepth }) => {
    const [depth, setDepth] = useState(initialDepth);
    return <SensorBreadcrumbs depth={depth} setDepth={setDepth} />
  }
};
