import { useTranslation } from 'react-i18next';
import StopIcon from '@mui/icons-material/Clear';
import { Fab, styled, ZoomTransition } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { HelmMap } from './HelmMap';
import { VesselInfo } from 'src/types/VesselInfo';
import { Animation } from 'src/types/Animation';
import { Position } from 'src/types/Position';

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

const StopButton = styled(Fab)({
    position: 'absolute',
    right: '1em',
    bottom: '1em',
})

export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    const localShip: VesselInfo = {
        position: props.shipPosition
    };

    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <HelmAppBar power={props.power} health={props.health} />

            <HelmMap
                ships={[localShip]}
                localShip={localShip}
                destination={props.destination}
                setDestination={props.setDestination}
            />

            <ZoomTransition in={props.destination !== null}>
                <StopButton
                    color="error"
                    aria-label={t('all stop')}
                    onClick={() => props.setDestination(null)}
                >
                    <StopIcon />
                </StopButton>
            </ZoomTransition>
        </Root>
    );
};
