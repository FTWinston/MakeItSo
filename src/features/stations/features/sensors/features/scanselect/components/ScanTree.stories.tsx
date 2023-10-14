import { StoryObj } from '@storybook/react';
import { useReducer } from 'react';
import { ScanTree } from './ScanTree';
import { expandState } from '../utils/expandState';
import { scanTreeReducer } from '../utils/scanTreeReducer';
import { produce } from 'immer';

export default {
  title: 'Sensors/Scan Selection/Scan Tree',
  component: ScanTree,
};

type Story = StoryObj<typeof ScanTree>;

export const Simple: Story = {
  args: expandState({
    items: [
      {
        id: '1',
        column: 1,
        row: 2,
        type: 'info'
      },
      {
        id: '2',
        column: 1,
        row: 7,
        type: 'info'
      },
      {
        id: '11',
        column: 2,
        row: 1,
        type: 'info'
      },
      {
        id: '12',
        column: 2,
        row: 2,
        type: 'info'
      },
      {
        id: '13',
        column: 2,
        row: 4,
        type: 'info'
      },
      {
        id: '14',
        column: 2,
        row: 6,
        type: 'info'
      },
      {
        id: '15',
        column: 2,
        row: 7,
        type: 'info'
      },
      {
        id: '16',
        column: 2,
        row: 8,
        type: 'info'
      },
      {
        id: '17',
        column: 3,
        row: 1,
        type: 'info'
      },
      {
        id: '18',
        column: 3,
        row: 3,
        type: 'info'
      },
      {
        id: '19',
        column: 3,
        row: 5,
        type: 'info'
      },
      {
        id: '20',
        column: 3,
        row: 7,
        type: 'info'
      }
    ],
    selectedItemIds: ['2', '14'],
    unlocks: [
      ['1', '11'],
      ['1', '12'],
      ['1', '13'],
      ['2', '13'],
      ['2', '14'],
      ['2', '15'],
      ['2', '16'],
      ['11', '17'],
      ['12', '17'],
      ['12', '18'],
      ['13', '18'],
      ['13', '19'],
      ['14', '19'],
      ['14', '20'],
      ['15', '20'],
      ['16', '20'],
    ],
  }),
  render: (args) => {
    const [state, dispatch] = useReducer(produce(scanTreeReducer), args);

    return (
      <ScanTree
        {...state}
        selectItem={item => dispatch({ type: 'select', item })}
      />
    );
  }
};
