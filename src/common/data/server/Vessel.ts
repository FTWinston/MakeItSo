import { ContinuousInterpolation, Interpolation } from '../Interpolation';
import { Vector2D } from '../Vector2D';

export interface Vessel {
    position: ContinuousInterpolation<Vector2D>;
    futurePositions: Vector2D[];
    angle: Interpolation<number>;
}
