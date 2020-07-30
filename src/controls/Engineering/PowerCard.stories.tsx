import React from 'react';
import { Theme } from '../../style/theme';
import { PowerCard } from './PowerCard';
import { CardRarity } from '../../data/PowerCard';
import { commonCard, uncommonCard, rareCard, epicCard } from './PowerCard.examples';

export default { title: 'Engineering/Card' };

export const common = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <PowerCard 
                {...commonCard}
            />
        </div>
    </Theme>
);

export const uncommon = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <PowerCard
                {...uncommonCard}
            />
        </div>
    </Theme>
);

export const rare = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <PowerCard 
            {...rareCard}
            />
        </div>
    </Theme>
);

export const epic = () => (
    <Theme>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <PowerCard
            {...epicCard}
            />
        </div>
    </Theme>
);
