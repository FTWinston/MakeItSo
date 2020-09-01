import React, { useState, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { SpaceMap } from '../../../common/components/SpaceMap/SpaceMap';
import { Vector2D, vectorsEqual, determineAngle } from '../../../common/data/Vector2D';
import { useLongPress } from '../../../common/hooks/useLongPress';
import { continuousVectorValue } from '../../../common/data/Interpolation';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { TouchEvents } from '../../../common/components/TouchEvents';
import { ColorName } from '../../../common/components/Colors';
import { getClosestCellCenter, fillHexCell } from '../../../common/components/SpaceMap/drawHexGrid';

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
}));

interface Props {
    ships: Record<number, ClientShipState>;
    appendMove: (target: Vector2D, angle?: number) => void;
    maneuverMode: boolean;
    localShip: ClientShipState;
}

export const HelmMap: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    const ships = useMemo(
        () => Object.values(props.ships),
        [props.ships]
    );
    
    const { position, futurePositions } = props.localShip;

    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>(() => continuousVectorValue(position));

    const [screenTarget, setScreenTarget] = useState<Vector2D>();
    const [target, setTarget] = useState<Vector2D>();
    const [angle, setAngle] = useState<number>(0);

    const canvas = useRef<HTMLCanvasElement>(null);

    const tap = (pagePos: Vector2D) => {
        const { x, y } = getWorldCoordinates(canvas.current!, center, pagePos);
        props.appendMove(getClosestCellCenter(x, y, cellRadius), undefined);
    };

    const longPress = (pagePos: Vector2D) => {
        const { x: worldX, y: worldY } = getWorldCoordinates(canvas.current!, center, pagePos);
        const cellCenter = getClosestCellCenter(worldX, worldY, cellRadius);
        setTarget(cellCenter);
        
        // Screen target should be center of closest cell, still.
        setScreenTarget({
            x: pagePos.x - worldX + cellCenter.x,
            y: pagePos.y - worldY + cellCenter.y,
        });
    };

    const extraHandlers: TouchEvents | undefined = target && screenTarget
        ? {
            onMouseMove: (e: React.MouseEvent<Element>) => {
                setAngle(determineAngle(screenTarget, { x: e.pageX, y: e.pageY }, angle));
            },
            onTouchMove: (e: React.TouchEvent<Element>) => {
                if (e.touches.length < 2) {
                    setAngle(determineAngle(screenTarget, { x: e.touches[0].pageX, y: e.touches[0].pageY }, angle));
                }
            },
            onMouseUp: () => {
                props.appendMove(target, angle);
                setTarget(undefined);
                setAngle(0);
                setTimeout(
                    () => {
                        setScreenTarget(undefined);
                    }
                , 10);
            },
            onTouchEnd: () => {
                props.appendMove(target, angle);
                setTarget(undefined);
                setAngle(0);
                setTimeout(
                    () => {
                        setScreenTarget(undefined);
                    }
                , 10);
            },
            onMouseLeave: () => {
                setScreenTarget(undefined);
                setTarget(undefined);
                setAngle(0);
            },
        }
        : undefined;

    const highlightDestinationCells = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        ctx.globalAlpha = 0.33;

        let targetColor: ColorName;
        if (!vectorsEqual(position.current.startValue, position.current.endValue)) {
            fillHexCell(ctx, position.current.endValue, cellRadius, theme, 'primary');
            targetColor = 'secondary';
        }
        else {
            targetColor = 'primary';
        }

        for (const cell of futurePositions) {
            fillHexCell(ctx, cell, cellRadius, theme, 'secondary');
        }

        if (position.next) {
            fillHexCell(ctx, position.next.value, cellRadius, theme, 'secondary');
        }
        
        if (target !== undefined) {
            fillHexCell(ctx, target, cellRadius, theme, targetColor);

            ctx.globalAlpha = 1;

            // Add an arrow indicating the target angle.
            ctx.translate(target.x, target.y);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.strokeStyle = theme.palette.success.main;
            ctx.lineWidth = 3;
            ctx.moveTo(0, 0);
            ctx.lineTo(cellRadius * 2, 0);
            ctx.stroke();

            ctx.rotate(-angle);
            ctx.translate(-target.x, -target.y);
        }

        ctx.globalAlpha = 1;
    };

    return (
        <SpaceMap
            ref={canvas}
            className={classes.map}
            gridColor={props.maneuverMode ? 'secondary' : 'primary'}
            dragEnabled={screenTarget === undefined}
            cellRadius={cellRadius}
            setCellRadius={setCellRadius}
            center={center}
            setCenter={setCenter}
            vessels={ships}
            localVessel={props.localShip}
            {...useLongPress(longPress, tap, extraHandlers)}
            drawExtraBackground={highlightDestinationCells}
        />
    );
}
