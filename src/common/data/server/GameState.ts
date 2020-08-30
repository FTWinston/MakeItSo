import { ShipState } from './ShipState';

export interface GameState {
    ships: Record<number, ShipState>; // presumably not all ships will be simulated with a client ship state
    shipsByClient: Record<string, number>;

    paused: boolean;
}