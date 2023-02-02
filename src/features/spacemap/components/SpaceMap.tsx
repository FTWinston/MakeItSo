import { forwardRef } from 'react';
import { drawFunction, drawMap } from '../utils/drawMap';
import { Canvas } from 'src/components/Canvas';
import { DiscreteColorName, SxProps, useTheme } from 'src/lib/mui';
import { TouchEvents } from 'src/types/TouchEvents';
import { Vector2D } from 'src/types/Vector2D';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { useInterpolatedVector2D } from 'src/hooks/useInterpolatedVector2D';

interface Props extends TouchEvents {
    className?: string;
    sx?: SxProps;
    gridColor: DiscreteColorName;
    vessels: GameObjectInfo[];
    localVessel?: GameObjectInfo;
    cellRadius: number;
    center: Vector2D;
    drawExtraForeground?: drawFunction;
    drawExtraBackground?: drawFunction;
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
        ...interactionProps
    } = props;

    const getCenter = useInterpolatedVector2D(center);

    const draw = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        drawMap(ctx, bounds, theme, gridColor, cellRadius, getCenter(), vessels, localVessel, drawExtraBackground, drawExtraForeground);
    };

    return (
        <Canvas
            ref={ref}
            className={className}
            sx={sx}
            animate={true}
            draw={draw}
            {...interactionProps}
        />
    )
});
