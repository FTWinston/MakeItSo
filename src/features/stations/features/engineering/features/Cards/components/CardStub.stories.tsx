import { Random } from 'src/utils/random';
import { createCardByRarity } from '../data/EngineeringCards';
import { EngineeringCardRarity } from '../types/EngineeringCard';
import { CardDisplay } from './CardDisplay';
import { EngineeringCardStub, stubHeight } from './CardStub';

export default {
  title: 'Engineering/Cards/Card Stubs',
  Component: CardDisplay,
};

export const CardStubs = () => (
  <div
    style={{
      display: 'flex',
      margin: '1em',
      height: stubHeight,
      gap: '1em',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <EngineeringCardStub {...createCardByRarity(new Random(), 1, EngineeringCardRarity.Common)} />

    <EngineeringCardStub {...createCardByRarity(new Random(), 2, EngineeringCardRarity.Uncommon)} />

    <EngineeringCardStub {...createCardByRarity(new Random(), 3, EngineeringCardRarity.Rare)} />

    <EngineeringCardStub {...createCardByRarity(new Random(), 4, EngineeringCardRarity.Epic)} />
  </div>
);
