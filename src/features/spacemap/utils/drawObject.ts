import { Theme } from 'src/lib/mui';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { DrawFunction } from '../types/DrawFunction';
import { drawNeutral } from './appearances/drawNeutral';
import { drawEnemy } from './appearances/drawEnemy';
import { drawShip } from './appearances/drawShip';

const drawFunctions: Record<ObjectAppearance, DrawFunction> = {
    ship: drawShip,
    neutral: drawNeutral,
    enemy: drawEnemy,
};

export function drawObject(
    ctx: CanvasRenderingContext2D,
    theme: Theme,
    type: ObjectAppearance,
) {
    const drawFunction = drawFunctions[type];
    if (!drawFunction) {
        throw new Error(`No draw function for type: ${type}`);
    }

    return drawFunction(ctx, theme);
}
