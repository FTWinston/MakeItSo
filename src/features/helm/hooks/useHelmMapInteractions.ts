import { RefObject, useState } from 'react';
import { getClosestCellCenter, screenToWorld } from 'src/features/spacemap';
import { useHasChanged } from 'src/hooks/useHasChanged';
import { useLongPress, clickMoveLimit } from 'src/hooks/useLongPress';
import { usePanAndZoom } from 'src/hooks/usePanAndZoom';
import { Keyframes } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { TouchEvents } from 'src/types/TouchEvents';
import { determineAngle, Vector2D } from 'src/types/Vector2D';
import { interpolatePosition, interpolateVector } from 'src/utils/interpolate';

export function useHelmMapInteractions(
    canvas: RefObject<HTMLCanvasElement>,
    shipMotion: Keyframes<Position>,
    allowPanning: boolean,
    setDestination: undefined | ((destination: Position) => void),
    getInitialCenter: () => Vector2D,
    forceViewCenter?: Vector2D,
) { 
    const [addingDestination, setAddingDestination] = useState<Position>();

    const getExtraHandlers = (viewCenter: Vector2D, cellRadius: number) => {
        const tap = setDestination
            ? (pagePos: Vector2D) => {
                const worldPos = screenToWorld(canvas.current!, cellRadius, viewCenter, pagePos);
                const shipPos = interpolatePosition(shipMotion);
                const targetCellPos = getClosestCellCenter(worldPos.x, worldPos.y, 1);

                const angleFromShipToCellPos = determineAngle(shipPos, targetCellPos, shipPos.angle);
                
                setDestination({
                    x: targetCellPos.x,
                    y: targetCellPos.y,
                    angle: angleFromShipToCellPos,
                });
            }
            : () => {};

        const longPress = setDestination
            ? (pagePos: Vector2D) => {
                const worldPos = screenToWorld(canvas.current!, cellRadius, viewCenter, pagePos);
                const shipPos = interpolateVector(shipMotion);
                const targetCellPos = getClosestCellCenter(worldPos.x, worldPos.y, 1);

                const angleFromShipToCellPos = determineAngle(shipPos, targetCellPos, 0);

                setAddingDestination({
                    x: targetCellPos.x,
                    y: targetCellPos.y,
                    angle: angleFromShipToCellPos,
                });
            }
            : () => {};

        let extraHandlers: TouchEvents | undefined = setDestination && addingDestination
            ? {
                onMouseMove: (e: React.MouseEvent<Element>) => {
                    const screenPos = {
                        x: e.pageX,
                        y: e.pageY,
                    };

                    const worldPos = screenToWorld(canvas.current!, cellRadius, viewCenter, screenPos);

                    setAddingDestination(waypoint => ({
                        x: waypoint!.x,
                        y: waypoint!.y,
                        angle: determineAngle(addingDestination, worldPos, waypoint!.angle!),
                    }));
                },
                onTouchMove: (e: React.TouchEvent<Element>) => {
                    if (e.touches.length < 2) {
                        const screenPos = {
                            x: e.touches[0].pageX,
                            y: e.touches[0].pageY,
                        };

                        const worldPos = screenToWorld(canvas.current!, cellRadius, viewCenter, screenPos);

                        setAddingDestination(waypoint => ({
                            x: waypoint!.x,
                            y: waypoint!.y,
                            angle: determineAngle(addingDestination, worldPos, waypoint!.angle!),
                        }));
                    }
                },
                onMouseUp: () => {
                    setDestination({
                        x: addingDestination.x,
                        y: addingDestination.y,
                        angle: addingDestination.angle,
                    });
                    setAddingDestination(undefined);
                },
                onTouchEnd: () => {
                    setDestination({
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

        extraHandlers = useLongPress(longPress, tap, extraHandlers);
        return extraHandlers;
    }

    const {
        getCenter: getViewCenter,
        setCenter: setViewCenter,
        getZoom: getCellRadius,
        bindGestures,
    } = usePanAndZoom({
        getInitialCenter,
        getInitialZoom: () => 32,
        minZoom: 12,
        maxZoom: 192,
        dragThreshold: clickMoveLimit,
        allowPan: allowPanning && addingDestination === undefined,
        getExtraHandlers,
    });

    const forceCenterChanged = useHasChanged(forceViewCenter);
    if (forceViewCenter && forceCenterChanged) {
        setViewCenter(forceViewCenter);
    }

    return {
        getViewCenter,
        setViewCenter,
        getCellRadius,
        addingDestination,
        bindGestures,
    };
}