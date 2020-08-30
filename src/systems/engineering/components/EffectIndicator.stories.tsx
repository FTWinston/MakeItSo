import React from 'react';
import { Theme } from '../../../common/theme';
import { EffectIndicator } from './EffectIndicator';
import { SystemStatusEffectType } from '../../../common/data/SystemStatusEffect';

export default { title: 'Engineering/Effect Indicator' };

export const positive = () => (
    <Theme>
        <EffectIndicator duration={15} endTime={Date.now() + 15000} positive={true} type={SystemStatusEffectType.Boost1} />
    </Theme>
);

export const negative = () => (
    <Theme>
        <EffectIndicator duration={15} endTime={Date.now() + 15000} positive={false} type={SystemStatusEffectType.Boost2} />
    </Theme>
);
