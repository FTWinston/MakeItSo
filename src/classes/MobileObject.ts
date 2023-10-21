import { GameObject } from './GameObject';
import { Position } from 'src/types/Position';
import { Space } from './Space';

export abstract class MobileObject extends GameObject {
    constructor(space: Space, position: Position) {
        super(space);
        this.motion.push({ val: position, time: 0 });
    }
}
