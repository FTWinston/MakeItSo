import { GameObject } from './GameObject';
import { ObjectId } from '../types/GameObjectInfo';
import { Position } from '../types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';

export class StaticObject extends GameObject {
    constructor(id: ObjectId, type: ObjectAppearance, position: Position) {
        super(id, type);
        this.motion.push({ val: position, time: 0 });
    }
    
    updateMotion() {}
}
