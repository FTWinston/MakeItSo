import React, { useRef, useCallback } from 'react';
import { Theme as ThemeProvider } from '../theme';
import { Canvas } from './Canvas';
import { makeStyles, useTheme, Theme } from '@material-ui/core';

export default { title: 'Common/Generic/Canvas' };

const useStyles = makeStyles(theme => ({
    canvas: {
        width: '100vw',
        height: '100vh',
    },
}));
    
const Simple = () => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const classes = useStyles();

    const theme = useTheme();

    const drawThemed = useCallback(
        (ctx: CanvasRenderingContext2D, bounds: DOMRect) => draw(ctx, bounds, theme),
        [theme]
    );
    
    return (
        <Canvas
            ref={canvas}
            className={classes.canvas}
            draw={drawThemed}
        />
    )
}

export const example = () => (
    <ThemeProvider>
        <Simple />
    </ThemeProvider>
);

function draw(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
    theme: Theme
) {
    ctx.fillStyle = theme.palette.primary.main;
    ctx.fillRect(viewBounds.x, viewBounds.y, viewBounds.width * 0.5, viewBounds.height * 0.5);
    ctx.fillRect(viewBounds.x + viewBounds.width * 0.5, viewBounds.y + viewBounds.height * 0.5, viewBounds.width * 0.5, viewBounds.height * 0.5);
}