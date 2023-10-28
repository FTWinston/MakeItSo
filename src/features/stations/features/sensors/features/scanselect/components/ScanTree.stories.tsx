import { StoryObj } from '@storybook/react';
import { produce } from 'immer';
import { useReducer } from 'react';
import { ScanTree } from './ScanTree';
import { createDefinitionFromTemplate } from '../utils/createDefinitionFromTemplate';
import { expandState } from '../utils/expandState';
import { scanTreeReducer } from '../utils/scanTreeReducer';
import { playerShip } from 'src/assets/settings/testSetting';

export default {
  title: 'Sensors/Scan Selection/Scan Tree',
  component: ScanTree,
};

type Story = StoryObj<typeof ScanTree>;

export const Fixed: Story = {
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
        id: '21',
        column: 3,
        row: 1,
        type: 'info'
      },
      {
        id: '22',
        column: 3,
        row: 3,
        type: 'info'
      },
      {
        id: '23',
        column: 3,
        row: 5,
        type: 'info'
      },
      {
        id: '24',
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
      ['11', '21'],
      ['12', '21'],
      ['12', '22'],
      ['13', '22'],
      ['13', '23'],
      ['14', '23'],
      ['14', '24'],
      ['15', '24'],
      ['16', '24'],
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

export const Random: Story = {
  render: (args) => {
    const [state, dispatch] = useReducer(
      produce(scanTreeReducer),
      expandState(
        createDefinitionFromTemplate(
          playerShip.scanTree
        )
      )
    );

    return (
      <ScanTree
        {...state}
        selectItem={item => dispatch({ type: 'select', item })}
      />
    );
  }
};
