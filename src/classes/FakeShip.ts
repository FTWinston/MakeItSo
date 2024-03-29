import { updateShipMotion } from '../features/stations/features/helm';
import { getLast } from 'src/utils/arrays';
import { pruneKeyframes } from 'src/utils/interpolate';
import { ScanTreeDefinition, createScanTreeDefinitionFromTemplate } from 'src/features/stations';
import { getManeuver, ManeuverInfo, ManeuverType, getManeuverStartPosition, MotionConfiguration } from 'src/features/stations/features/helm';
import { Position } from 'src/types/Position';
import { MobileObject } from './MobileObject';
import { Space } from './Space';
import { ShipType } from '../types/ShipType';

export class FakeShip extends MobileObject {
    constructor(
        space: Space,
        readonly shipType: ShipType,
        startPosition: Position,
        readonly maneuverSequence: readonly ManeuverType[]
    ) {
        super(space, startPosition);
    }

    override get draw() { return this.shipType.draw; }

    override get faction() { return this.shipType.faction; }

    private nextManeuverIndex = 0;
    private maneuvers: ManeuverInfo[] = [];
    
    private motionConfig: MotionConfiguration = {
        rotationalSpeed: 0.2,
        speedWhileRotating: 0.2,
        speed: 1,
    }

    public get evasionChance(): number {
        return this.maneuvers[0]?.evasion ?? 0;
    }

    /** Remove manuevers that end in the past. Return true if none are left. */
    private pruneManeuvers(currentTime: number) {
        while (this.maneuvers.length > 0) {
            const firstManeuverKeyframes = this.maneuvers[0].motion;
            const lastKeyframe = getLast(firstManeuverKeyframes);

            if (lastKeyframe.time < currentTime) {
                this.maneuvers.shift();
                continue;
            }

            break;
        }
    }

    protected updateMotion(currentTime: number): void {
        pruneKeyframes(this.motion, currentTime);

        this.pruneManeuvers(currentTime);

        const changeMotion = this.maneuvers.length <= 1;

        if (changeMotion) {
            const startPosition = getManeuverStartPosition(this.motion, this.maneuvers, this.motionConfig, currentTime);
            const maneuver = getManeuver(this.maneuverSequence[this.nextManeuverIndex++], startPosition);
            this.maneuvers.push(maneuver);
            
            if (this.nextManeuverIndex >= this.maneuverSequence.length) {
                this.nextManeuverIndex = 0;
            }
        }

        updateShipMotion(this, this.motionConfig, changeMotion, null, this.maneuvers, currentTime);
    }
    
    private scanTreeDefinition: ScanTreeDefinition | undefined;

    getScanTree(): ScanTreeDefinition {
        if (!this.scanTreeDefinition) {
            this.scanTreeDefinition = createScanTreeDefinitionFromTemplate(this.shipType.scanTree);
        }
        
        return this.scanTreeDefinition;
    }
}