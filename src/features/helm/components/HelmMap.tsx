import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Position } from 'src/types/Position';
import { determineAngle, distanceSq, Vector2D } from 'src/types/Vector2D';
import { getVectorValue } from 'src/types/Keyframes';
import { getClosestCellCenter, getWorldBounds, screenToWorld, SpaceMap } from 'src/features/spacemap';
import { TouchEvents } from 'src/types/TouchEvents';
import { useTheme } from 'src/lib/mui';
import { drawWaypoint } from '../utils/drawWaypoint';
import { clickMoveLimit, useLongPress } from 'src/hooks/useLongPress';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { usePanAndZoom } from 'src/hooks/usePanAndZoom';
import { isInRectangle, Rectangle } from 'src/types/Rectangle';
import { drawManeuver, ManeuverInfo } from '../features/maneuvers';
import { getTime } from 'src/utils/timeSpans';

interface Props {
    getInitialCenter: () => Vector2D;
    forceCenter?: Vector2D;
    ships: Partial<Record<number, GameObjectInfo>>;
    localShip: GameObjectInfo;
    destination: Position | null;
    maneuvers: ManeuverInfo[][];
    setDestination: (waypoint: Position) => void;
    shipVisible: boolean;
    setShipVisible: (visible: boolean) => void;
}

export const HelmMap: React.FC<Props> = props => {
    const theme = useTheme();
    
    const {
        getCenter: getViewCenter,
        setCenter: setViewCenter,
        getZoom: getCellRadius,
        bindGestures,
    } = usePanAndZoom({
        getInitialCenter: props.getInitialCenter,
        getInitialZoom: () => 32,
        minZoom: 12,
        maxZoom: 192,
        dragThreshold: clickMoveLimit,
        extraHandlers: longPressHandlers,
    });

    if (props.forceCenter) {
        setViewCenter(props.forceCenter);
    }

    const ships = useMemo(
        () => Object.values(props.ships) as GameObjectInfo[],
        [props.ships]
    );
    
    const [addingDestination, setAddingDestination] = useState<Position>();

    const canvas = useRef<HTMLCanvasElement>(null);

    const { localShip, shipVisible } = props;
    const { motion } = localShip;

    const viewCenter = getViewCenter();
    const cellRadius = getCellRadius();

    useEffect(() => {
        const bounds = getWorldBounds(canvas.current!, cellRadius, viewCenter);

        const updateVisibility = () => {
            const visible = isInRectangle(bounds, getVectorValue(motion));
            if (shipVisible !== visible) {
                props.setShipVisible(visible);   
            }
        }

        updateVisibility();
        const interval = setInterval(updateVisibility, 250);
        return () => clearInterval(interval);
    }, [motion, viewCenter, shipVisible]);

    const tap = (pagePos: Vector2D) => {
        const worldPos = screenToWorld(canvas.current!, cellRadius, viewCenter, pagePos);
        const shipPos = getVectorValue(props.localShip.motion);
        const targetCellPos = getClosestCellCenter(worldPos.x, worldPos.y, 1);

        const angleFromShipToCellPos = determineAngle(shipPos, targetCellPos, 0);
        
        props.setDestination({
            x: targetCellPos.x,
            y: targetCellPos.y,
            angle: angleFromShipToCellPos,
        });
    };

    const longPress = (pagePos: Vector2D) => {
        const worldPos = screenToWorld(canvas.current!, cellRadius, viewCenter, pagePos);
        const shipPos = getVectorValue(props.localShip.motion);
        const targetCellPos = getClosestCellCenter(worldPos.x, worldPos.y, 1);

        const angleFromShipToCellPos = determineAngle(shipPos, targetCellPos, 0);

        setAddingDestination({
            x: targetCellPos.x,
            y: targetCellPos.y,
            angle: angleFromShipToCellPos,
        });
    };

    const extraHandlers: TouchEvents | undefined = addingDestination
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
                    angle: determineAngle(addingDestination, worldPos, waypoint!.angle!)
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

    const longPressHandlers = useLongPress(longPress, tap, extraHandlers);

    const drawDestinations = (ctx: CanvasRenderingContext2D, bounds: Rectangle, pixelSize: number) => {    
        if (addingDestination) {
            drawWaypoint(ctx, addingDestination, 1, theme, 'primary');
        }

        if (props.destination) {
            // If adjusting destination on the same cell as the curent destination, don't draw both arrows.
            if (!addingDestination || distanceSq(addingDestination, props.destination) >= 0.1) {
                drawWaypoint(ctx, props.destination, 1, theme, addingDestination ? 'warning' : 'primary');
            }
        }

        const currentTime = getTime();
        
        for (const maneuverSet of props.maneuvers) {
            for (let i=0; i < maneuverSet.length; i++) {
                const maneuver = maneuverSet[i];
                drawManeuver(ctx, maneuver.motion, maneuver.minPower, i === maneuverSet.length - 1, currentTime);
            }
        }
    };

    return (
        <SpaceMap
            ref={canvas}
            gridColor="secondary"
            getCellRadius={getCellRadius}
            getCenter={getViewCenter}
            vessels={ships}
            localVessel={props.localShip}
            drawExtraBackground={drawDestinations}
            {...bindGestures()}
        />
    );
}
