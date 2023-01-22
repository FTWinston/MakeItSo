import { Position } from 'src/types/Position';
import { Waypoint } from 'src/types/Waypoint';

export interface HelmState {
    destination: Position | null;
    waypoints: Waypoint[];
    forcePositionUpdate: boolean;

    rotationalSpeed: number;
    speedWhileRotating: number;
    speed: number;
}

export type HelmAction = {
    type: 'reset';
} | {
    type: 'tick';
    currentTime: number;
} | {
    type: 'set destination';
    destination: Position | null;
};