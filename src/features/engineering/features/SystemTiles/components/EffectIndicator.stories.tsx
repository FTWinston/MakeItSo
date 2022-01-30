import { EffectIndicator } from './EffectIndicator';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';

export default {
    title: 'Engineering/System Tiles/Effect Indicator',
    Component: EffectIndicator,
};

export const positive = () => (
    <div style={{position: 'absolute', top: 0}}>
        <EffectIndicator startTime={Date.now()} endTime={Date.now() + 15000} positive={true} type={SystemStatusEffectType.Boost1} />
    </div>
);

export const negative = () => (
    <div style={{position: 'absolute', top: 0}}>
        <EffectIndicator startTime={Date.now()} endTime={Date.now() + 15000} positive={false} type={SystemStatusEffectType.Boost2} />
    </div>
);
