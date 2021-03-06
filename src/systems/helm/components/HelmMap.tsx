import React, { useState, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { SpaceMap } from '../../../common/components/SpaceMap/SpaceMap';
import { Vector2D, determineAngle } from '../../../common/data/Vector2D';
import { useLongPress } from '../../../common/hooks/useLongPress';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { TouchEvents } from '../../../common/components/TouchEvents';
import { ColorName } from '../../../common/components/Colors';
import { getClosestCellCenter } from '../../../common/components/SpaceMap/drawHexGrid';
import { getPositionValue } from '../../../common/data/Animation';
import { Waypoint } from '../../../common/data/Waypoint';
import { drawWaypoint } from './drawWaypoint';
import { partialValues } from '../../../logic/records';

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
}));

interface Props {
    ships: Partial<Record<number, ClientShipState>>;
    addWaypoint: (waypoint: Waypoint) => void;
    replaceMode: boolean;
    localShip: ClientShipState;
}

export const HelmMap: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    const ships = useMemo(
        () => partialValues(props.ships),
        [props.ships]
    );
    
    const position = props.localShip.position;
    const waypoints = props.localShip.helm.waypoints;

    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>(() => getPositionValue(position));

    const [screenTouchPos, setScreenTouchPos] = useState<Vector2D>();
    const [newWaypoint, setNewWaypoint] = useState<Waypoint>();

    const canvas = useRef<HTMLCanvasElement>(null);

    const tap = (pagePos: Vector2D) => {
        const world = getWorldCoordinates(canvas.current!, center, pagePos);
        props.addWaypoint(getClosestCellCenter(world.x, world.y, cellRadius));
    };

    const longPress = (pagePos: Vector2D) => {
        const world = getWorldCoordinates(canvas.current!, center, pagePos);
        const cellCenter = getClosestCellCenter(world.x, world.y, cellRadius);

        setNewWaypoint({
            x: cellCenter.x,
            y: cellCenter.y,
            angle: 0,
        });
        
        // Screen target should be center of closest cell, still.
        setScreenTouchPos({
            x: pagePos.x - world.x + cellCenter.x,
            y: pagePos.y - world.y + cellCenter.y,
        });
    };

    const extraHandlers: TouchEvents | undefined = newWaypoint && screenTouchPos
        ? {
            onMouseMove: (e: React.MouseEvent<Element>) => {
                const pagePos = {
                    x: e.pageX,
                    y: e.pageY,
                };

                setNewWaypoint(waypoint => ({
                    x: waypoint!.x,
                    y: waypoint!.y,
                    angle: determineAngle(screenTouchPos, pagePos, waypoint!.angle!)
                }));
            },
            onTouchMove: (e: React.TouchEvent<Element>) => {
                if (e.touches.length < 2) {
                    const pagePos = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY,
                    };

                    setNewWaypoint(waypoint => ({
                        x: waypoint!.x,
                        y: waypoint!.y,
                        angle: determineAngle(screenTouchPos, pagePos, waypoint!.angle!)
                    }));
                }
            },
            onMouseUp: () => {
                props.addWaypoint({
                    x: newWaypoint.x,
                    y: newWaypoint.y,
                    angle: newWaypoint.angle,
                });
                setNewWaypoint(undefined);
                setTimeout(
                    () => {
                        setScreenTouchPos(undefined);
                    }
                , 10);
            },
            onTouchEnd: () => {
                props.addWaypoint({
                    x: newWaypoint.x,
                    y: newWaypoint.y,
                    angle: newWaypoint.angle,
                });
                setNewWaypoint(undefined);
                setTimeout(
                    () => {
                        setScreenTouchPos(undefined);
                    }
                , 10);
            },
            onMouseLeave: () => {
                setScreenTouchPos(undefined);
                setNewWaypoint(undefined);
            },
        }
        : undefined;

    const drawWaypoints = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {    
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${Math.round(cellRadius * 0.45)}px Jura`;

        const existingNumbers = waypoints.length > 1 || !props.replaceMode;

        for (let i = 0; i < waypoints.length; i++) {
            const color: ColorName = i === 0
                ? 'primary'
                : 'secondary';

            drawWaypoint(ctx, waypoints[i], cellRadius, theme, color, existingNumbers ? i + 1 : undefined);
        }

        if (newWaypoint !== undefined) {
            const color: ColorName = waypoints.length === 0
                ? 'primary'
                : 'secondary';

            drawWaypoint(ctx, newWaypoint, cellRadius, theme, color, props.replaceMode ? undefined : waypoints.length + 1);
        }
    };

    return (
        <SpaceMap
            ref={canvas}
            className={classes.map}
            gridColor={props.replaceMode ? 'secondary' : 'primary'}
            dragEnabled={screenTouchPos === undefined}
            cellRadius={cellRadius}
            setCellRadius={setCellRadius}
            center={center}
            setCenter={setCenter}
            vessels={ships}
            localVessel={props.localShip}
            {...useLongPress(longPress, tap, extraHandlers)}
            drawExtraBackground={drawWaypoints}
        />
    );
}
