import React, { useState, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { SpaceMap } from '../../../common/components/SpaceMap/SpaceMap';
import { Vector2D, vectorsEqual, determineAngle } from '../../../common/data/Vector2D';
import { useLongPress } from '../../../common/hooks/useLongPress';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { TouchEvents } from '../../../common/components/TouchEvents';
import { ColorName } from '../../../common/components/Colors';
import { getClosestCellCenter, fillHexCell } from '../../../common/components/SpaceMap/drawHexGrid';
import { getPositionValue } from '../../../common/data/Animation';
import { Waypoint } from '../../../common/data/Waypoint';

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
}));

interface Props {
    ships: Record<number, ClientShipState>;
    appendMove: (waypoint: Waypoint) => void;
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
    
    const { position, waypoints } = props.localShip;

    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>(() => getPositionValue(position));

    const [screenTouchPos, setScreenTouchPos] = useState<Vector2D>();
    const [newWaypoint, setNewWaypoint] = useState<Vector2D>();
    const [newAngle, setNewAngle] = useState<number>(0);

    const canvas = useRef<HTMLCanvasElement>(null);

    const tap = (pagePos: Vector2D) => {
        const { x, y } = getWorldCoordinates(canvas.current!, center, pagePos);
        props.appendMove(getClosestCellCenter(x, y, cellRadius));
    };

    const longPress = (pagePos: Vector2D) => {
        const { x: worldX, y: worldY } = getWorldCoordinates(canvas.current!, center, pagePos);
        const cellCenter = getClosestCellCenter(worldX, worldY, cellRadius);
        setNewWaypoint(cellCenter);
        
        // Screen target should be center of closest cell, still.
        setScreenTouchPos({
            x: pagePos.x - worldX + cellCenter.x,
            y: pagePos.y - worldY + cellCenter.y,
        });
    };

    const extraHandlers: TouchEvents | undefined = newWaypoint && screenTouchPos
        ? {
            onMouseMove: (e: React.MouseEvent<Element>) => {
                setNewAngle(determineAngle(screenTouchPos, { x: e.pageX, y: e.pageY }, newAngle));
            },
            onTouchMove: (e: React.TouchEvent<Element>) => {
                if (e.touches.length < 2) {
                    setNewAngle(determineAngle(screenTouchPos, { x: e.touches[0].pageX, y: e.touches[0].pageY }, newAngle));
                }
            },
            onMouseUp: () => {
                props.appendMove({
                    x: newWaypoint.x,
                    y: newWaypoint.y,
                    angle: newAngle
                });
                setNewWaypoint(undefined);
                setNewAngle(0);
                setTimeout(
                    () => {
                        setScreenTouchPos(undefined);
                    }
                , 10);
            },
            onTouchEnd: () => {
                props.appendMove({
                    x: newWaypoint.x,
                    y: newWaypoint.y,
                    angle: newAngle
                });
                setNewWaypoint(undefined);
                setNewAngle(0);
                setTimeout(
                    () => {
                        setScreenTouchPos(undefined);
                    }
                , 10);
            },
            onMouseLeave: () => {
                setScreenTouchPos(undefined);
                setNewWaypoint(undefined);
                setNewAngle(0);
            },
        }
        : undefined;

    const highlightDestinationCells = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        ctx.globalAlpha = 0.33;
       
        for (const cell of waypoints) {
            fillHexCell(ctx, cell, cellRadius, theme, 'secondary');
        }

        if (newWaypoint !== undefined) {
            fillHexCell(ctx, newWaypoint, cellRadius, theme, waypoints.length === 0 ? 'primary' : 'secondary');

            ctx.globalAlpha = 1;

            // Add an arrow indicating the target angle.
            ctx.translate(newWaypoint.x, newWaypoint.y);
            ctx.rotate(newAngle);

            ctx.beginPath();
            ctx.strokeStyle = theme.palette.success.main;
            ctx.lineWidth = 3;
            ctx.moveTo(0, 0);
            ctx.lineTo(cellRadius * 2, 0);
            ctx.stroke();

            ctx.rotate(-newAngle);
            ctx.translate(-newWaypoint.x, -newWaypoint.y);
        }

        ctx.globalAlpha = 1;
    };

    return (
        <SpaceMap
            ref={canvas}
            className={classes.map}
            gridColor={props.maneuverMode ? 'secondary' : 'primary'}
            dragEnabled={screenTouchPos === undefined}
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
