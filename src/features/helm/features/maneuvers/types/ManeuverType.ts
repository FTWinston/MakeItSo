import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { PowerLevel } from 'src/types/ShipSystem';

export enum ManeuverType {
    SlowForward = 'slowForward',
    SweepLeft = 'sweepLeft',
    SweepRight = 'sweepRight',
    HardLeft = 'hardLeft',
    HardRight = 'hardRight',
    ClockwiseSpin = 'spinCw',
    CounterclockwiseSpin = 'spinCcw',
}

export interface ManeuverInfo {
    type: ManeuverType;
    minPower: PowerLevel;
    evasion: number;
    motion: Keyframes<Position>;
}

export type ManeuverChoice = [ManeuverType, ManeuverType, ManeuverType, ManeuverType];