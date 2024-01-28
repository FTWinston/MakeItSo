import { ManeuverType } from '../features/maneuvers';

export interface HelmConfiguration {
    activeCards: [ManeuverType, ManeuverType, ManeuverType, ManeuverType][];
    inactiveCards: [ManeuverType, ManeuverType, ManeuverType, ManeuverType][];
}