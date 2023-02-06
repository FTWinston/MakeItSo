import { forwardRef } from 'react';
import { drawFunction, drawMap } from '../utils/drawMap';
import { Canvas } from 'src/components/Canvas';
import { DiscreteColorName, SxProps, useTheme } from 'src/lib/mui';
import { TouchEvents } from 'src/types/TouchEvents';
import { Vector2D } from 'src/types/Vector2D';
import { GameObjectInfo } from 'src/types/GameObjectInfo';

interface Props extends TouchEvents {
    className?: string;
    sx?: SxProps;
    gridColor: DiscreteColorName;
    vessels: GameObjectInfo[];
    localVessel?: GameObjectInfo;
    getCenter: () => Vector2D;
    getCellRadius: () => number;
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
        getCellRadius,
        getCenter,
        drawExtraForeground,
        drawExtraBackground,
        sx,
        ...interactionProps
    } = props;

    const draw = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        drawMap(ctx, bounds, theme, gridColor, getCellRadius(), getCenter(), vessels, localVessel, drawExtraBackground, drawExtraForeground);
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
