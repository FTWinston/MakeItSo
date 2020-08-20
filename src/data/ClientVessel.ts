import { ContinuousInterpolation, Interpolation } from './Interpolation';
import { Vector2D } from './Vector2D';

export interface ClientVessel {
    position: ContinuousInterpolation<Vector2D>;
    angle: Interpolation<number>;
}