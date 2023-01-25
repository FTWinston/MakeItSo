import { useTranslation } from 'react-i18next';
import { styled } from 'src/lib/mui';
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

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    shipMotion: Keyframes<Position>;
    power: PowerLevel;
    health: number;
    destination: Position | null;
    setDestination: (destination: Position | null) => void;
}

const Root = styled(
    Page
    , { shouldForwardProp: (prop) => prop !== 'mode' }
)<{ mode: 'travel' | 'maneuver' }>(({ mode }) => ({
    display: 'grid',
    gridTemplateRows: mode === 'travel'
        ? `${AppBarHeight} 1fr`
        : `${AppBarHeight} 1fr 4em`,
}));

export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    const localShip: GameObjectInfo = {
        motion: props.shipMotion
    };

    const [mode, setMode] = useState<Mode>('travel');

    const [viewCenter, setViewCenter] = useState<Vector2D>(() => getPositionValue(props.shipMotion));

    const [shipVisible, setShipVisible] = useState(true);

    const maneuverSelection = mode === 'maneuver'
        ? <div>TODO: maneuver selection</div>
        : (
            <StopAndFocus
                shipMoving={props.destination !== null}
                shipVisible={shipVisible}
                stop={() => props.setDestination(null)}
                focus={() => setViewCenter(getPositionValue(props.shipMotion))}
            />
        );

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

            <ModeToggle mode={mode} setMode={setMode} />
        </Root>
    );
};
