import { GameObject } from './GameObject';
import { ObjectId } from 'src/types/GameObjectInfo';
import { Position } from 'src/types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { RelationshipType } from 'src/types/RelationshipType';

export class StaticObject extends GameObject {
    constructor(id: ObjectId, draw: ObjectAppearance, position: Position) {
        super(id, draw, RelationshipType.None);
        this.motion.push({ val: position, time: 0 });
    }
    
    updateMotion() {}
}
