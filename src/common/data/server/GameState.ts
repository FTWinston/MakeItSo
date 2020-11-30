import { ShipState } from './ShipState';

export interface GameState {
    ships: Partial<Record<number, ShipState>>; // presumably not all ships will be simulated with a client ship state
    shipsByClient: Partial<Record<string, number>>;

    paused: boolean;
}