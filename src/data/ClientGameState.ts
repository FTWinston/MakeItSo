import { ClientShipState } from './ClientShipState';
import { System } from './System';

export interface ClientGameState {
    localPlayer: string;
    localShip: number; // TODO: keep this, or just calculate on the client on the fly?
    currentSystem?: System; // TODO: keep this, or just calculate on the client on the fly?

    ships: Record<number, ClientShipState>;

    paused: boolean;
}