import React, { useState, useMemo, useRef } from 'react';
import { Waypoint } from 'src/types/Waypoint';
import { determineAngle, Vector2D } from 'src/types/Vector2D';
import { getPositionValue } from 'src/utils/Animation';
import { getClosestCellCenter, getWorldCoordinates, SpaceMap } from 'src/features/spacemap';
import { TouchEvents } from 'src/types/TouchEvents';
import { ColorName, useTheme } from 'src/lib/mui';
import { drawWaypoint } from '../utils/drawWaypoint';
import { useLongPress } from 'src/hooks/useLongPress';
import { VesselInfo } from 'src/types/VesselInfo';

interface Props {
    ships: Partial<Record<number, VesselInfo>>;
    addWaypoint: (waypoint: Waypoint) => void;
    replaceMode: boolean;
    localShip: VesselInfo;
    waypoints: Waypoint[];
}

export const HelmMap: React.FC<Props> = props => {
    const theme = useTheme();

    const ships = useMemo(
        () => Object.values(props.ships) as VesselInfo[],
        [props.ships]
    );
    
    const position = props.localShip.position;

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

    const waypoints = props.waypoints;

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
