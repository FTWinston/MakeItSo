import { ZoomableCard } from './ZoomableCard';
import { createCommonCard, createEpicCard, createRareCard, createUncommonCard } from '../data/EngineeringCards';
import { EngineeringCard } from './EngineeringCard';

export default {
    title: 'Engineering/Cards',
    Component: EngineeringCard,
};

export const common = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <ZoomableCard 
            {...createCommonCard(1)}
        />
    </div>
);

export const uncommon = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <ZoomableCard
            {...createUncommonCard(1)}
        />
    </div>
);

export const rare = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <ZoomableCard 
            {...createRareCard(1)}
        />
    </div>
);

export const epic = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <ZoomableCard
            {...createEpicCard(1)}
        />
    </div>
);
