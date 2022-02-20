
import { createCommonCard, createEpicCard, createRareCard, createUncommonCard } from '../data/EngineeringCards';
import { EngineeringCard } from './EngineeringCard';

export default {
    title: 'Engineering/Cards/Full Cards',
    Component: EngineeringCard,
};

export const FullCards = () => (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1em', gap: '1em', justifyContent: 'center', alignItems: 'center' }}>
        <EngineeringCard {...createCommonCard(1)} />
        
        <EngineeringCard {...createUncommonCard(1)} />

        <EngineeringCard {...createRareCard(1)} />

        <EngineeringCard {...createEpicCard(1)} />
    </div>
);
