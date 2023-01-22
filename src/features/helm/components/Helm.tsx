import { useTranslation } from 'react-i18next';
import { styled } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { HelmMap } from './HelmMap';
import { VesselInfo } from 'src/types/VesselInfo';
import { Animation, getPositionValue } from 'src/types/Animation';
import { Position } from 'src/types/Position';
import { useState } from 'react';
import { Vector2D } from 'src/types/Vector2D';
import { StopAndFocus } from './StopAndFocus';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    shipPosition: Animation<Position>;
    power: PowerLevel;
    health: number;
    destination: Position | null;
    setDestination: (destination: Position | null) => void;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});


export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    const localShip: VesselInfo = {
        position: props.shipPosition
    };

    const [viewCenter, setViewCenter] = useState<Vector2D>(() => getPositionValue(props.shipPosition));

    const [shipVisible, setShipVisible] = useState(true);

    return (
        <Root shipDestroyed={props.shipDestroyed}>
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

            <StopAndFocus
                shipMoving={props.destination !== null}
                shipVisible={shipVisible}
                stop={() => props.setDestination(null)}
                focus={() => setViewCenter(getPositionValue(props.shipPosition))}
            />
        </Root>
    );
};
