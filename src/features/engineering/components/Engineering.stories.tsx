import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { durationToTimeSpan } from 'src/utils/timeSpans';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCommonCard } from '../features/Cards/data/EngineeringCards';
import { EngineeringCardInfo } from '../features/Cards';
import { basicStoryTiles, complexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { Engineering } from './Engineering';

export default {
    title: 'Engineering',
    component: Engineering,
};

let nextId = 14;
const Template: ComponentStory<typeof Engineering> = (args) => {
    const [handCards, setHandCards] = useState<EngineeringCardInfo[]>(args.handCards);
    const [choiceCards, setChoiceCards] = useState<EngineeringCardInfo[]>(args.choiceCards);

    return (
        <Engineering
            {...args}
            choiceCards={choiceCards}
            chooseCard={id => {
                const card = choiceCards.find(card => card.id === id);
                console.log(`id ${id}`, card);
                if (card) {
                    setHandCards([...handCards, card]);
                }

                setChoiceCards([
                    createCommonCard(++nextId),
                    createCommonCard(++nextId),
                    createCommonCard(++nextId),
                ]);
            }}
            playCard={(card, system) => {
                console.log(`playing card ${card.id} on ${system}`);
                setHandCards(handCards.filter(c => c !== card));
            }}
            handCards={handCards}
        />
    );
};

export const Empty = Template.bind({});
Empty.args = {
    systems: basicStoryTiles,
    handCards: [],
    choiceCards: [],
    numChoices: 0,
    choiceProgress: {
        startTime: Date.now(),
        endTime: Date.now() + durationToTimeSpan(15),
    },
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
    choiceProgress: {
        startTime: Date.now(),
        endTime: Date.now() + durationToTimeSpan(15),
    },
    numChoices: 3,
};
