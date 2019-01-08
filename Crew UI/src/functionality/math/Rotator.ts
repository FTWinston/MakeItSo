import { Vector3 } from './Vector3';

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

    toVector() {
        const pitchRads = this.pitch * Math.PI / 180;
        const yawRads = this.yaw * Math.PI / 180;

        const pitchParts = this.sinCos(pitchRads);
        const yawParts = this.sinCos(yawRads);
        
        return new Vector3(pitchParts.cos * yawParts.cos, pitchParts.cos * yawParts.sin, pitchParts.sin);
    }

    private sinCos(value: number) {
        const invPi = 1 / Math.PI;
        const halfPi = Math.PI / 2;

        // Map Value to y in [-pi,pi], x = 2*pi*quotient + remainder.
        let quotient = (invPi * 0.5) * value;
        
		if (value >= 0.0)
		{
			quotient = Math.round(quotient + 0.5);
		}
		else
		{
			quotient = Math.round(quotient - 0.5);
        }
        
		let y = value - (2.0 * Math.PI) * quotient;

		// Map y to [-pi/2,pi/2] with sin(y) = sin(Value).
		let sign;
		if (y > halfPi)
		{
			y = Math.PI - y;
			sign = -1.0;
		}
		else if (y < -halfPi)
		{
			y = -Math.PI - y;
			sign = -1.0;
		}
		else
		{
			sign = +1.0;
		}

		const y2 = y * y;

        const p = ((((-2.6051615e-07 * y2 + 2.4760495e-05) * y2 - 0.0013888378) * y2 + 0.041666638) * y2 - 0.5) * y2 + 1.0;

        return {
            // 11-degree minimax approximation
            sin: (((((-2.3889859e-08 * y2 + 2.7525562e-06) * y2 - 0.00019840874) * y2 + 0.0083333310) * y2 - 0.16666667) * y2 + 1.0) * y,

            // 10-degree minimax approximation
            cos: sign * p,
        };
    }

    public static normalizeAxis(angle: number) {
        while (angle > 180) {
            angle -= 360;
        }
        while (angle <= 180) {
            angle += 360;
        }

        return angle;
    }
}
