import { CardHand } from './CardHand';
import { createCommonCard, createEpicCard, createUncommonCard, createRareCard } from '../data/EngineeringCards';

export default {
    title: 'Engineering/Cards/Card Hand',
    Component: CardHand,
};

const cards = [
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
    <CardHand
        cards={cards.slice(0, size)}
    />
);

export const eight = () => exampleHand(8);

export const seven = () => exampleHand(7);

export const six = () => exampleHand(6);

export const five = () => exampleHand(5);

export const four = () => exampleHand(4);

export const three = () => exampleHand(3);

export const two = () => exampleHand(2);

export const one = () => exampleHand(1);

export const zero = () => exampleHand(0);
