import { ComponentStory } from '@storybook/react';
import { durationToTimeSpan, timeSpanToDuration } from 'src/utils/timeSpans';
import { storyCards } from '../features/Cards/components/CardHand.stories';
import { createCommonCard } from '../features/Cards/data/EngineeringCards';
import { basicStoryTiles, complexStoryTiles } from '../features/SystemTiles/components/SystemTiles.stories';
import { Engineering } from './Engineering';

export default {
    title: 'Engineering',
    component: Engineering,
};

const Template: ComponentStory<typeof Engineering> = (args) => (
    <Engineering {...args} />
);

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
    choiceProgress: {
        startTime: Date.now(),
        endTime: Date.now() + durationToTimeSpan(15),
    },
    numChoices: 3,
};