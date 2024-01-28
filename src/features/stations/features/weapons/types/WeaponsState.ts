export interface WeaponsState {
}

export type WeaponsAction = {
    type: 'tick';
    currentTime: number;
} | {
    type: 'roll';
};