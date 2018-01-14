import { Vector } from './Vector';

export class Vector2 implements Vector<Vector2> {
    constructor(public x: number, public y: number) { }

    clone() {
        return new Vector2(this.x, this.y);
    }

    add(other: Vector2) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    subtract(other: Vector2) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    scale(factor: number) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    isBetween(min: Vector2, max: Vector2) {
        return this.x >= min.x && this.x <= max.x
            && this.y >= min.y && this.y <= max.y;
    }

    rotate(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevX = this.x;
        this.x = this.x * cosa + this.y * sina;
        this.y = this.y * cosa - prevX * sina;
        return this;
    }
    
    dot(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }
}
