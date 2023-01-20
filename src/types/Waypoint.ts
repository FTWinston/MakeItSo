import { Position } from './Position';

export interface Waypoint extends Position {
    time?: number;
}