import type { EngineeringState, HelmState, SensorsState, WeaponsState } from 'src/features/stations';
import type { DefiniteMap } from 'src/types/DefiniteMap';
import type { ShipDestroyingSystem, ShipSystem } from 'src/types/ShipSystem';
import type { SystemState } from 'src/types/SystemState';
import { GameObject } from './GameObject';
import { ShipInfo } from 'src/types/ShipInfo';
import { getDefaultSystemStates } from 'src/utils/getDefaultSystemStates';
import { getDefaultEngineeringState, getDefaultHelmState, getDefaultSensorsState, getDefaultWeaponsState, updateShipMotion } from 'src/features/stations';
import { getLast } from 'src/utils/arrays';
import { ObjectId } from 'src/types/GameObjectInfo';
import { pruneKeyframes } from 'src/utils/interpolate';

export class Ship extends GameObject implements ShipInfo {
    constructor(id: ObjectId) {
        super(id, 'ship');

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

        const changeMotion = this.helm.replaceMotion || (prunedLastManeuver && this.helm.destination !== null);
        this.helm.replaceMotion = false;

        updateShipMotion(this, this.helm, changeMotion, this.helm.destination, this.helm.maneuvers, currentTime);
    }

    public get evasionChance(): number {
        return this.helm.maneuvers[0]?.evasion ?? 0;
    }
}