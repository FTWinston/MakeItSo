import { StoryObj } from '@storybook/react';
import { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Select } from 'src/lib/mui';
import initializeTestScenario from 'src/assets/scenarios/testScenario';
import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCards } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardType } from '../features/Cards/types/EngineeringCard';
import { getComplexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { DamageAction, EngineeringAction } from '../types/EngineeringState';
import { SystemStatusEffectType } from '../types/SystemStatusEffect';
import { EngineeringTraining } from './EngineeringTraining';
import { Ship } from 'src/classes/Ship';

export default {
  title: 'Engineering',
  component: EngineeringTraining,
};

type Story = StoryObj<typeof EngineeringTraining>;

export const Empty: Story = {
  args: {
    getInitialState: initializeTestScenario,
    getEffects: () => [
      {
        type: 'damage',
        system: ShipSystem.Shields,
        healthChange: -1,
      } as DamageAction,
    ],
  },
  argTypes: {
    cardToAdd: {
      control: 'select',
      options: Object.values(EngineeringCardType),
    },
    systemToAffect: {
      control: 'inline-radio',
      options: Object.keys(ShipSystem)
        .filter(val => isNaN(Number(val))),
    },
    effectToApply: {
      control: 'select',
      options: Object.values(SystemStatusEffectType),
    }
  },
  parameters: {
    controls: { exclude: ['getInitialState', 'getEffects', 'renderMenuItems'] },
  },
};

export const Busy: Story = {
  ...Empty,
  args: {
    getInitialState: () => {
      const space = initializeTestScenario();
      const ship = space.objects.get(1) as Ship;
      const systems = getComplexStoryTiles();

      ship.systems = arrayToMap(systems, (info) => info.system) as DefiniteMap<
        ShipSystem,
        SystemState
      >;
      ship.engineering = {
        configuration: ship.engineering.configuration,
        systemOrder: systems.map((system) => system.system),
        handCards: storyCards,
        maxHandSize: 7,
        choiceCards: createCards([11, 12, 13]),
        numChoices: 3,
        nextCardId: 14,
        nextEffectId: 1,
      };

      return space;
    },
    getEffects: () => [
      {
        type: 'damage',
        system: ShipSystem.Weapons,
        healthChange: -1,
      } as DamageAction,
    ],
  },
};
