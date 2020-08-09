import { System } from './System';

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
    type: 'power draft';
    card: number;
} | {
    type: 'power play';
    card: number;
    system: System;
}
