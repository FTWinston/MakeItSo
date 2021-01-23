import { Polygon } from '../../../common/data/Polygon';
import { System } from '../../../common/data/System';

export enum TargetingSolutionComplexity {
    Simple = 0,
    Moderate = 1,
    Complex = 2,
}

export interface TargetingSolution {
    system: System;
    shapes: Polygon[];
    duration: number;
    complexity: TargetingSolutionComplexity;
}