import { StoryObj } from '@storybook/react';
import { SystemTile } from './SystemTile';
import { SystemStatusEffectType } from '../../../types/SystemStatusEffect';
import { durationToTicks } from 'src/utils/timeSpans';
import { ShipSystem } from 'src/types/ShipSystem';

export default {
  title: 'Engineering/System Tiles/Tile',
  component: SystemTile,
};

type Story = StoryObj<typeof SystemTile>;

export const FullHealth: Story = {
  args: {
    system: ShipSystem.Engines,
    health: 100,
    power: 2,
    effects: [],
  },
};

export const PartialHealth: Story = {
  args: {
    system: ShipSystem.Engines,
    health: 25,
    power: 2,
    effects: [],
  },
};

export const Healing: Story = {
  args: {
    system: ShipSystem.Engines,
    health: 70,
    healAmount: 10,
    validTarget: true,
    power: 2,
    effects: [],
  },
};

export const ZeroHealth: Story = {
  args: {
    system: ShipSystem.Hull,
    health: 0,
    restoration: 0,
    power: 2,
    effects: [],
  },
};

export const PartiallyRestored: Story = {
  args: {
    system: ShipSystem.Hull,
    health: 0,
    restoration: 50,
    power: 2,
    effects: [],
  },
};

export const Restoring: Story = {
  args: {
    system: ShipSystem.Hull,
    health: 0,
    restoration: 50,
    healAmount: 25,
    power: 2,
    effects: [],
  },
};

export const ZeroPower: Story = {
  args: {
    system: ShipSystem.Hull,
    health: 100,
    power: 0,
    effects: [],
  },
};

export const OneEffect: Story = {
  args: {
    system: ShipSystem.Weapons,
    health: 75,
    power: 2,
    effects: [
      {
        id: 1,
        type: SystemStatusEffectType.ReactorSurplus,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
    ],
  },
};

export const ThreeEffects: Story = {
  args: {
    system: ShipSystem.Sensors,
    health: 82,
    power: 2,
    effects: [
      {
        id: 1,
        type: SystemStatusEffectType.Overcharge,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
      {
        id: 2,
        type: SystemStatusEffectType.DrawnPower,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(12),
        positive: false,
      },
      {
        id: 3,
        type: SystemStatusEffectType.Relocating,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(5),
        positive: true,
      },
    ],
  },
};

export const FourEffects: Story = {
  args: {
    system: ShipSystem.Sensors,
    health: 82,
    power: 2,
    effects: [
      {
        id: 1,
        type: SystemStatusEffectType.Overcharge,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
      {
        id: 2,
        type: SystemStatusEffectType.DrawnPower,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(12),
        positive: false,
      },
      {
        id: 3,
        type: SystemStatusEffectType.Relocating,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(5),
        positive: true,
      },
      {
        id: 4,
        type: SystemStatusEffectType.AuxPower,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(10),
        positive: true,
      },
    ],
  },
};

export const FiveEffects: Story = {
  args: {
    system: ShipSystem.Sensors,
    health: 82,
    power: 2,
    effects: [
      {
        id: 1,
        type: SystemStatusEffectType.Overcharge,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
      {
        id: 2,
        type: SystemStatusEffectType.DrawnPower,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(12),
        positive: false,
      },
      {
        id: 3,
        type: SystemStatusEffectType.Relocating,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(5),
        positive: true,
      },
      {
        id: 4,
        type: SystemStatusEffectType.AuxPower,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(10),
        positive: true,
      },
      {
        id: 5,
        type: SystemStatusEffectType.Rebuild,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
    ],
  },
};

export const ValidTarget: Story = {
  args: {
    system: ShipSystem.Weapons,
    health: 88,
    validTarget: true,
    power: 2,
    effects: [
      {
        id: 1,
        type: SystemStatusEffectType.Rebuild,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
    ],
  },
};

export const InvalidTarget: Story = {
  args: {
    system: ShipSystem.Weapons,
    health: 53,
    validTarget: false,
    power: 2,
    effects: [
      {
        id: 1,
        type: SystemStatusEffectType.StoredCharge,
        startTime: Date.now(),
        endTime: Date.now() + durationToTicks(15),
        positive: true,
      },
    ],
  },
};
