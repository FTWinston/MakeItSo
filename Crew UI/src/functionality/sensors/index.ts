export { SensorTarget } from './SensorTarget';
export { /*RelatableTarget,*/ Relationship } from './RelatableTarget';
//export { MoveableTarget } from './MoveableTarget';
import { JumpPath, JumpPathStatus } from './JumpPath';
import { Star } from './Star';
import { Planet } from './Planet';
import { Station } from './Station';
import { Ship } from './Ship';
export { JumpPath, JumpPathStatus, Star, Planet, Station, Ship };

import { Vector3 } from '../';
import { Relationship } from '~/functionality/sensors/RelatableTarget';

export function parseSensorTarget(data: string) {
    let vals = data.split(' ');
    
    let id = parseInt(vals[0]);
    let pos = new Vector3(
        parseFloat(vals[1]),
        parseFloat(vals[2]),
        parseFloat(vals[3])
    );

    switch (vals[4]) {
        case '*': {
            let color = vals[5];
            let radius = parseFloat(vals[6]);
            let damageRadius = vals.length > 7 ? parseFloat(vals[7]) : undefined;
            return new Star(id, pos, color, radius, damageRadius);
        }
        case 'o': {
            let color = vals[5];
            let radius = parseFloat(vals[6]);
            return new Planet(id, pos, color, radius);
        }
        case '+': {
            let rel = parseInt(vals[5]) as Relationship;
            return new Station(id, pos, rel);
        }
        case 'v': {
            let rel = parseInt(vals[5]) as Relationship;
            let vel = new Vector3(
                parseFloat(vals[6]),
                parseFloat(vals[7]),
                parseFloat(vals[8])
            );
            return new Ship(id, pos, vel, rel);
        }
        default:
            throw new Error(`Unexpected target type: ${vals[4]}`);
    }
}