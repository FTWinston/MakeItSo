import { Vector3 } from './Vector3';
import { Rotator } from './Rotator';

export class Quaternion {
    constructor(public x: number, public y: number, public z: number, public w: number) { }

    clone() {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    public static findBetween(a: Vector3, b: Vector3) {
        const normAB = Math.sqrt(a.lengthSq() * b.lengthSq());
        return this.doFindBetween(a, b, normAB);
    }

    public static findBetweenNormalized(a: Vector3, b: Vector3) {
        return this.doFindBetween(a, b, 1);
    }

    private static doFindBetween(a: Vector3, b: Vector3, normAB: number) {
        const w = normAB + a.dot(b);

        if (w > 1e-6 * normAB) {
            return new Quaternion(
                a.y * b.z - a.z * b.y,
                a.z * b.x - a.x * b.z,
                a.x * b.y - a.y * b.x,
                w
            );
        }
        else if (Math.abs(a.x) > Math.abs(a.y)) {
            return new Quaternion(-a.z, 0, a.x, 0);
        }
        else {
            return new Quaternion(0, -a.z, a.y, 0);
        }
    }

    public toRotator() {
        const singularityTest = this.z * this.x - this.w * this.y;
        const yawY = 2 * (this.w * this.z + this.x * this.y);
        const yawX = 1 - 2 * (this.y * this.y + this.z * this.z);

        const SINGULARITY_THRESHOLD = 0.4999995;
        const RAD_TO_DEG = 180 / Math.PI;

        if (singularityTest < -SINGULARITY_THRESHOLD) {
            const pitch = -90;
            const yaw = Math.atan2(yawY, yawX) * RAD_TO_DEG;
            const roll = Rotator.normalizeAxis(-yaw - (2 * Math.atan2(this.x, this.w) * RAD_TO_DEG));

            return new Rotator(pitch, yaw, roll);
        }
        else if (singularityTest > SINGULARITY_THRESHOLD)
        {
            const pitch = 90;
            const yaw = Math.atan2(yawY, yawX) * RAD_TO_DEG;
            const roll = Rotator.normalizeAxis(yaw - (2 * Math.atan2(this.x, this.w) * RAD_TO_DEG));

            return new Rotator(pitch, yaw, roll);
        }
        else
        {
            const pitch = Math.asin(2 * singularityTest) * RAD_TO_DEG;
            const yaw = Math.atan2(yawY, yawX) * RAD_TO_DEG;
            const roll = Math.atan2(
                -2 * (this.w * this.x + this.y * this.z),
                1 - 2 * (this.x * this.x + this.y * this.y)
            ) * RAD_TO_DEG;

            return new Rotator(pitch, yaw, roll);
        }
    }
}
