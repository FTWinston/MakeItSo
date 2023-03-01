import { useEffect, useMemo, useRef } from 'react';
import { Position } from 'src/types/Position';
import { distanceSq, Vector2D } from 'src/types/Vector2D';
import { interpolatePosition, interpolateVector } from 'src/utils/interpolate';
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
import { getManeuverStartPosition } from '../utils/getManeuverStartPosition';

interface Props {
    mode: Mode;
    previewManeuver: ManeuverType | null;
    getInitialCenter: () => Vector2D;
    ship: GameObjectInfo;
    otherObjects: Iterable<GameObjectInfo>;
    destination: Position | null;
    maneuvers: ManeuverInfo[];
    speedToManeuver: number;
    setDestination: (waypoint: Position) => void;
    stop: () => void;
}

export const HelmMap: React.FC<Props> = props => {
    const theme = useTheme();

    const canvas = useRef<HTMLCanvasElement>(null);

    const { destination, maneuvers, previewManeuver, ship, setDestination, getInitialCenter } = props;
    
    const inManeuverMode = props.mode === 'maneuver';

    const {
        getViewCenter,
        setViewCenter,
        getCellRadius,
        addingDestination,
        bindGestures,
    } = useHelmMapInteractions(canvas, ship.motion, !inManeuverMode, inManeuverMode ? undefined : setDestination, getInitialCenter);

    // In maneuver mode, center the view on the end of the ship's planned motion.
    const currentTime = getTime();

    const previewStartPosition = inManeuverMode
        ? getManeuverStartPosition(ship.motion, maneuvers, props.speedToManeuver, currentTime)
        : undefined;

    const autoFocusPoint = inManeuverMode
        ? maneuvers.length > 0 && previewStartPosition
            ? previewStartPosition.val
            : undefined//interpolatePosition(motion, currentTime)
        : undefined;

    // In maneuver mode, with no maneuvers, the camera should lock to the ship.
    useEffect(() => {
        if (!inManeuverMode || maneuvers.length > 0) {
            return;
        }

        const interval = setInterval(() => {
            const shipPos = interpolateVector(ship.motion, getTime());
            setViewCenter(shipPos);
        }, 100);

        return () => clearInterval(interval);
    }, [inManeuverMode, maneuvers, ship.motion])

    const maneuverSets = useMemo(() => {
        if (!previewManeuver || !previewStartPosition) {
            return [maneuvers];
        }

        const actualPreviewManeuever = getManeuver(previewManeuver, previewStartPosition);
        return [[actualPreviewManeuever], maneuvers];
    }, [previewManeuver, maneuvers, previewStartPosition])
    
    if (useHasChanged(autoFocusPoint) && autoFocusPoint) {
        setViewCenter(autoFocusPoint);
    }

    const shipVisible = useShipVisibility(canvas, ship.motion, getViewCenter, getCellRadius);

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

        let currentTime = getTime();
        
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
                focus={() => setViewCenter(interpolatePosition(ship.motion))}
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
                objects={[props.ship, ...props.otherObjects]}
                drawExtraBackground={drawDestinations}
                {...bindGestures()}
            />
            {extraTravelButtons}
        </>
    );
}
