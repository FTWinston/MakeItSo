import { System } from './System';
import { Vector2D } from './Vector2D';

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
    target: Vector2D;
    append: boolean;
} | {
    type: 'eng draft';
    card: number;
} | {
    type: 'eng play';
    card: number;
    system: System;
}
