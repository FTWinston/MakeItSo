import { Vector3 } from './Vector3';

type NineNumbers = [number, number, number, number, number, number, number, number, number];

export class Matrix {
    constructor(public elements: NineNumbers) { }

    element(x: number, y: number) {
		if (x < 0 || x > 2 || y < 0 || y > 2) {
			throw new Error('Matrix x & y must be in the range 0 - 2');
        }
        
		return this.elements[y * 3 + x];
    }

    clone() {
        return new Matrix(this.elements.slice() as NineNumbers);
    }

    multiply(other: Matrix) {
        let elements = [];
        
        for (let z = 0; z < 3; z++) {
            for (let y = 0; y < 3; y++) {
                let sum = 0;
                for (let x = 0; x < 3; x++) {
                    sum += other.element(y, x) * this.element(x, z);
                }
                elements.push(sum);
            }
        }

        return new Matrix(elements as NineNumbers);
    }
    
    multiplyVector(other: Vector3) {
        let x = other.x * this.element(0, 0)
              + other.y * this.element(1, 0)
              + other.z * this.element(2, 0);
        let y = other.x * this.element(0, 1)
              + other.y * this.element(1, 1)
              + other.z * this.element(2, 1);
        let z = other.x * this.element(0, 2)
              + other.y * this.element(1, 2)
              + other.z * this.element(2, 2);
        return new Vector3(x, y, z);
    }

    static readonly identity = new Matrix([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ] as NineNumbers);

    static xRotation(angle: number) {
        let a = Math.cos(angle);
        let b = Math.sin(angle);
        return new Matrix([
            1, 0, 0,
            0, a,-b,
            0, b, a,
        ]);
    }

    static yRotation(angle: number) {
        let a = Math.cos(angle);
        let b = Math.sin(angle);
        return new Matrix([
            a, 0, b,
            0, 1, 0,
           -b, 0, a,
        ]);
    }

    static zRotation(angle: number) {
        let a = Math.cos(angle);
        let b = Math.sin(angle);
        return new Matrix([
            a,-b, 0,
            b, a, 0,
            0, 0, 1,
        ]);
    }
}
