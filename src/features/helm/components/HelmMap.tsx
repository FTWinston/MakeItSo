import { useMemo, useRef } from 'react';
import { Position } from 'src/types/Position';
import { distanceSq, Vector2D } from 'src/types/Vector2D';
import { getPositionValue } from 'src/types/Keyframes';
import { SpaceMap } from 'src/features/spacemap';
import { useTheme } from 'src/lib/mui';
import { drawDestination } from '../utils/drawDestination';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { Rectangle } from 'src/types/Rectangle';
import { drawManeuver, getManeuver, ManeuverInfo, ManeuverType } from '../features/maneuvers';
import { getTime } from 'src/utils/timeSpans';
import { useHelmMapInteractions } from '../hooks/useHelmMapInteractions';
import { StopAndFocus } from './StopAndFocus';
import { Mode } from './ModeToggle';
import { useHasChanged } from 'src/hooks/useHasChanged';
import { useShipVisibility } from '../hooks/useShipVisibility';
import { getEndPosition } from '../utils/getEndPosition';

interface Props {
    mode: Mode;
    previewManeuver: ManeuverType | null;
    getInitialCenter: () => Vector2D;
    ships: Partial<Record<number, GameObjectInfo>>;
    localShip: GameObjectInfo;
    destination: Position | null;
    maneuvers: ManeuverInfo[];
    setDestination: (waypoint: Position) => void;
    stop: () => void;
}

export const HelmMap: React.FC<Props> = props => {
    const theme = useTheme();

    const ships = useMemo(
        () => Object.values(props.ships) as GameObjectInfo[],
        [props.ships]
    );
    
    const canvas = useRef<HTMLCanvasElement>(null);

    const { destination, maneuvers, previewManeuver, localShip, setDestination, getInitialCenter } = props;
    const { motion } = localShip;
    
    const {
        getViewCenter,
        setViewCenter,
        getCellRadius,
        addingDestination,
        bindGestures,
    } = useHelmMapInteractions(canvas, motion, setDestination, getInitialCenter);

    // In maneuver mode, center the view on the end of the ship's planned motion.
    let autoFocusPoint = props.mode === 'maneuver'
        ? getEndPosition(motion, maneuvers)
        : undefined;

    const maneuverSets = useMemo(() => {
        if (!previewManeuver || !autoFocusPoint) {
            return [maneuvers];
        }

        const actualPreviewManeuever = getManeuver(previewManeuver, autoFocusPoint);
        return [maneuvers, [actualPreviewManeuever]];
    }, [previewManeuver, maneuvers, autoFocusPoint])
    
    if (useHasChanged(autoFocusPoint) && autoFocusPoint) {
        setViewCenter(autoFocusPoint.val);
    }

    const shipVisible = useShipVisibility(canvas, motion, getViewCenter, getCellRadius);

    const drawDestinations = (ctx: CanvasRenderingContext2D, bounds: Rectangle, pixelSize: number) => {    
        if (addingDestination) {
            drawDestination(ctx, addingDestination, 1, theme, 'primary');
        }

        if (destination) {
            // If adjusting destination on the same cell as the curent destination, don't draw both arrows.
            if (!addingDestination || distanceSq(addingDestination, destination) >= 0.1) {
                drawDestination(ctx, destination, 1, theme, addingDestination ? 'warning' : 'primary');
            }
        }

        const currentTime = getTime();
        
        for (const maneuverSet of maneuverSets) {
            for (let i=0; i < maneuverSet.length; i++) {
                const maneuver = maneuverSet[i];
                drawManeuver(ctx, maneuver.motion, maneuver.minPower, i === maneuverSet.length - 1, currentTime);
            }
        }
    };

    const extraTravelButtons = props.mode === 'travel'
        ? (
            <StopAndFocus
                shipMoving={destination !== null || maneuvers.length > 0}
                shipVisible={shipVisible}
                stop={props.stop}
                focus={() => setViewCenter(getPositionValue(props.localShip.motion))}
            />
        )
        : undefined;

    return (
        <>
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
            {extraTravelButtons}
        </>
    );
}
