import { Celestial } from './Celestial';
import { Vector3 } from '~/functionality/math'; 
import { SensorTargetType } from './SensorTarget';

export class Planet extends Celestial {
    constructor(id: number, position: Vector3, color: string, radius: number) {
        super(id, SensorTargetType.Planet, position, color, radius);
    }
}