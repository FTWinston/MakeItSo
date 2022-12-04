import { StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import { ShipSystem } from 'src/types/ShipSystem';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCommonCard } from '../features/Cards/data/EngineeringCards';
import { getBasicStoryTiles, getComplexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { EffectAction } from '../types/EngineeringState';
import { Engineering } from './Engineering';
import { EngineeringTraining } from './EngineeringTraining';

export default {
    title: 'Engineering',
    component: Engineering,
};

const Template: StoryFn<ComponentProps<typeof EngineeringTraining>> = (args) => (
    <EngineeringTraining {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
    getInitialState: () => ({
        systems: getBasicStoryTiles(),
        handCards: [],
        choiceCards: [],
        numChoices: 0,
    }),
    getEffects: () => [
        {
            type: 'effect',
            system: ShipSystem.Shields,
            healthChange: -1,
        } as EffectAction
    ],
};

export const Busy = Template.bind({});
Busy.args = {
    getInitialState: () => ({
        systems: getComplexStoryTiles(),
        handCards: storyCards,
        choiceCards: [
            createCommonCard(11),
            createCommonCard(12),
            createCommonCard(13),
        ],
        numChoices: 3,
    }),
    getEffects: () => [
        {
            type: 'effect',
            system: ShipSystem.Weapons,
            healthChange: -1,
        } as EffectAction
    ],
};
