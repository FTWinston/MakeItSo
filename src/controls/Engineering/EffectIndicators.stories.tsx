import React from 'react';
import { Theme } from '../../style/theme';
import { EffectIndicators } from './EffectIndicators';
import { SystemStatusEffectType } from '../../data/SystemStatusEffect';

export default { title: 'Engineering/Effect Indicators' };

export const three = () => {
    const effects = [
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}

export const loads = () => {
    const effects = [
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: Date.now() + 5000, positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: Date.now() + 9000, positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: Date.now() + 15000, positive: false, type: SystemStatusEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}