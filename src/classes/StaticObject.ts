import { GameObject } from './GameObject';
import { Position } from 'src/types/Position';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { RelationshipType } from 'src/types/RelationshipType';
import { Space } from './Space';

export abstract class StaticObject extends GameObject {
    constructor(space: Space, public readonly draw: ObjectAppearance, position: Position) {
        super(space);
        this.motion.push({ val: position, time: 0 });
    }

    override get rel() { return RelationshipType.None; }
    
    protected updateMotion() {}
}
