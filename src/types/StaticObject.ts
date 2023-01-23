import { GameObject } from './GameObject';
import { Position } from './Position';

export class StaticObject extends GameObject {
    constructor(position: Position) {
        super();
        this.motion.push({ val: position, time: 0 });
    }
    
    updateMotion() {}
}
