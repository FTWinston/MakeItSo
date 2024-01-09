import { PowerLevel } from 'src/types/ShipSystem';

export function getMaxDepth(powerLevel: PowerLevel): number {
    return powerLevel + 1;
}
