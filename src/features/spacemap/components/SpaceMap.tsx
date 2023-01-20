import { forwardRef } from 'react';
import { drawFunction, drawMap } from '../utils/drawMap';
import { Canvas } from 'src/components/Canvas';
import { TouchEvents } from 'src/types/TouchEvents';
import { ColorName, SxProps, useTheme } from 'src/lib/mui';
import { Vector2D } from 'src/types/Vector2D';
import { VesselInfo } from 'src/types/VesselInfo';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

interface Props extends TouchEvents {
    className?: string;
    gridColor: ColorName;
    vessels: VesselInfo[];
    localVessel?: VesselInfo;
    cellRadius: number;
    center: Vector2D;
    drawExtraForeground?: drawFunction;
    drawExtraBackground?: drawFunction;
    sx?: SxProps;
    bindGestures?: (...args: any[]) => ReactDOMAttributes;
}

export const SpaceMap = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const theme = useTheme();

    const {    
        className,
        gridColor,
        vessels,
        localVessel,
        cellRadius,
        center,
        drawExtraForeground,
        drawExtraBackground,
        sx,
        bindGestures,
        ...interactionProps
    } = props;

    const draw = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        drawMap(ctx, bounds, theme, gridColor, cellRadius, center, vessels, localVessel, drawExtraBackground, drawExtraForeground);
    };

    return (
        <Canvas
            ref={ref}
            className={className}
            sx={sx}
            animate={true}
            draw={draw}
            {...interactionProps}
            {...bindGestures?.()}
        />
    )
});
