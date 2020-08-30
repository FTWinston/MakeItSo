import React from 'react';
import { Theme } from '../../../common/theme';
import { EffectIndicators } from './EffectIndicators';
import { SystemStatusEffectType } from '../../../common/data/SystemStatusEffect';
import { determineEndTime } from '../../../common/data/Progression';

export default { title: 'Engineering/Effect Indicators' };

export const three = () => {
    const effects = [
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}

export const loads = () => {
    const effects = [
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
        { duration: 15, endTime: determineEndTime(5), positive: true, type: SystemStatusEffectType.Boost1 },
        { duration: 10, endTime: determineEndTime(9), positive: true, type: SystemStatusEffectType.Boost2 },
        { duration: 15, endTime: determineEndTime(15), positive: false, type: SystemStatusEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}