import { useTranslation } from 'react-i18next';
import { Box, SlideTransition, styled, ZoomTransition } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { HelmMap } from './HelmMap';
import { GameObjectInfo } from 'src/types/GameObjectInfo';
import { Keyframes, getPositionValue } from 'src/types/Keyframes';
import { Position } from 'src/types/Position';
import { useState } from 'react';
import { Vector2D } from 'src/types/Vector2D';
import { StopAndFocus } from './StopAndFocus';
import { Mode, ModeToggle } from './ModeToggle';
import { ManeuverCard, ManeuverChoice, maneuverCardHeight, ManeuverType } from '../features/maneuvers';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    shipMotion: Keyframes<Position>;
    power: PowerLevel;
    health: number;
    maneuverChoice: ManeuverChoice;
    destination: Position | null;
    setDestination: (destination: Position | null) => void;
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

    // TODO: don't store this here, it goes in game state. Use this for preview tho.
    const [nextManeuver, setNextManeuver] = useState<ManeuverType | null>(null);

    const maneuverSelection = (
        <SlideTransition
            in={mode === 'maneuver' && nextManeuver === null}
            direction="up"
        >
            <ZoomTransition /* TODO: this "out-only-when-selected" transition aint working */
                in={mode === 'maneuver' && nextManeuver !== null}
                appear={false}
            >
                <CardWrapper>
                    <ManeuverCard
                        currentPower={props.power}
                        maneuvers={props.maneuverChoice}
                        selectManeuver={type => { console.log(`select maneuver ${type}`); setNextManeuver(type); }}
                        previewManeuver={type => { console.log(`preview maneuver ${type}`)}}
                    />
                </CardWrapper>
            </ZoomTransition>
        </SlideTransition>
    );

    const extraTravelButtons = mode === 'travel'
        ? (
            <StopAndFocus
                shipMoving={props.destination !== null}
                shipVisible={shipVisible}
                stop={() => props.setDestination(null)}
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
                destination={props.destination}
                setDestination={props.setDestination}
                shipVisible={shipVisible}
                setShipVisible={setShipVisible}
            />

            {maneuverSelection}

            {extraTravelButtons}
            <ModeToggle mode={mode} setMode={setMode} />
        </Root>
    );
};
