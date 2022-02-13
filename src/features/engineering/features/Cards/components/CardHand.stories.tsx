import { CardHand as CardHandComponent } from './CardHand';
import { createCommonCard, createEpicCard, createUncommonCard, createRareCard, createCard } from '../data/EngineeringCards';
import { useState } from 'react';
import { stubHeight } from './CardStub';

export default {
    title: 'Engineering/Cards/Card Hand',
    Component: CardHandComponent,
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

export const CardHand = () => {
    const [cards, setCards] = useState(storyCards);
    const [nextID, setNextID] = useState(9);

    return (
        <div style={{marginTop: `calc(${stubHeight} * 0.5)`}}>
            <CardHandComponent
                cards={cards}
            />

            <br/><br/>

            <button onClick={() => {
                setCards([...cards, createCard(nextID)]);
                setNextID(nextID + 1);
            }}>add card</button>

            <button onClick={() => {
                const newCards = cards.slice();
                newCards.splice(Math.round(newCards.length / 2), 1);
                setCards(newCards);
            }}>remove card</button>
        </div>
    );
};
