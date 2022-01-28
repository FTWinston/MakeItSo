
import { EffectIndicators } from './EffectIndicators';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { determineEndTime, getTime, durationToTimeSpan } from 'src/utils/timeSpans';

export default {
    title: 'Engineering/System Tiles/Effect Indicators',
    component: EffectIndicators,
};

export const three = () => {
    const now = getTime();

    const effects = [
        { startTime: now - durationToTimeSpan(10), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now, endTime: determineEndTime(15, now), positive: false, type: SystemStatusEffectType.Overload },
    ];
    
    return (
        <EffectIndicators effects={effects} />
    );
};

export const loads = () => {
    const now = getTime();

    const effects = [
        { startTime: now - durationToTimeSpan(10), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(15), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(7), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(5), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(2), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(8), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(5), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(2), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
        { startTime: now - durationToTimeSpan(6), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
    ];
    
    return (
        <EffectIndicators effects={effects} />
    );
};