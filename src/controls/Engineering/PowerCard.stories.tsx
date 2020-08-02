import React from 'react';
import { Theme } from '../../style/theme';
import { ZoomableCard } from './ZoomableCard';
import { commonCard, uncommonCard, rareCard, epicCard } from './PowerCard.examples';

export default { title: 'Engineering/Card' };

export const common = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard 
                {...commonCard()}
            />
        </div>
    </Theme>
);

export const uncommon = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard
                {...uncommonCard()}
            />
        </div>
    </Theme>
);

export const rare = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard 
                {...rareCard()}
            />
        </div>
    </Theme>
);

export const epic = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ZoomableCard
                {...epicCard()}
            />
        </div>
    </Theme>
);
