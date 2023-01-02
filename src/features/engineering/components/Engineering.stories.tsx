import { StoryObj } from '@storybook/react';
import { DefiniteMap } from 'src/types/DefiniteMap';
import { ShipSystem } from 'src/types/ShipSystem';
import { SystemState } from 'src/types/SystemState';
import { arrayToMap } from 'src/utils/arrays';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCards } from '../features/Cards/data/EngineeringCards';
import { getBasicStoryTiles, getComplexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { EffectAction } from '../types/EngineeringState';
import { EngineeringTraining } from './EngineeringTraining';

export default {
    title: 'Engineering',
    component: EngineeringTraining,
};

type Story = StoryObj<typeof EngineeringTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => {
            const systems = getBasicStoryTiles();
            return {
                systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
                engineering: {
                    systemOrder: systems.map(system => system.system),
                    handCards: [],
                    choiceCards: [],
                    numChoices: 0,
                    nextCardId: 14,
                    nextEffectId: 1,
                }
            };
        },
        getEffects: () => [
            {
                type: 'effect',
                system: ShipSystem.Shields,
                healthChange: -1,
            } as EffectAction
        ],
    }
}

export const Busy: Story = {
    args: {
        getInitialState: () => {
            const systems = getComplexStoryTiles();
            return {
                systems: arrayToMap(systems, info => info.system) as DefiniteMap<ShipSystem, SystemState>,
                engineering: {
                    systemOrder: systems.map(system => system.system),
                    handCards: storyCards,
                    choiceCards: createCards([11, 12, 13]),
                    numChoices: 3,
                    nextCardId: 14,
                    nextEffectId: 1,
                }
            };
        },
        getEffects: () => [
            {
                type: 'effect',
                system: ShipSystem.Weapons,
                healthChange: -1,
            } as EffectAction
        ],
    }
};
