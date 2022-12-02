import { StoryFn } from '@storybook/react';
import { ComponentProps, useEffect, useReducer } from 'react';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCommonCard } from '../features/Cards/data/EngineeringCards';
import { basicStoryTiles, complexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { Engineering } from './Engineering';
import { engineeringTrainingReducer } from '../utils/engineeringTrainingReducer';

export default {
    title: 'Engineering',
    component: Engineering,
};

const Template: StoryFn<ComponentProps<typeof Engineering>> = (args) => {
    const [state, dispatch] = useReducer(engineeringTrainingReducer, args);

    useEffect(() => {
        const interval = setInterval(() => dispatch({ type: 'cleanup', currentTime: Date.now() }), 200);

        return () => clearInterval(interval);
    })

    return (
        <Engineering
            {...state}
            chooseCard={cardId => dispatch({ type: 'draw', cardId })}
            playCard={(card, targetSystem) => dispatch({ type: 'play', cardId: card.id, targetSystem })}
        />
    );
};

export const Empty = Template.bind({});
Empty.args = {
    systems: basicStoryTiles,
    handCards: [],
    choiceCards: [],
    numChoices: 0,
};

export const Busy = Template.bind({});
Busy.args = {
    systems: complexStoryTiles,
    handCards: storyCards,
    choiceCards: [
        createCommonCard(11),
        createCommonCard(12),
        createCommonCard(13),
    ],
    numChoices: 3,
};
