import React, { useState, useMemo, useRef } from 'react';
import { Position } from 'src/types/Position';
import { determineAngle, distanceSq, Vector2D } from 'src/types/Vector2D';
import { getPositionValue } from 'src/utils/Animation';
import { getClosestCellCenter, getWorldCoordinates, SpaceMap } from 'src/features/spacemap';
import { TouchEvents } from 'src/types/TouchEvents';
import { useTheme } from 'src/lib/mui';
import { drawWaypoint } from '../utils/drawWaypoint';
import { clickMoveLimit, useLongPress } from 'src/hooks/useLongPress';
import { VesselInfo } from 'src/types/VesselInfo';
import { usePanAndZoom } from 'src/hooks/usePanAndZoom';

interface Props {
    ships: Partial<Record<number, VesselInfo>>;
    localShip: VesselInfo;
    destination: Position | null;
    setDestination: (waypoint: Position) => void;
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
    const [addingDestination, setAddingDestination] = useState<Position>();

    const canvas = useRef<HTMLCanvasElement>(null);

    const tap = (pagePos: Vector2D) => {
        const world = getWorldCoordinates(canvas.current!, center, pagePos);
        const cellPos = getClosestCellCenter(world.x, world.y, cellRadius);

        const angleFromShipToCellPos = 0; // TODO: this
        
        props.setDestination({
            ...cellPos,
            angle: angleFromShipToCellPos,
        });
    };

    const longPress = (pagePos: Vector2D) => {
        const world = getWorldCoordinates(canvas.current!, center, pagePos);
        const cellCenter = getClosestCellCenter(world.x, world.y, cellRadius);

        setAddingDestination({
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

    const drawDestinations = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {    
        if (addingDestination) {
            drawWaypoint(ctx, addingDestination, cellRadius, theme, 'secondary');
        }

        if (props.destination) {
            // If adjusting destination on the same cell as the curent destination, don't draw both arrows.
            if (addingDestination && distanceSq(addingDestination, props.destination) < 0.1) {
                return;
            }

            drawWaypoint(ctx, props.destination, cellRadius, theme, 'primary');
        }
    };

    const extraHandlers: TouchEvents | undefined = addingDestination && screenTouchPos
        ? {
            onMouseMove: (e: React.MouseEvent<Element>) => {
                const pagePos = {
                    x: e.pageX,
                    y: e.pageY,
                };

                setAddingDestination(waypoint => ({
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

                    setAddingDestination(waypoint => ({
                        x: waypoint!.x,
                        y: waypoint!.y,
                        angle: determineAngle(screenTouchPos, pagePos, waypoint!.angle!)
                    }));
                }
            },
            onMouseUp: () => {
                props.setDestination({
                    x: addingDestination.x,
                    y: addingDestination.y,
                    angle: addingDestination.angle,
                });
                setAddingDestination(undefined);
                setTimeout(
                    () => {
                        setScreenTouchPos(undefined);
                    }
                , 10);
            },
            onTouchEnd: () => {
                props.setDestination({
                    x: addingDestination.x,
                    y: addingDestination.y,
                    angle: addingDestination.angle,
                });
                setAddingDestination(undefined);
                setTimeout(
                    () => {
                        setScreenTouchPos(undefined);
                    }
                , 10);
            },
            onMouseLeave: () => {
                setScreenTouchPos(undefined);
                setAddingDestination(undefined);
            },
        }
        : undefined;

    const logPressHandlers = useLongPress(longPress, tap, extraHandlers);

    const bindGestures = usePanAndZoom({
        center,
        setCenter: screenTouchPos === undefined ? setCenter : () => {},
        dragThreshold: clickMoveLimit,
        zoom: cellRadius,
        setZoom: setCellRadius,
        minZoom: 12,
        maxZoom: 192,
        extraHandlers: logPressHandlers,
    });

    return (
        <SpaceMap
            ref={canvas}
            gridColor="secondary"
            cellRadius={cellRadius}
            center={center}
            vessels={ships}
            localVessel={props.localShip}
            drawExtraBackground={drawDestinations}
            {...bindGestures()}
        />
    );
}
