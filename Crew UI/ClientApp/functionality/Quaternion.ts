import { Vector3 } from './Vector3';

export class Quaternion {
    constructor(public w : number, public x: number, public y: number, public z: number) { }

    clone() {
        return new Quaternion(this.w, this.x, this.y, this.z);
    }

    multiply(other: Quaternion) {
        return new Quaternion(
            this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z,
            this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y,
            this.w * other.y - this.x * other.z + this.y * other.w + this.z * other.x,
            this.w * other.z + this.x * other.y - this.y * other.x + this.z * other.w
        );
    }

    conjugate() {
        return new Quaternion(
            this.w,
            -this.x,
            -this.y,
            -this.z
        );
    }

    rotate(vector: Vector3) {
        var other = new Quaternion(0, vector.x, vector.y, vector.z);
        var rotated = this.multiply(other).multiply(this.conjugate());
        return new Vector3(rotated.x, rotated.y, rotated.z);
    }
    
    getPitch() {
        // TOOD: see https://github.com/EpicGames/UnrealEngine/blob/release/Engine/Source/Runtime/Core/Private/Math/UnrealMath.cpp#L540
        return Math.asin(-2 * (this.x * this.z - this.w * this.y));
    }
    
    getYaw() {
        return Math.atan2(2 * (this.y * this.z + this.w * this.x), this.w * this.w - this.x * this.x - this.y * this.y + this.z * this.z);
    }

    getRoll() {
        return Math.atan2(2 * (this.x * this.y + this.w * this.z), this.w * this.w + this.x * this.x - this.y * this.y - this.z * this.z);
    }
}
