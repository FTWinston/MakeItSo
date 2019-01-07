import { Vector } from './Vector';

export class Vector3 implements Vector<Vector3> {
    constructor(public x: number, public y: number, public z: number) { }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    add(other: Vector3) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    subtract(other: Vector3) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    scale(factor: number) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
    }

    isBetween(min: Vector3, max: Vector3) {
        return this.x >= min.x && this.x <= max.x
            && this.y >= min.y && this.y <= max.y
            && this.z >= min.z && this.z <= max.z;
    }

    rotateX(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevY = this.y;
        this.y = this.y * cosa + this.z * sina;
        this.z = this.z * cosa - prevY * sina;
        return this;
    }

    rotateY(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevZ = this.z;
        this.z = this.z * cosa + this.x * sina;
        this.x = this.x * cosa - prevZ * sina;
        return this;
    }

    rotateZ(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevX = this.x;
        this.x = this.x * cosa + this.y * sina;
        this.y = this.y * cosa - prevX * sina;
        return this;
    }

    normalize() {
        const length = this.length();

        if (length > 0) {
            this.scale(1 / length);
        }
        else {
            this.x = 1; this.y = 0; this.z = 0;
        }
        
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    
    dot(other: Vector3) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    cross(other: Vector3) {
        return new Vector3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    static distanceSq(a: Vector3, b: Vector3) {
        return (a.x - b.x) * (a.x - b.x)
             + (a.y - b.y) * (a.y - b.y)
             + (a.z - b.z) * (a.z - b.z);
    }
}
