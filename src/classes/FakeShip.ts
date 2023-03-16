import { updateShipMotion } from 'src/features/helm';
import { getLast } from 'src/utils/arrays';
import { ObjectId } from 'src/types/GameObjectInfo';
import { pruneKeyframes } from 'src/utils/interpolate';
import { getManeuver, ManeuverInfo, ManeuverType } from 'src/features/helm/features/maneuvers';
import { getManeuverStartPosition } from 'src/features/helm/utils/getManeuverStartPosition';
import { MotionConfiguration } from 'src/features/helm/types/HelmState';
import { Position } from 'src/types/Position';
import { MobileObject } from './MobileObject';

export class FakeShip extends MobileObject {
    constructor(
        id: ObjectId,
        startPosition: Position,
        readonly maneuverSequence: readonly ManeuverType[]
    ) {
        super(id, 'neutral', startPosition);
    }

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

    updateMotion(currentTime: number): void {
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
}