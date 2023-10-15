import { GameObject } from './GameObject';
import { Position } from 'src/types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { RelationshipType } from 'src/types/RelationshipType';
import { Space } from './Space';

export class StaticObject extends GameObject {
    constructor(space: Space, draw: ObjectAppearance, position: Position) {
        super(space, draw, RelationshipType.None);
        this.motion.push({ val: position, time: 0 });
    }
    
    updateMotion() {}
}
