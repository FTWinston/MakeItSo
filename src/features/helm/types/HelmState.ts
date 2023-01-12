export interface HelmState {
}

export type HelmAction = {
    type: 'reset';
} | {
    type: 'tick';
    currentTime: number;
};