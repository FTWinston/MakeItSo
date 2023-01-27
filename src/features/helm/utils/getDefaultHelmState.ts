import { ManeuverType } from '../features/maneuvers';
import { HelmState } from '../types/HelmState';

export const getDefaultHelmState: () => HelmState = () => ({
    destination: null,
    waypoints: [],
    forceMotionUpdate: true,
    rotationalSpeed: 0.75,
    speedWhileRotating: 0.1,
    speed: 1,
    maneuverChoice: [ManeuverType.SlowForward, ManeuverType.SweepLeft, ManeuverType.SweepRight],
    manueverDrawPile: [
        [ManeuverType.SweepLeft, ManeuverType.SlowForward, ManeuverType.SweepRight],
        [ManeuverType.SweepRight, ManeuverType.SweepLeft, ManeuverType.SlowForward],
        [ManeuverType.SweepRight, ManeuverType.SlowForward, ManeuverType.SweepLeft],
    ],
    manueverDiscardPile: []
});