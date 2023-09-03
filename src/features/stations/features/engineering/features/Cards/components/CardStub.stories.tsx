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
    <EngineeringCardStub {...createCardByRarity(1, EngineeringCardRarity.Common)} />

    <EngineeringCardStub {...createCardByRarity(2, EngineeringCardRarity.Uncommon)} />

    <EngineeringCardStub {...createCardByRarity(3, EngineeringCardRarity.Rare)} />

    <EngineeringCardStub {...createCardByRarity(4, EngineeringCardRarity.Epic)} />
  </div>
);
