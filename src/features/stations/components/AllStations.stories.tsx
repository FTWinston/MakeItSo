import { StoryObj } from '@storybook/react';
import initializeTestScenario from 'src/assets/scenarios/testScenario';
import { CombinedTraining } from './CombinedTraining';
import { ShipSystem } from 'src/types/ShipSystem';
import { EngineeringCardType } from '../features/engineering/features/Cards';
import { SystemStatusEffectType } from '../features/engineering/types/SystemStatusEffect';

export default {
  title: 'All Stations',
  component: CombinedTraining,
};

type Story = StoryObj<typeof CombinedTraining>;

export const TestScenario: Story = {
  args: {
    getInitialState: initializeTestScenario,
    otherShipState: 'idle',
  },
  argTypes: {
    otherShipState: {
      control: 'inline-radio',
      options: ['idle', 'mobile', 'hostile'],
    },

    
    engineering_CardToAdd: {
      control: 'select',
      options: Object.values(EngineeringCardType),
    },
    engineering_SystemToAffect: {
      control: 'inline-radio',
      options: Object.keys(ShipSystem)
        .filter(val => isNaN(Number(val))),
    },
    engineering_EffectToApply: {
      control: 'select',
      options: Object.values(SystemStatusEffectType),
    }

  },
  parameters: {
    controls: { exclude: 'getInitialState' },
  },
};
