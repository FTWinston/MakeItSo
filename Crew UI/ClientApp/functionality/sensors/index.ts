export { SensorTarget } from './SensorTarget';
export { /*RelatableTarget,*/ Relationship } from './RelatableTarget';
//export { MoveableTarget } from './MoveableTarget';
import { Star } from './Star';
import { Planet } from './Planet';
import { Station } from './Station';
import { Ship } from './Ship';
export { Star, Planet, Station, Ship };

import { Vector3 } from '../';
import { Relationship } from 'ClientApp/functionality/sensors/RelatableTarget';

export function parseSensorTarget(data: string) {
    let vals = data.split(' ');
    let pos = new Vector3(
        parseFloat(data[0]),
        parseFloat(data[1]),
        parseFloat(data[2])
    );
    let id = parseInt(data[3]);

    switch (data[4]) {
        case 't': {
            let color = data[5];
            let radius = parseFloat(data[6]);
            let damageRadius = data.length > 7 ? parseFloat(data[7]) : undefined;
            return new Star(id, pos, color, radius, damageRadius);
        }
        case 'p': {
            let color = data[5];
            let radius = parseFloat(data[6]);
            return new Planet(id, pos, color, radius);
        }
        case 't': {
            let rel = parseInt(data[5]) as Relationship;
            return new Station(id, pos, rel);
        }
        case 'h': {
            let rel = parseInt(data[5]) as Relationship;
            let vel = new Vector3(
                parseFloat(data[6]),
                parseFloat(data[7]),
                parseFloat(data[8])
            );
            return new Ship(id, pos, vel, rel);
        }
        default:
            throw `Unexpected target type: ${data[4]}`;
    }
}