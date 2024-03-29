import { Keyframe } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { ManeuverChoice, ManeuverInfo, ManeuverType } from '../features/maneuvers';
import { HelmConfiguration } from './HelmConfiguration';

export interface MotionConfiguration {
    rotationalSpeed: number;
    speedWhileRotating: number;
    speed: number;
}

export interface HelmState extends MotionConfiguration {
    configuration: HelmConfiguration;
    destination: Keyframe<Position> | null;
    maneuvers: ManeuverInfo[];
    replaceMotion: boolean;

    maneuverChoice: ManeuverChoice;
    maneuverDrawPile: ManeuverChoice[];
    manueverDiscardPile: ManeuverChoice[];
    nextTileId: number;
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