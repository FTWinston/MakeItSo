import { EffectIndicator } from './EffectIndicator';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { durationToTicks } from 'src/utils/timeSpans';
import { Meta } from '@storybook/react';

export default {
  title: 'Engineering/System Tiles/Effect Indicator',
  Component: EffectIndicator,
  decorators: [(story) => <div style={{ position: 'absolute', top: 0 }}>{story()}</div>],
} as Meta<typeof EffectIndicator>;

export const positive = () => (
  <EffectIndicator
    id={1}
    startTime={Date.now()}
    endTime={Date.now() + durationToTicks(15)}
    positive={true}
    type={SystemStatusEffectType.DrawPower1}
  />
);

export const negative = () => (
  <EffectIndicator
    id={2}
    startTime={Date.now()}
    endTime={Date.now() + durationToTicks(15)}
    positive={false}
    type={SystemStatusEffectType.DrawnPower}
  />
);

export const linkPrimary = () => (
  <EffectIndicator
    id={4}
    startTime={Date.now()}
    endTime={Date.now() + durationToTicks(15)}
    positive={true}
    link="primary"
    type={SystemStatusEffectType.DrawPower2}
  />
);

export const linkSecondary = () => (
  <EffectIndicator
    id={3}
    startTime={Date.now()}
    endTime={Date.now() + durationToTicks(15)}
    positive={false}
    link="secondary"
    type={SystemStatusEffectType.DrawnPower}
    primaryEffect={{ effectType: SystemStatusEffectType.DrawPower1 }}
  />
);
