import { useTranslation } from 'react-i18next';
import { Box, SlideTransition, styled, ZoomTransition } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { HelmMap } from './HelmMap';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { Keyframes, getPositionValue, getLastFrame } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Vector2D } from 'src/types/Vector2D';
import { StopAndFocus } from './StopAndFocus';
import { Mode, ModeToggle } from './ModeToggle';
import { getManeuver, ManeuverCard, ManeuverChoice, ManeuverType } from '../features/maneuvers';
import { ManeuverInfo } from '../features/maneuvers/types/ManeuverType';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    shipMotion: Keyframes<Position>;
    power: PowerLevel;
    health: number;
    stop: () => void;
    maneuvers: ManeuverInfo[];
    maneuverChoice: ManeuverChoice;
    maneuver: (type: ManeuverType) => void;
    destination: Position | null;
    setDestination: (destination: Position) => void;
}

const Root = styled(
    Page
    , { shouldForwardProp: (prop) => prop !== 'mode' }
)<{ mode: 'travel' | 'maneuver' }>(({ mode }) => ({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
}));

const CardWrapper = styled(Box)({
    position: 'absolute',
    left: '0.25em',
    bottom: '0.25em',
})

export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    const localShip: GameObjectInfo = {
        motion: props.shipMotion
    };

    const [mode, setMode] = useState<Mode>('travel');

    const [viewCenter, setViewCenter] = useState<Vector2D>(() => getPositionValue(props.shipMotion));

    const [shipVisible, setShipVisible] = useState(true);

    const [previewManeuver, setPreviewManeuver] = useState<ManeuverType | null>(null);

    const previousManeuver = useRef(props.maneuverChoice.id);
    
    const maneuverChanged = props.maneuverChoice.id !== previousManeuver.current;
    if (maneuverChanged) {
        previousManeuver.current = props.maneuverChoice.id;
    }

    // In maneuver mode, center the view on the end of the first maneuver.
    const lastManeuver = props.maneuvers[props.maneuvers.length - 1];
    const lastMoveEndPosition = lastManeuver ? getLastFrame(lastManeuver.motion) : getLastFrame(props.shipMotion);
    useEffect(() => {
        if (lastMoveEndPosition && mode === 'maneuver') {
            setViewCenter(lastMoveEndPosition.val);
        }
    }, [lastMoveEndPosition, mode])

    const maneuvers = useMemo(() => {
        if (!previewManeuver) {
            return props.maneuvers;
        }

        const actualPreviewManeuever = getManeuver(previewManeuver, lastMoveEndPosition);
        return [...props.maneuvers, actualPreviewManeuever];
    }, [previewManeuver, props.maneuvers])

    const extraTravelButtons = mode === 'travel'
        ? (
            <StopAndFocus
                shipMoving={props.destination !== null || props.maneuvers.length > 0}
                shipVisible={shipVisible}
                stop={props.stop}
                focus={() => setViewCenter(getPositionValue(props.shipMotion))}
            />
        )
        : undefined;

    return (
        <Root shipDestroyed={props.shipDestroyed} mode={mode}>
            <HelmAppBar power={props.power} health={props.health} />

            <HelmMap
                center={viewCenter}
                setCenter={setViewCenter}
                ships={[localShip]}
                localShip={localShip}
                maneuvers={maneuvers}
                destination={props.destination}
                setDestination={props.setDestination}
                shipVisible={shipVisible}
                setShipVisible={setShipVisible}
            />

            <SlideTransition
                in={mode === 'maneuver'}
                direction="up"
                appear={false}
                exit={true}
            >
                <CardWrapper>
                    <ZoomTransition
                        in={true}
                        appear={true}
                        enter={true}
                        exit={false}
                        key={props.maneuverChoice.id}
                    >
                        <div>
                            <ManeuverCard
                                currentPower={props.power}
                                maneuvers={props.maneuverChoice}
                                selectManeuver={props.maneuver}
                                previewManeuver={setPreviewManeuver}
                                startAngle={lastMoveEndPosition.val.angle}
                            />
                        </div>
                    </ZoomTransition>
                </CardWrapper>
            </SlideTransition>

            {extraTravelButtons}

            <ModeToggle mode={mode} setMode={setMode} />
        </Root>
    );
};
