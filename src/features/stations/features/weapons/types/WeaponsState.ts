export interface WeaponsState {
}

export type WeaponsAction = {
    type: 'reset';
} | {
    type: 'tick';
    currentTime: number;
};