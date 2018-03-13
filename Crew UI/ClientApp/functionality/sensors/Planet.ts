import { CanvasBounds } from '~/functionality';
import { Celestial } from './Celestial';
import { Vector2, Vector3 } from '~/functionality/math'; 

export class Planet extends Celestial {
    constructor(id: number, position: Vector3, color: string, radius: number) {
        super(id, position, color, radius);
    }
}