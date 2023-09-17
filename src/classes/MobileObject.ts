import { GameObject } from './GameObject';
import { ObjectId } from 'src/types/GameObjectInfo';
import { Position } from 'src/types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { RelationshipType } from 'src/types/RelationshipType';

export abstract class MobileObject extends GameObject {
    constructor(id: ObjectId, draw: ObjectAppearance, rel: RelationshipType, position: Position) {
        super(id, draw, rel);
        this.motion.push({ val: position, time: 0 });
    }
}
