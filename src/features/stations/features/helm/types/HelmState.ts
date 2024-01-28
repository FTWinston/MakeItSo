import { Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { ManeuverChoice, ManeuverInfo, ManeuverType } from '../features/maneuvers';

export interface MotionConfiguration {
    rotationalSpeed: number;
    speedWhileRotating: number;
    speed: number;
}

export interface HelmState extends MotionConfiguration {
    destination: Keyframe<Position> | null;
    maneuvers: ManeuverInfo[];
    replaceMotion: boolean;

    maneuverChoice: ManeuverChoice;
    manueverDrawPile: ManeuverChoice[];
    manueverDiscardPile: ManeuverChoice[];
}

export type HelmAction = {
    type: 'tick';
    currentTime: number;
} | {
    type: 'stop';
} | {
    type: 'set destination';
    destination: Position;
} | {
    type: 'discard';
} | {
    type: 'maneuver';
    choice: ManeuverType;
};