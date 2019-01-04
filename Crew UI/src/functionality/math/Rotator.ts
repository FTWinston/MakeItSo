export class Rotator {
    constructor(public pitch: number, public yaw: number, public roll: number) { }

    clone() {
        return new Rotator(this.pitch, this.yaw, this.roll);
    }

    add(other: Rotator) {
        this.pitch += other.pitch;
        this.yaw += other.yaw;
        this.roll += other.roll;
        return this;
    }
}
