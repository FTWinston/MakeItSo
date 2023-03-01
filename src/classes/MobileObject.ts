import { GameObject } from './GameObject';
import { ObjectId } from 'src/types/GameObjectInfo';
import { Position } from 'src/types/Position';

export abstract class MobileObject extends GameObject {
    constructor(id: ObjectId, position: Position) {
        super(id);
        this.motion.push({ val: position, time: 0 });
    }
}
