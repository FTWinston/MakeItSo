import { GameObject } from './GameObject';
import { ObjectId } from 'src/types/GameObjectInfo';
import { Position } from 'src/types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';

export abstract class MobileObject extends GameObject {
    constructor(id: ObjectId, type: ObjectAppearance, position: Position) {
        super(id, type);
        this.motion.push({ val: position, time: 0 });
    }
}
