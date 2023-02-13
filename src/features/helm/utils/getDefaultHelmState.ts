import { ManeuverType } from '../features/maneuvers';
import { HelmState } from '../types/HelmState';

export const getDefaultHelmState: () => HelmState = () => ({
    destination: null,
    maneuvers: [],
    forceMotionUpdate: true,
    rotationalSpeed: 0.75,
    speedWhileRotating: 0.1,
    speed: 1,
    maneuverChoice: {
        id: 1,
        options: [ManeuverType.SlowForward, ManeuverType.SweepLeft, ManeuverType.SweepRight, ManeuverType.HardLeft],
    },
    manueverDrawPile: [
        {
            id: 2,
            options: [ManeuverType.SweepLeft, ManeuverType.SlowForward, ManeuverType.SweepRight, ManeuverType.HardRight],
        },
        {
            id: 3,
            options: [ManeuverType.SweepLeft, ManeuverType.SweepRight, ManeuverType.HardLeft, ManeuverType.HardRight],
        },
        {
            id: 4,
            options: [ManeuverType.SweepRight, ManeuverType.SlowForward, ManeuverType.HardLeft, ManeuverType.HardRight],
        },
    ],
    manueverDiscardPile: []
});