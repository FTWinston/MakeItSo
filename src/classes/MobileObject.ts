import { GameObject } from './GameObject';
import { Position } from 'src/types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { RelationshipType } from 'src/types/RelationshipType';
import { Space } from './Space';

export abstract class MobileObject extends GameObject {
    constructor(space: Space, draw: ObjectAppearance, rel: RelationshipType, position: Position) {
        super(space, draw, rel);
        this.motion.push({ val: position, time: 0 });
    }
}
