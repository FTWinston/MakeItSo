import { StoryObj } from '@storybook/react';
import { produce } from 'immer';
import { useReducer } from 'react';
import { ScanTree } from './ScanTree';
import { createDefinitionFromTemplate } from '../utils/createDefinitionFromTemplate';
import { expandState } from '../utils/expandState';
import { scanTreeReducer } from '../utils/scanTreeReducer';
import { hostileShip, playerShip } from 'src/assets/scenarios/testScenario';

export default {
  title: 'Sensors/Scan Selection/Scan Tree',
  component: ScanTree,
};

type Story = StoryObj<typeof ScanTree>;

export const Fixed: Story = {
  args: expandState({
    items: [
      {
        id: 'basic info',
        row: 1,
        column: 2,
        type: 'info'
      },
      {
        id: 'shield power',
        row: 1,
        column: 7,
        type: 'info'
      },
      {
        id: 'engine power',
        row: 2,
        column: 1,
        type: 'info'
      },
      {
        id: 'shield vulnerability',
        row: 2,
        column: 2,
        type: 'info'
      },
      {
        id: 'engine vulnerability',
        row: 2,
        column: 4,
        type: 'info'
      },
      {
        id: 'weapon power',
        row: 2,
        column: 6,
        type: 'info'
      },
      {
        id: 'weapon vulnerability',
        row: 2,
        column: 7,
        type: 'info'
      },
      {
        id: 'sensor power',
        row: 2,
        column: 8,
        type: 'info'
      },
      {
        id: 'sensor vulnerability',
        row: 3,
        column: 1,
        type: 'info'
      },
      {
        id: 'fake extra 1',
        row: 3,
        column: 3,
        type: 'info'
      },
      {
        id: 'fake extra 2',
        row: 3,
        column: 5,
        type: 'info'
      },
      {
        id: 'fake extra 3',
        row: 3,
        column: 7,
        type: 'info'
      }
    ],
    selectedItemIds: ['shield power', 'weapon power'],
    unlocks: [
      ['basic info', 'engine power'],
      ['basic info', 'shield vulnerability'],
      ['basic info', 'engine vulnerability'],
      ['shield power', 'engine vulnerability'],
      ['shield power', 'weapon power'],
      ['shield power', 'weapon vulnerability'],
      ['shield power', 'sensor power'],
      ['engine power', 'sensor vulnerability'],
      ['shield vulnerability', 'sensor vulnerability'],
      ['shield vulnerability', 'fake extra 1'],
      ['engine vulnerability', 'fake extra 1'],
      ['engine vulnerability', 'fake extra 2'],
      ['weapon power', 'fake extra 2'],
      ['weapon power', 'fake extra 3'],
      ['weapon vulnerability', 'fake extra 3'],
      ['sensor power', 'fake extra 3'],
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


export const Random2: Story = {
  render: (args) => {
    const [state, dispatch] = useReducer(
      produce(scanTreeReducer),
      expandState(
        createDefinitionFromTemplate(
          hostileShip.scanTree
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