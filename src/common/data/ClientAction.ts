import { System } from './System';
import { Vector2D } from './Vector2D';
import { Waypoint } from './Waypoint';

export type ClientAction = {
    type: 'pause';
} | {
    type: 'resume';
} | {
    type: 'end game';
} | {
    type: 'select system';
    system: System;
} | {
    type: 'helm move';
    waypoint: Waypoint;
    replace: boolean;
} | {
    type: 'helm stop';
} | {
    type: 'eng draft';
    card: number;
} | {
    type: 'eng play';
    card: number;
    system: System;
}
