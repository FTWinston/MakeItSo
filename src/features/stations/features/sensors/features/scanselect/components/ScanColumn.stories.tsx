import { StoryObj } from '@storybook/react';
import { ScanColumn } from './ScanColumn';
import { useState } from 'react';

export default {
  title: 'Sensors/Scan Selection/Scan Column',
  component: ScanColumn,
};

type Story = StoryObj<typeof ScanColumn>;

export const Available: Story = {
  args: {
    items: [
      {
        id: '1',
        row: 1,
        type: 'info'
      },
      {
        id: '2',
        row: 2,
        type: 'info'
      },
      {
        id: '3',
        row: 4,
        type: 'info'
      },
      {
        id: '4',
        row: 5,
        type: 'info'
      },
      {
        id: '5',
        row: 6,
        type: 'info'
      },
      {
        id: '6',
        row: 8,
        type: 'info'
      }
    ],
    availableItemIds: ['1', '2', '4', '5'],
  },
  render: (args) => {
    const [selectedItem, setSelectedItem] = useState(args.selectedItemId);
    return (
      <ScanColumn
        {...args}
        selectedItemId={selectedItem}
        selectItem={setSelectedItem}
      />
    );
  }
};

export const Enabled: Story = {
  ...Available,
  args: {
    ...Available.args,
    selectedItemId: '4',
  },
};

export const Disabled: Story = {
  ...Available,
  args: {
    ...Enabled.args,
    availableItemIds: [],
  },
};
