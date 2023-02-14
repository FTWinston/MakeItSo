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
import { getDefaultHelmState, shouldUpdateMotion, updateShipMotion } from 'src/features/helm';
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

    /** Remove destination if it is in the past. */
    private pruneDestination(currentTime: number) {
        if (this.helm.destination && this.helm.destination.time < currentTime) {
            this.helm.destination = null;
        }
    }

    private pruneManeuvers(currentTime: number) {
        while (this.helm.maneuvers.length > 0) {
            const firstManeuverKeyframes = this.helm.maneuvers[0].motion;
            const lastKeyframe = getLast(firstManeuverKeyframes);

            if (lastKeyframe.time < currentTime) {
                this.helm.maneuvers.shift();
                continue;
            }

            break;
        }
    }

    updateMotion(currentTime: number): void {
        const didPrune = pruneKeyframes(this.motion, currentTime);

        this.pruneDestination(currentTime);
        this.pruneManeuvers(currentTime);

        // If pruned keyframes from the start, probably need to add new ones to the end.
        // TODO: use didPrune?
        if (shouldUpdateMotion(this, currentTime)) {
            updateShipMotion(this, currentTime);
        }
    }
}