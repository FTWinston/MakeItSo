import { forwardRef } from 'react';
import { drawFunction, drawMap } from '../utils/drawMap';
import { Canvas } from 'src/components/Canvas';
import { DiscreteColorName, styled, SxProps, useTheme } from 'src/lib/mui';
import { TouchEvents } from 'src/types/TouchEvents';
import { Vector2D } from 'src/types/Vector2D';
import { GameObjectInfo } from 'src/types/GameObjectInfo';

interface Props extends TouchEvents {
    className?: string;
    sx?: SxProps;
    gridColor: DiscreteColorName;
    objects: Iterable<GameObjectInfo>;
    getCenter: () => Vector2D;
    getCellRadius: () => number;
    drawExtraForeground?: drawFunction;
    drawExtraBackground?: drawFunction;
}

const StyledCanvas = styled(Canvas)(({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
}));

export const SpaceMap = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const theme = useTheme();

    const {    
        className,
        gridColor,
        objects,
        getCellRadius,
        getCenter,
        drawExtraForeground,
        drawExtraBackground,
        sx,
        ...interactionProps
    } = props;

    const draw = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        drawMap(ctx, bounds, theme, gridColor, getCellRadius(), getCenter(), objects, drawExtraBackground, drawExtraForeground);
    };

    return (
        <StyledCanvas
            ref={ref}
            className={className}
            sx={sx}
            animate={true}
            draw={draw}
            {...interactionProps}
        />
    )
});
