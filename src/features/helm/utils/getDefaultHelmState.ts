import { ManeuverType } from '../features/maneuvers';
import { HelmState } from '../types/HelmState';

export const getDefaultHelmState: () => HelmState = () => ({
    destination: null,
    maneuvers: [],
    replaceMotion: true,
    rotationalSpeed: 0.75,
    speedWhileRotating: 0.2,
    speed: 1,
    maneuverChoice: {
        id: 1,
        options: [ManeuverType.SlowForward, ManeuverType.SweepLeft, ManeuverType.SweepRight, ManeuverType.HardLeft],
    },
    manueverDrawPile: [
        {
            id: 2,
            options: [ManeuverType.SweepLeft, ManeuverType.HardLeft, ManeuverType.HardRight, ManeuverType.AboutTurn],
        },
        {
            id: 3,
            options: [ManeuverType.SlowForward, ManeuverType.SweepRight, ManeuverType.ClockwiseSpin, ManeuverType.DriftLeft],
        },
        {
            id: 4,
            options: [ManeuverType.SweepRight, ManeuverType.CounterclockwiseSpin, ManeuverType.DriftRight, ManeuverType.Backslide],
        },
    ],
    manueverDiscardPile: []
});