import { System } from '../../../common/data/System';
import { TargetingSolution, TargetingSolutionComplexity } from '../data/TargetingSolution';

export function createTargetingSolution(system: System, complexity: TargetingSolutionComplexity): TargetingSolution {
    return {
        system,
        complexity,
        duration: 3 + complexity,
        shapes: [
            [
                { x: 1, y: 1 },
                { x: 5, y: 1 },
                { x: 5, y: 5 },
                { x: 1, y: 5 }
            ],
            [
                { x: 1, y: 1 },
                { x: 4, y: 3 },
                { x: 5, y: 1 },
                { x: 5, y: 5 },
                { x: 1, y: 5 }
            ],
            [
                { x: 1, y: 1 },
                { x: 5, y: 1 },
                { x: 3, y: 3 },
                { x: 5, y: 5 },
                { x: 2, y: 4 },
                { x: 1, y: 5 }
            ]
        ].slice(0, complexity + 1)
    }
}