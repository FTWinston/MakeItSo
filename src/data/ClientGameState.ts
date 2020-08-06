import { ClientShipState } from './ClientShipState';
import { System } from './System';

export interface ClientGameState {
    localPlayer: string;
    localShip: ClientShipState;
    currentSystem?: System;

    ships: Record<number, ClientShipState>;

    paused: boolean;
}