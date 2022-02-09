import { CardHand } from './CardHand';
import { createCommonCard, createEpicCard, createUncommonCard, createRareCard } from '../data/EngineeringCards';

export default {
    title: 'Engineering/Cards/Card Hand',
    Component: CardHand,
    includeStories: /^[A-Z]/,
};

export const storyCards = [
    createCommonCard(1),
    createEpicCard(2),
    createCommonCard(3),
    createUncommonCard(4),
    createCommonCard(5),
    createRareCard(6),
    createCommonCard(7),
    createUncommonCard(8),
];

const exampleHand = (size: number) => (
    <div style={{marginTop: '5em'}}>
        <CardHand
            cards={storyCards.slice(0, size)}
        />
    </div>
);

export const Eight = () => exampleHand(8);

export const Seven = () => exampleHand(7);

export const Six = () => exampleHand(6);

export const Five = () => exampleHand(5);

export const Four = () => exampleHand(4);

export const Three = () => exampleHand(3);

export const Two = () => exampleHand(2);

export const One = () => exampleHand(1);

export const Zero = () => exampleHand(0);
