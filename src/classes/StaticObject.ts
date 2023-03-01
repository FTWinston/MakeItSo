import { GameObject } from './GameObject';
import { ObjectId } from '../types/GameObjectInfo';
import { Position } from '../types/Position';

export class StaticObject extends GameObject {
    constructor(id: ObjectId, position: Position) {
        super(id);
        this.motion.push({ val: position, time: 0 });
    }
    
    updateMotion() {}
}
