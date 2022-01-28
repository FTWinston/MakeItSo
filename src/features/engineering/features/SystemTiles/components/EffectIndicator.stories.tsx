import { EffectIndicator } from './EffectIndicator';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';

export default {
    title: 'Engineering/System Tiles/Effect Indicator',
    Component: EffectIndicator,
};

export const positive = () => (
    <EffectIndicator startTime={Date.now()} endTime={Date.now() + 15000} positive={true} type={SystemStatusEffectType.Boost1} />
);

export const negative = () => (
    <EffectIndicator startTime={Date.now()} endTime={Date.now() + 15000} positive={false} type={SystemStatusEffectType.Boost2} />
);
