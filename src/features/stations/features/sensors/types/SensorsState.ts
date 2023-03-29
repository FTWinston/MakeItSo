export interface SensorsState {
}

export type SensorsAction = {
    type: 'reset';
} | {
    type: 'tick';
    currentTime: number;
};