import { Random } from 'src/utils/random';
import { createCardByRarity } from '../data/EngineeringCards';
import { EngineeringCardRarity } from '../types/EngineeringCard';
import { CardDisplay } from './CardDisplay';

export default {
  title: 'Engineering/Cards/Full Cards',
  Component: CardDisplay,
};

export const FullCards = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '1em',
      gap: '1em',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CardDisplay {...createCardByRarity(new Random(), 1, EngineeringCardRarity.Common)} />

    <CardDisplay {...createCardByRarity(new Random(), 2, EngineeringCardRarity.Uncommon)} />

    <CardDisplay {...createCardByRarity(new Random(), 3, EngineeringCardRarity.Rare)} />

    <CardDisplay {...createCardByRarity(new Random(), 4, EngineeringCardRarity.Epic)} />
  </div>
);
