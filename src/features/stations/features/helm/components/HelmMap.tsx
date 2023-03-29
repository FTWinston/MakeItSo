import { useMemo, useRef } from 'react';
import { Position } from 'src/types/Position';
import { distanceSq, Vector2D } from 'src/types/Vector2D';
import { interpolatePosition, interpolateVector } from 'src/utils/interpolate';
import { SpaceMap } from '../../../features/spacemap';
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
import { MotionConfiguration } from '../types/HelmState';
import { useInterval } from 'src/hooks/useInterval';

interface Props extends MotionConfiguration {
    mode: Mode;
    previewManeuver: ManeuverType | null;
    getInitialCenter: () => Vector2D;
    ship: GameObjectInfo;
    otherObjects: Iterable<GameObjectInfo>;
    destination: Position | null;
    maneuvers: ManeuverInfo[];
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

    // In manuever mode, view centering should be offset, so that the "center" is the center of the space not covered by the maneuver card.
    const getManueverViewOffset = () => 0.09 * document.body.offsetHeight / getCellRadius();

    // In maneuver mode, center the view on the end of the ship's planned motion.
    const currentTime = getTime();

    const previewStartPosition = inManeuverMode
        ? getManeuverStartPosition(ship.motion, maneuvers, props, currentTime)
        : undefined;

    const autoFocusPoint = inManeuverMode
        ? maneuvers.length > 0 && previewStartPosition
            ? previewStartPosition.val
            : undefined
        : undefined;

    // In maneuver mode, with no maneuvers, the camera should lock to the ship.
    useInterval(
        () => {
            const shipPos = interpolateVector(ship.motion, getTime());
            setViewCenter({ x: shipPos.x , y: shipPos.y + getManueverViewOffset() });
        }, 100, [inManeuverMode, maneuvers, ship.motion], inManeuverMode, true
    )

    const maneuverSets = useMemo(() => {
        if (!previewManeuver || !previewStartPosition) {
            return [maneuvers];
        }

        const actualPreviewManeuever = getManeuver(previewManeuver, previewStartPosition);
        return [[actualPreviewManeuever], maneuvers];
    }, [previewManeuver, maneuvers, previewStartPosition])
    
    if (useHasChanged(autoFocusPoint) && autoFocusPoint) {
        setViewCenter({ x: autoFocusPoint.x, y: autoFocusPoint.y + getManueverViewOffset() });
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

            <StopAndFocus
                shipMoving={props.mode === 'travel' && (destination !== null || maneuvers.length > 0)}
                shipVisible={props.mode !== 'travel' || shipVisible}
                stop={props.stop}
                focus={() => setViewCenter(interpolatePosition(ship.motion))}
            />
        </>
    );
}
