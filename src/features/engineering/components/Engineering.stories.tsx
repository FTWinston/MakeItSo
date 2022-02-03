import { ComponentStory } from '@storybook/react';
import { storyCards } from '../features/Cards/components/CardHand.stories';
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
    log: [],
};

export const Busy = Template.bind({});
Busy.args = {
    systems: complexStoryTiles,
    handCards: storyCards,
    choiceCards: [],
    log: [
        'Something happened.',
        'Something else!',
        'GASP!',
    ],
};