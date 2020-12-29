import React from 'react';
import { Theme } from '../../../common/theme';
import { EffectIndicators } from './EffectIndicators';
import { SystemStatusEffectType } from '../../../common/data/SystemStatusEffect';
import { determineEndTime, getTime, durationToTimeSpan } from '../../../common/data/Progression';

export default { title: 'Engineering/Components/Effect Indicators' };

export const three = () => {
    const now = getTime();

    const effects = [
        { startTime: now - durationToTimeSpan(10), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now, endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}

export const loads = () => {
    const now = getTime();

    const effects = [
        { startTime: now - durationToTimeSpan(10), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now, endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
        { startTime: now - durationToTimeSpan(7), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(5), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(3), endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
        { startTime: now - durationToTimeSpan(2), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(6), endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
        { startTime: now - durationToTimeSpan(8), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(5), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(3), endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(6), endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
        { startTime: now - durationToTimeSpan(2), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
        { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(6), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(9), endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Boost3 },
    ];
    
    return (
        <Theme>
            <EffectIndicators effects={effects} />
        </Theme>
    );
}