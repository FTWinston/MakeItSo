import React from 'react';
import { Theme } from '../../style/theme';
import { EffectIndicator } from './EffectIndicator';
import { PowerEffectType } from '../../data/PowerEffect';

export default { title: 'Engineering/Effect Indicator' };

export const positive = () => (
    <Theme>
        <EffectIndicator duration={15} remaining={5} positive={true} type={PowerEffectType.Boost1} />
    </Theme>
);

export const negative = () => (
    <Theme>
        <EffectIndicator duration={15} positive={false} type={PowerEffectType.Boost2} />
    </Theme>
);
