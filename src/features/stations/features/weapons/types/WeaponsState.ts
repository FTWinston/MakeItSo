import { WeaponsConfiguration } from './WeaponsConfiguration';

export interface WeaponsState {
    configuration: WeaponsConfiguration;
}

export type WeaponsAction = {
    type: 'tick';
    currentTime: number;
} | {
    type: 'roll';
};