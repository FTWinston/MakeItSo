
import { createCommonCard, createEpicCard, createRareCard, createUncommonCard } from '../data/EngineeringCards';
import { CardDisplay } from './CardDisplay';

export default {
    title: 'Engineering/Cards/Full Cards',
    Component: CardDisplay,
};

export const FullCards = () => (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1em', gap: '1em', justifyContent: 'center', alignItems: 'center' }}>
        <CardDisplay {...createCommonCard(1)} />
        
        <CardDisplay {...createUncommonCard(1)} />

        <CardDisplay {...createRareCard(1)} />

        <CardDisplay {...createEpicCard(1)} />
    </div>
);
