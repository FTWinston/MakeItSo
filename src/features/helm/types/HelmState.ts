import { Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { ManeuverChoice, ManeuverType } from '../features/maneuvers';
import { ManeuverInfo } from '../features/maneuvers/types/ManeuverType';

export interface HelmState {
    destination: Keyframe<Position> | null; // TODO: Keyframe<Position>
    maneuvers: ManeuverInfo[];
    forceMotionUpdate: boolean;

    rotationalSpeed: number;
    speedWhileRotating: number;
    speed: number;

    maneuverChoice: ManeuverChoice;
    manueverDrawPile: ManeuverChoice[];
    manueverDiscardPile: ManeuverChoice[];
}

export type HelmAction = {
    type: 'reset';
} | {
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