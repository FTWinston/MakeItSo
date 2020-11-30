import { ClientShipState } from './ClientShipState';
import { System } from '../System';

export interface ClientGameState {
    localPlayer: string;
    localShipId: number;
    currentSystem?: System;

    ships: Partial<Record<number, ClientShipState>>;

    paused: boolean;
}

export interface EnhancedClientGameState extends ClientGameState {
    localShip: ClientShipState;
}

export function enhanceState(state: ClientGameState): EnhancedClientGameState {
    return {
        ...state,
        localShip: state.ships[state.localShipId]!,
    };
}