
import { EffectIndicators as IndicatorsComponent } from './EffectIndicators';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { determineEndTime, getTime, durationToTicks } from 'src/utils/timeSpans';
import { useState } from 'react';
import { useInterval } from 'src/hooks/useInterval';

export default {
    title: 'Engineering/System Tiles/Effect Indicators',
    component: IndicatorsComponent,
};

export const EffectIndicators = () => {
    const [effects, setEffects] = useState(() => {
        const now = getTime();
        return [
            { id: 1, startTime: now - durationToTicks(10), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.DrawPower1 },
            { id: 2, startTime: now - durationToTicks(15), endTime: determineEndTime(14, now), positive: false, type: SystemStatusEffectType.DrawnPower, link: 'secondary', primaryEffect: { effectType: SystemStatusEffectType.DrawPower1 }},
            { id: 3, startTime: now - durationToTicks(7), endTime: determineEndTime(25, now), positive: true, type: SystemStatusEffectType.DrawPower1 },
            { id: 4, startTime: now - durationToTicks(5), endTime: determineEndTime(16, now), positive: true, type: SystemStatusEffectType.ReactorSurplus, link: 'secondary', primaryEffect: { effectType: SystemStatusEffectType.ReactorOverload }},
            { id: 5, startTime: now - durationToTicks(2), endTime: determineEndTime(4, now), positive: true, type: SystemStatusEffectType.DrawPower1 },
            { id: 6, startTime: now - durationToTicks(1), endTime: determineEndTime(20, now), positive: false, type: SystemStatusEffectType.DrawPower2 },
            { id: 7, startTime: now - durationToTicks(8), endTime: determineEndTime(5, now), positive: true, type: SystemStatusEffectType.DrawPower1 },
            { id: 8, startTime: now - durationToTicks(5), endTime: determineEndTime(11, now), positive: true, type: SystemStatusEffectType.DrawPower2, link: 'primary' },
            { id: 9, startTime: now - durationToTicks(1), endTime: determineEndTime(6, now), positive: false, type: SystemStatusEffectType.DivertFrom, link: 'primary' },
            { id: 10, startTime: now - durationToTicks(4), endTime: determineEndTime(91, now), positive: true, type: SystemStatusEffectType.DrawPower2 },
            { id: 11, startTime: now - durationToTicks(2), endTime: determineEndTime(13, now), positive: true, type: SystemStatusEffectType.DrawPower1 },
            { id: 12, startTime: now - durationToTicks(4), endTime: determineEndTime(8, now), positive: false, type: SystemStatusEffectType.DrawPower2 },
            { id: 13, startTime: now - durationToTicks(4), endTime: determineEndTime(15, now), positive: true, type: SystemStatusEffectType.DrawPower1 },
            { id: 14, startTime: now - durationToTicks(6), endTime: determineEndTime(9, now), positive: true, type: SystemStatusEffectType.DrawPower2 },
        ];
    });

    useInterval(
        () => {
            const now = getTime();
            setEffects(effects.filter(effect => effect.endTime >= now));
        }, 100, [effects]
    );

    return (
        <IndicatorsComponent effects={effects} />
    );
};