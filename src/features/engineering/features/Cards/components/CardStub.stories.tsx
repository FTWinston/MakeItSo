import { createCommonCard, createEpicCard, createRareCard, createUncommonCard } from '../data/EngineeringCards';
import { CardDisplay } from './CardDisplay';
import { EngineeringCardStub, stubHeight } from './CardStub';

export default {
    title: 'Engineering/Cards/Card Stubs',
    Component: CardDisplay,
};

export const CardStubs = () => (
    <div style={{ display: 'flex', margin: '1em', height: stubHeight, gap: '1em', justifyContent: 'center', alignItems: 'center' }}>
        <EngineeringCardStub {...createCommonCard(1)} />
        
        <EngineeringCardStub {...createUncommonCard(1)} />
        
        <EngineeringCardStub {...createRareCard(1)} />

        <EngineeringCardStub {...createEpicCard(1)} />
    </div>
);
