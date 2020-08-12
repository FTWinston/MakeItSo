import React from 'react';
import { Theme } from '../../style/theme';
import { EffectIndicators } from './EffectIndicators';
import { PowerEffectType } from '../../data/PowerEffect';

export default { title: 'Engineering/Effect Indicators' };

export const three = () => {
    const effects = [
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}

export const loads = () => {
    const effects = [
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
        { duration: 15, remaining: 5, positive: true, type: PowerEffectType.Boost1 },
        { duration: 10, remaining: 9, positive: true, type: PowerEffectType.Boost2 },
        { duration: 15, positive: false, type: PowerEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}