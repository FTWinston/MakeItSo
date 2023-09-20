import { styled } from 'src/lib/mui';
import { AppBarHeight } from '../../appbar';
import { Page } from '../../../components/Page';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { SensorsAppBar } from './SensorsAppBar';
import { useTranslation } from 'react-i18next';
import { SensorBreadcrumbs } from './SensorBreadcrumbs';
import { ScanSelection } from '../features/scanselect';
import { TargetSelection } from '../features/targetselect';
import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from '../types/SensorTarget';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    power: PowerLevel;
    health: number;
    targets: SensorTarget[];

    scanTarget?: ObjectId;
    setScanTarget: (id: ObjectId | undefined) => void;

    viewTarget?: ObjectId;
    setViewTarget: (id: ObjectId | undefined) => void;
}

const Root = styled(Page)({
    display: 'grid',
    gridTemplateRows: `${AppBarHeight} 1fr`,
});

const CrumbWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
})

export const Sensors: React.FC<Props> = (props) => {
    const { t } = useTranslation('sensors');

    const stage = props.scanTarget === undefined
        ? 0
        : true/*props.scanSystem === undefined*/
            ? 1
            : 2;

    const setStage = (stage: number) => {
        if (stage === 0) {
            props.setScanTarget(undefined);
        }
        /*
        else if (stage === 1) {
            props.setScanSystem(undefined);
        }
        */
    }

    const contentComponent = stage === 0
        ? (
            <TargetSelection
                targets={props.targets}
                select={props.setScanTarget}
                view={props.setViewTarget}
                viewTarget={props.viewTarget}
            />
        )
        : stage === 1
            ? (
                <ScanSelection />
            )
            : stage === 2
                ? (
                    <div>scanning...</div>
                )
                : <div>scan result</div>;
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <SensorsAppBar power={props.power} health={props.health} />
            <CrumbWrapper>
                <SensorBreadcrumbs depth={stage} setDepth={setStage} />
                {contentComponent}
            </CrumbWrapper>
        </Root>
    );
};
