import { StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ScanTree } from './ScanTree';

export default {
  title: 'Sensors/Scan Selection/Scan Tree',
  component: ScanTree,
};

type Story = StoryObj<typeof ScanTree>;

export const Simple: Story = {
  args: {
    columns: [
      [
        {
          id: '1',
          row: 2,
          type: 'info'
        },
        {
          id: '2',
          row: 5,
          type: 'info'
        },
      ],
      [
        {
          id: '11',
          row: 1,
          type: 'info'
        },
        {
          id: '12',
          row: 2,
          type: 'info'
        },
        {
          id: '13',
          row: 4,
          type: 'info'
        },
        {
          id: '14',
          row: 5,
          type: 'info'
        },
        {
          id: '15',
          row: 6,
          type: 'info'
        },
        {
          id: '16',
          row: 8,
          type: 'info'
        }
      ]
    ],
    selectedItemIds: ['2', '14'],
    //hiddenItemIds: [],
    unlocks: {
      '1': ['11', '12'],
      '2': ['13', '14', '15', '16'],
    },
  },
  render: (args) => {
    //const [selectedItem, setSelectedItem] = useState(args.selectedItem);
    return (
      <ScanTree
        {...args}
        //selectedItem={selectedItem}
        //selectItem={setSelectedItem}
      />
    );
  }
};
