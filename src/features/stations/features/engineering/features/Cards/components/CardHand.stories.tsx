import { CardHand as CardHandComponent } from './CardHand';
import { createCardByRarity, createRandomCard } from '../data/EngineeringCards';
import { useState } from 'react';
import { stubHeight } from './CardStub';
import { action } from '@storybook/addon-actions';
import { EngineeringCardRarity } from '../types/EngineeringCard';
import { Random } from 'src/utils/random';

export default {
  title: 'Engineering/Cards/Card Hand',
  Component: CardHandComponent,
  includeStories: /^[A-Z]/,
};

const random = new Random();
export const storyCards = [
  createCardByRarity(random, 1, EngineeringCardRarity.Common),
  createCardByRarity(random, 2, EngineeringCardRarity.Epic),
  createCardByRarity(random, 3, EngineeringCardRarity.Common),
  createCardByRarity(random, 4, EngineeringCardRarity.Uncommon),
  createCardByRarity(random, 5, EngineeringCardRarity.Common),
  createCardByRarity(random, 6, EngineeringCardRarity.Rare),
  createCardByRarity(random, 7, EngineeringCardRarity.Common),
  createCardByRarity(random, 8, EngineeringCardRarity.Uncommon),
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
          setCards([...cards, createRandomCard(new Random(), nextID)]);
          setNextID(nextID + 1);
        }}
      >
        add card
      </button>

      <button
        onClick={() => {
          const newCards = cards.slice();
          newCards.splice(new Random().getInt(newCards.length), 1);
          setCards(newCards);
        }}
      >
        remove card
      </button>
    </div>
  );
};
