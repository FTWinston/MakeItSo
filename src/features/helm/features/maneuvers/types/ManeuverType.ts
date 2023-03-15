import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { PowerLevel } from 'src/types/ShipSystem';

export enum ManeuverType {
    SlowForward = 'slowForward',
    SweepLeft = 'sweepLeft',
    SweepRight = 'sweepRight',
    HardLeft = 'hardLeft',
    HardRight = 'hardRight',
    DriftLeft = 'driftLeft',
    DriftRight = 'driftRight',
    ClockwiseSpin = 'spinCw',
    CounterclockwiseSpin = 'spinCcw',
}

export interface ManeuverInfo {
    type: ManeuverType;
    minPower: PowerLevel;
    evasion: number;
    motion: Keyframes<Position>;
    ghostFrames?: number[];
}

export type ManeuverChoice = {
    id: number;
    options: [ManeuverType, ManeuverType, ManeuverType, ManeuverType];
}