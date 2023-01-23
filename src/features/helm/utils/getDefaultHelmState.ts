import { HelmState } from '../types/HelmState';

export const getDefaultHelmState: () => HelmState = () => ({
    destination: null,
    waypoints: [],
    forcePositionUpdate: true,
    rotationalSpeed: 0.75,
    speedWhileRotating: 0.1,
    speed: 1,
});