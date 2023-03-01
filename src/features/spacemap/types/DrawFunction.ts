import { Theme } from 'src/lib/mui';

export type DrawFunction = (
    ctx: CanvasRenderingContext2D,
    theme: Theme,
) => void;
