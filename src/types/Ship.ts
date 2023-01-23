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
import { getDefaultHelmState } from 'src/features/helm';
import { getDefaultSensorsState } from 'src/features/sensors';
import { getDefaultWeaponsState } from 'src/features/weapons';

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
    readonly systems: DefiniteMap<ShipSystem, SystemState>;
    readonly engineering: EngineeringState;
    readonly helm: HelmState;
    readonly sensors: SensorsState;
    readonly weapons: WeaponsState;

    updateMotion(currentTime: number): void {
        throw new Error('Method not implemented.');
    }
}