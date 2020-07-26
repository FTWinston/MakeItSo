import React, { useRef, useMemo, useLayoutEffect, useState } from 'react';
import { Theme } from '../../style/theme';
import { Canvas } from './Canvas';
import { makeStyles } from '@material-ui/core';

export default { title: 'Common/Canvas' };

const useStyles = makeStyles(theme => ({
    canvas: {
        width: '100vw',
        height: '100vh',
    },
}));
    
const Simple = () => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const classes = useStyles();
    
    return (
        <Canvas
            ref={canvas}
            className={classes.canvas}
            draw={draw}
        />
    )
}

export const simple = () => (
    <Theme>
        <Simple />
    </Theme>
);

function draw(
    ctx: CanvasRenderingContext2D,
    viewBounds: DOMRect,
) {
    console.log('viewBounds', viewBounds);
    ctx.fillStyle = '#090';
    ctx.fillRect(viewBounds.x, viewBounds.y, viewBounds.width * 0.5, viewBounds.height * 0.5);
    ctx.fillRect(viewBounds.x + viewBounds.width * 0.5, viewBounds.y + viewBounds.height * 0.5, viewBounds.width * 0.5, viewBounds.height * 0.5);
}