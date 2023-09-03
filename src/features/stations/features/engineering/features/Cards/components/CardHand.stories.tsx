import { CardHand as CardHandComponent } from './CardHand';
import { createCardByRarity, createRandomCard } from '../data/EngineeringCards';
import { useState } from 'react';
import { stubHeight } from './CardStub';
import { action } from '@storybook/addon-actions';
import { EngineeringCardRarity } from '../types/EngineeringCard';
import { getRandomInt } from 'src/utils/random';

export default {
  title: 'Engineering/Cards/Card Hand',
  Component: CardHandComponent,
  includeStories: /^[A-Z]/,
};

export const storyCards = [
  createCardByRarity(1, EngineeringCardRarity.Common),
  createCardByRarity(2, EngineeringCardRarity.Epic),
  createCardByRarity(3, EngineeringCardRarity.Common),
  createCardByRarity(4, EngineeringCardRarity.Uncommon),
  createCardByRarity(5, EngineeringCardRarity.Common),
  createCardByRarity(6, EngineeringCardRarity.Rare),
  createCardByRarity(7, EngineeringCardRarity.Common),
  createCardByRarity(8, EngineeringCardRarity.Uncommon),
];

export const CardHand = () => {
  const [cards, setCards] = useState(storyCards);
  const [nextID, setNextID] = useState(9);

  return (
    <div style={{ marginTop: `calc(${stubHeight} * 0.5)` }}>
      <CardHandComponent
        cards={cards}
        selectedCard={null}
        selectFocusedCard={action('startPlaying')}
        clearSelection={action('stopPlaying')}
        setFocus={action('focus')}
      />

      <br />
      <br />

      <button
        onClick={() => {
          setCards([...cards, createRandomCard(nextID)]);
          setNextID(nextID + 1);
        }}
      >
        add card
      </button>

      <button
        onClick={() => {
          const newCards = cards.slice();
          newCards.splice(getRandomInt(newCards.length), 1);
          setCards(newCards);
        }}
      >
        remove card
      </button>
    </div>
  );
};
