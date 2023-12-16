import { StoryObj } from '@storybook/react';
import { ScanItem } from './ScanItem';

export default {
  title: 'Sensors/Scan Selection/Scan Item',
  component: ScanItem,
};

type Story = StoryObj<typeof ScanItem>;

export const Active: Story = {
  args: {
    status: 'active',
    itemId: 'basic info',
    itemType: 'info',
  },
};

export const Inactive: Story = {
  args: {
    status: 'inactive',
    itemId: 'basic info',
    itemType: 'info',
  },
};

export const Available: Story = {
  args: {
    status: 'available',
    itemId: 'basic info',
    itemType: 'info',
  },
};

export const Unavailable: Story = {
  args: {
    status: 'unavailable',
    itemId: 'basic info',
    itemType: 'info',
  },
};