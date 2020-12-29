import React from 'react';
import { Theme } from '../../../common/theme';
import { ZoomableCard } from './ZoomableCard';
import { createCommonCard, createEpicCard, createRareCard, createUncommonCard } from '../data/EngineeringCards';

export default { title: 'Engineering/Components/Card' };

export const common = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard 
                {...createCommonCard(1)}
            />
        </div>
    </Theme>
);

export const uncommon = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard
                {...createUncommonCard(1)}
            />
        </div>
    </Theme>
);

export const rare = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard 
                {...createRareCard(1)}
            />
        </div>
    </Theme>
);

export const epic = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard
                {...createEpicCard(1)}
            />
        </div>
    </Theme>
);
