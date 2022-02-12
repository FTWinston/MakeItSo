import { ZoomableCard } from './ZoomableCard';
import { createCommonCard, createEpicCard, createRareCard, createUncommonCard } from '../data/EngineeringCards';
import { EngineeringCard } from './EngineeringCard';

export default {
    title: 'Engineering/Cards/Full Cards',
    Component: EngineeringCard,
};

export const FullCards = () => (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '1em', gap: '1em', justifyContent: 'center', alignItems: 'center' }}>
        <ZoomableCard {...createCommonCard(1)} />
        
        <ZoomableCard {...createUncommonCard(1)} />

        <ZoomableCard {...createRareCard(1)} />

        <ZoomableCard {...createEpicCard(1)} />
    </div>
);
