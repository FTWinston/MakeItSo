import React, { useState, useMemo, useRef } from 'react';
import { Position } from 'src/types/Position';
import { determineAngle, distanceSq, Vector2D } from 'src/types/Vector2D';
import { getPositionValue, getVectorValue } from 'src/types/Animation';
import { getClosestCellCenter, screenToWorld, SpaceMap } from 'src/features/spacemap';
import { TouchEvents } from 'src/types/TouchEvents';
import { useTheme } from 'src/lib/mui';
import { drawWaypoint } from '../utils/drawWaypoint';
import { clickMoveLimit, useLongPress } from 'src/hooks/useLongPress';
import { VesselInfo } from 'src/types/VesselInfo';
import { usePanAndZoom } from 'src/hooks/usePanAndZoom';
import { Rectangle } from 'src/types/Rectangle';

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
    
    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>(() => getPositionValue(props.localShip.position));

    const [addingDestination, setAddingDestination] = useState<Position>();

    const canvas = useRef<HTMLCanvasElement>(null);

    const tap = (pagePos: Vector2D) => {
        const worldPos = screenToWorld(canvas.current!, cellRadius, center, pagePos);
        const shipPos = getVectorValue(props.localShip.position);
        const targetCellPos = getClosestCellCenter(worldPos.x, worldPos.y, 1);

        const angleFromShipToCellPos = determineAngle(shipPos, targetCellPos, 0);
        
        props.setDestination({
            x: targetCellPos.x,
            y: targetCellPos.y,
            angle: angleFromShipToCellPos,
        });
    };

    const longPress = (pagePos: Vector2D) => {
        const worldPos = screenToWorld(canvas.current!, cellRadius, center, pagePos);
        const shipPos = getVectorValue(props.localShip.position);
        const targetCellPos = getClosestCellCenter(worldPos.x, worldPos.y, 1);

        const angleFromShipToCellPos = determineAngle(shipPos, targetCellPos, 0);

        setAddingDestination({
            x: targetCellPos.x,
            y: targetCellPos.y,
            angle: angleFromShipToCellPos,
        });
    };

    const drawDestinations = (ctx: CanvasRenderingContext2D, bounds: Rectangle, pixelSize: number) => {    
        if (addingDestination) {
            drawWaypoint(ctx, addingDestination, 1, theme, 'primary');
        }

        if (props.destination) {
            // If adjusting destination on the same cell as the curent destination, don't draw both arrows.
            if (addingDestination && distanceSq(addingDestination, props.destination) < 0.1) {
                return;
            }

            drawWaypoint(ctx, props.destination, 1, theme, addingDestination ? 'warning' : 'primary');
        }
    };

    const extraHandlers: TouchEvents | undefined = addingDestination
        ? {
            onMouseMove: (e: React.MouseEvent<Element>) => {
                const screenPos = {
                    x: e.pageX,
                    y: e.pageY,
                };

                const worldPos = screenToWorld(canvas.current!, cellRadius, center, screenPos);

                setAddingDestination(waypoint => ({
                    x: waypoint!.x,
                    y: waypoint!.y,
                    angle: determineAngle(addingDestination, worldPos, waypoint!.angle!)
                }));
            },
            onTouchMove: (e: React.TouchEvent<Element>) => {
                if (e.touches.length < 2) {
                    const screenPos = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY,
                    };

                    const worldPos = screenToWorld(canvas.current!, cellRadius, center, screenPos);

                    setAddingDestination(waypoint => ({
                        x: waypoint!.x,
                        y: waypoint!.y,
                        angle: determineAngle(addingDestination, worldPos, waypoint!.angle!)
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
            },
            onTouchEnd: () => {
                props.setDestination({
                    x: addingDestination.x,
                    y: addingDestination.y,
                    angle: addingDestination.angle,
                });
                setAddingDestination(undefined);
            },
            onMouseLeave: () => {
                setAddingDestination(undefined);
            },
        }
        : undefined;

    const logPressHandlers = useLongPress(longPress, tap, extraHandlers);

    const bindGestures = usePanAndZoom({
        center,
        setCenter: addingDestination === undefined ? setCenter : () => {},
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
