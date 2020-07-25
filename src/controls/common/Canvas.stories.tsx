import React, { useRef, useMemo, useLayoutEffect, useState } from 'react';
import { Theme } from '../../style/theme';
import { Canvas } from './Canvas';
import { makeStyles } from '@material-ui/core';

export default { title: 'Common/Canvas' };


const defaultBounds = new DOMRect(0, 0, 1, 1);

const useStyles = makeStyles(theme => ({
    canvas: {
        width: '100vw',
        height: '100vh',
    },
}));
    
const Simple = () => {
    const canvas = useRef<HTMLCanvasElement>(null);

    const classes = useStyles();
    
    const context = useMemo(
        () => canvas.current
            ? canvas.current.getContext('2d')
            : null,
        [canvas.current]
    );

    const [bounds, setBounds] = useState<DOMRect>(defaultBounds);

    useLayoutEffect(
        () => {    
            if (!context) {
                return;
            }

            context.translate(-bounds.x, -bounds.y);
            context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);

            draw(context, bounds);
            context.translate(bounds.x, bounds.y);
        },
        [context, bounds]
    );

    return (
        <Canvas
            ref={canvas}
            className={classes.canvas}
            boundsChanged={setBounds}
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