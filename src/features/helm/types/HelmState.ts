import { Position } from 'src/types/Position';

export interface HelmState {
    destination: Position | null;
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