
import { EffectIndicators as IndicatorsComponent } from './EffectIndicators';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { determineEndTime, getTime, durationToTimeSpan } from 'src/utils/timeSpans';
import { useEffect, useState } from 'react';

export default {
    title: 'Engineering/System Tiles/Effect Indicators',
    component: IndicatorsComponent,
};

export const EffectIndicators = () => {
    const [effects, setEffects] = useState(() => {
        const now = getTime();
        return [
            { startTime: now - durationToTimeSpan(10), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(15), endTime: determineEndTime(14, now), positive: false, type: SystemStatusEffectType.Boost2 },
            { startTime: now - durationToTimeSpan(7), endTime: determineEndTime(25, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(5), endTime: determineEndTime(16, now), positive: true, type: SystemStatusEffectType.Boost2 },
            { startTime: now - durationToTimeSpan(2), endTime: determineEndTime(4, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(20, now), positive: false, type: SystemStatusEffectType.Boost2 },
            { startTime: now - durationToTimeSpan(8), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(5), endTime: determineEndTime(11, now), positive: true, type: SystemStatusEffectType.Boost2 },
            { startTime: now - durationToTimeSpan(1), endTime: determineEndTime(6, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(91, now), positive: true, type: SystemStatusEffectType.Boost2 },
            { startTime: now - durationToTimeSpan(2), endTime: determineEndTime(13, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(8, now), positive: false, type: SystemStatusEffectType.Boost2 },
            { startTime: now - durationToTimeSpan(4), endTime: determineEndTime(15, now), positive: true, type: SystemStatusEffectType.Boost1 },
            { startTime: now - durationToTimeSpan(6), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.Boost2 },
        ];
    });

    useEffect(
        () => {
            const checkEffects = () => {
                const now = getTime();
                setEffects(effects.filter(effect => effect.endTime >= now));
            };

            const interval = setInterval(checkEffects, 100);
            return () => clearInterval(interval);
        },
        [effects]
    );

    return (
        <IndicatorsComponent effects={effects} />
    );
};