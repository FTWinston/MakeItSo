import { useMemo, useRef, useEffect } from 'react';
import { Position } from 'src/types/Position';
import { distanceSq, Vector2D } from 'src/types/Vector2D';
import { getVectorValue } from 'src/types/Keyframes';
import { getWorldBounds, SpaceMap } from 'src/features/spacemap';
import { useTheme } from 'src/lib/mui';
import { drawWaypoint } from '../utils/drawWaypoint';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { isInRectangle, Rectangle } from 'src/types/Rectangle';
import { drawManeuver, ManeuverInfo } from '../features/maneuvers';
import { getTime } from 'src/utils/timeSpans';
import { useHelmMapInteractions } from '../hooks/useHelmMapInteractions';

interface Props {
    getInitialCenter: () => Vector2D;
    forceViewCenter?: Vector2D;
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

    const ships = useMemo(
        () => Object.values(props.ships) as GameObjectInfo[],
        [props.ships]
    );
    
    const canvas = useRef<HTMLCanvasElement>(null);

    const { localShip, shipVisible, setDestination, getInitialCenter, forceViewCenter } = props;
    const { motion } = localShip;
    
    const {
        getViewCenter,
        getCellRadius,
        addingDestination,
        bindGestures,
    } = useHelmMapInteractions(canvas, motion, setDestination, getInitialCenter, forceViewCenter);

    useEffect(() => {
        const updateVisibility = () => {
            const bounds = getWorldBounds(canvas.current!, getCellRadius(), getViewCenter());
            const visible = isInRectangle(bounds, getVectorValue(motion));
            if (shipVisible !== visible) {
                props.setShipVisible(visible);   
            }
        }

        updateVisibility();
        const interval = setInterval(updateVisibility, 250);
        return () => clearInterval(interval);
    }, [motion]);

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
