import { ManeuverType } from '../features/maneuvers';
import { HelmConfiguration } from '../types/HelmConfiguration';

export function getDefaultHelmConfiguration(): HelmConfiguration {
    return {
        activeCards: [
            [ManeuverType.SlowForward, ManeuverType.SweepLeft, ManeuverType.SweepRight, ManeuverType.HardLeft],
            [ManeuverType.SweepLeft, ManeuverType.HardLeft, ManeuverType.HardRight, ManeuverType.RightUTurn],
            [ManeuverType.SlowForward, ManeuverType.SweepRight, ManeuverType.ClockwiseSpin, ManeuverType.DriftLeft],
            [ManeuverType.SweepRight, ManeuverType.CounterclockwiseSpin, ManeuverType.DriftRight, ManeuverType.Backslide],
        ],
        inactiveCards: [],
    };
}