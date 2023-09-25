import { StoryObj } from '@storybook/react';
import { ScanItem } from './ScanItem';

export default {
  title: 'Sensors/Scan Selection/Scan Item',
  component: ScanItem,
};

type Story = StoryObj<typeof ScanItem>;

export const Active: Story = {
  args: {
    title: 'This is a scan item',
    status: 'active',
  },
};

export const Inactive: Story = {
  args: {
    title: 'This is a scan item',
    status: 'inactive',
  },
};

export const Available: Story = {
  args: {
    title: 'This is a scan item',
    status: 'available',
  },
};

export const Unavailable: Story = {
  args: {
    title: 'This is a scan item',
    status: 'unavailable',
  },
};