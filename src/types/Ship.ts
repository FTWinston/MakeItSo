import type { EngineeringState } from 'src/features/engineering/types/EngineeringState';
import type { HelmState } from 'src/features/helm/types/HelmState';
import type { SensorsState } from 'src/features/sensors/types/SensorsState';
import type { WeaponsState } from 'src/features/weapons/types/WeaponsState';
import type { DefiniteMap } from './DefiniteMap';
import type { ShipDestroyingSystem, ShipSystem } from './ShipSystem';
import type { SystemState } from './SystemState';
import { GameObject } from './GameObject';
import { ShipInfo } from './ShipInfo';
import { getDefaultSystemStates } from 'src/utils/getDefaultSystemStates';
import { getDefaultEngineeringState } from 'src/features/engineering';
import { getDefaultHelmState, updateShipMotion } from 'src/features/helm';
import { getDefaultSensorsState } from 'src/features/sensors';
import { getDefaultWeaponsState } from 'src/features/weapons';
import { pruneKeyframes } from './Keyframes';
import { getLast } from 'src/utils/arrays';

export class Ship extends GameObject implements ShipInfo {
    constructor() {
        super();

        this.systems = getDefaultSystemStates();
        this.engineering = getDefaultEngineeringState();
        this.helm = getDefaultHelmState();
        this.sensors = getDefaultSensorsState();
        this.weapons = getDefaultWeaponsState();
    }

    destroyed?: ShipDestroyingSystem;
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
    helm: HelmState;
    sensors: SensorsState;
    weapons: WeaponsState;

    /** Remove destination if it is in the past. Return true if it is removed. */
    private pruneDestination(currentTime: number) {
        if (this.helm.destination && this.helm.destination.time < currentTime) {
            this.helm.destination = null;
            return true;
        }

        return false;
    }

    /** Remove manuevers that end in the past. Return true if none are left. */
    private pruneManeuvers(currentTime: number) {
        let pruned = false;
        while (this.helm.maneuvers.length > 0) {
            const firstManeuverKeyframes = this.helm.maneuvers[0].motion;
            const lastKeyframe = getLast(firstManeuverKeyframes);

            if (lastKeyframe.time < currentTime) {
                this.helm.maneuvers.shift();
                pruned = true;
                continue;
            }

            break;
        }

        return pruned && this.helm.maneuvers.length === 0;
    }

    updateMotion(currentTime: number): void {
        pruneKeyframes(this.motion, currentTime);
        this.pruneDestination(currentTime);
        const prunedLastManeuver = this.pruneManeuvers(currentTime);

        const changeMotion = this.helm.forceMotionUpdate || (prunedLastManeuver && this.helm.destination !== null);
        this.helm.forceMotionUpdate = false;

        updateShipMotion(this, this.helm, changeMotion, this.helm.destination, this.helm.maneuvers, currentTime);
    }
}