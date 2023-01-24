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

    /** Remove waypoints that are in the past. */
    private pruneWaypoints(currentTime: number) {
        while (true) {
            const firstWaypoint = this.helm.waypoints[0];

            if (firstWaypoint?.time >= currentTime) {
                this.helm.waypoints.shift();
                continue;
            }

            break;
        }
    }

    updateMotion(currentTime: number): void {
        const didPrune = pruneKeyframes(this.motion, currentTime);

        this.pruneWaypoints(currentTime)

        // if pruned keyframes from the start, probably need to add new ones to the end.

        if (shouldUpdateMotion(this, currentTime)) {
            updateShipMotion(this, currentTime);
        }
    }
}