import { styled } from 'src/lib/mui';
import { AppBarHeight, Page } from 'src/features/layout';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { HelmAppBar } from './HelmAppBar';
import { useTranslation } from 'react-i18next';
import { HelmMap } from './HelmMap';
import { VesselInfo } from 'src/types/VesselInfo';
import { durationToTicks, getTime } from 'src/utils/timeSpans';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    power: PowerLevel;
    health: number;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

export const Helm: React.FC<Props> = (props) => {
    const { t } = useTranslation('helm');

    // TODO: from props ... this and everything else, obviously.
    const localShip: VesselInfo = {
        position: [{
            time: getTime(),
            val: {
                x: 0, y: 0, angle: 0
            }
        }, {
            time: getTime() + durationToTicks(1000),
            val: {
                x: 100, y: 0, angle: 0
            }
        }]
    }

    const setDestination = () => {};
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <HelmAppBar power={props.power} health={props.health} />

            <HelmMap
                ships={[localShip]}
                localShip={localShip}
                setDestination={setDestination}
            />
        </Root>
    );
};
