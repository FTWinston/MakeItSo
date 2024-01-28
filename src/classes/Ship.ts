import { EngineeringState, HelmState, ScanTreeDefinition, SensorsState, WeaponsState, createScanTreeDefinitionFromTemplate } from 'src/features/stations';
import { getInitialEngineeringState, engineeringReducer, getInitialHelmState, helmReducer, getInitialSensorsState, sensorsReducer, getInitialWeaponsState, weaponsReducer, updateShipMotion } from 'src/features/stations';
import type { DefiniteMap } from 'src/types/DefiniteMap';
import type { ObjectId } from 'src/types/GameObjectInfo';
import type { Position } from 'src/types/Position';
import type { ShipInfo } from 'src/types/ShipInfo';
import type { ShipDestroyingSystem, ShipSystem } from 'src/types/ShipSystem';
import type { SystemState } from 'src/types/SystemState';
import { getLast } from 'src/utils/arrays';
import { getDefaultSystemStates } from 'src/utils/getDefaultSystemStates';
import { pruneKeyframes } from 'src/utils/interpolate';
import { Space } from './Space';
import { MobileObject } from './MobileObject';
import { ShipType } from '../types/ShipType';
import { ShipConfiguration } from 'src/types/ShipConfiguration';

export class Ship extends MobileObject implements ShipInfo {
    constructor(space: Space, readonly shipType: ShipType, configuration: ShipConfiguration, position: Position) {
        super(space, position);

        this.systems = getDefaultSystemStates();
        this.engineering = getInitialEngineeringState(shipType, configuration.engineering);
        this.helm = getInitialHelmState(shipType, configuration.helm);
        this.sensors = getInitialSensorsState(shipType, configuration.sensors);
        this.weapons = getInitialWeaponsState(shipType, configuration.weapons);
    }

    override get draw() { return this.shipType.draw; }

    override get faction() { return this.shipType.faction; }

    destroyed?: ShipDestroyingSystem;
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
    helm: HelmState;
    sensors: SensorsState;
    weapons: WeaponsState;
    viewTarget?: ObjectId;

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

    public override tick(currentTime: number): void {
        super.tick(currentTime);

        // Tick every ship system. (Each system's reducer handles all of its updates, including ticking.)
        const action = { type: 'tick', currentTime } as const;
        
        engineeringReducer(this, action);
        helmReducer(this, action);
        sensorsReducer(this, action);
        weaponsReducer(this, action);
    }

    protected updateMotion(currentTime: number): void {
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
    
    private scanTreeDefinition: ScanTreeDefinition | undefined;

    getScanTree(): ScanTreeDefinition {
        if (!this.scanTreeDefinition) {
            this.scanTreeDefinition = createScanTreeDefinitionFromTemplate(this.shipType.scanTree);
        }
        
        return this.scanTreeDefinition;
    }
}