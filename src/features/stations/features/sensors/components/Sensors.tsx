import { styled } from 'src/lib/mui';
import { AppBarHeight } from '../../appbar';
import { Page } from '../../../components/Page';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { SensorsAppBar } from './SensorsAppBar';
import { useTranslation } from 'react-i18next';
import { SensorBreadcrumbs } from './SensorBreadcrumbs';
import { ScanSelection, ScanTreeState } from '../features/scanselect';
import { TargetSelection } from '../features/targetselect';
import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from '../types/SensorTarget';

interface Props {
    shipDestroyed?: ShipDestroyingSystem;
    power: PowerLevel;
    health: number;
    targets: SensorTarget[];

    viewTarget?: ObjectId;
    setViewTarget: (id: ObjectId | undefined) => void;

    scanTarget?: ObjectId;
    setScanTarget: (id: ObjectId | undefined) => void;
    scanTargetTree?: ScanTreeState;

    scanSystem?: string;
    setScanSystem: (id: string | undefined) => void;
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

    let stage: number;
    let content: JSX.Element;

    if (props.scanTarget === undefined || props.scanTargetTree === undefined) {
        stage = 0;
        content = (
            <TargetSelection
                targets={props.targets}
                select={props.setScanTarget}
                view={props.setViewTarget}
                viewTarget={props.viewTarget}
            />
        )
    }
    else if (props.scanSystem === undefined) {
        stage = 1;
        content = (
            <ScanSelection
                target={props.scanTarget}
                scanTree={props.scanTargetTree}
                selectScan={props.setScanSystem}
            />
        )
    }
    else {
        stage = 2;
        content = (
            <div>scanning...</div>
        )
    }

    const setStage = (stage: number) => {
        if (stage === 0) {
            props.setScanTarget(undefined);
        }
        else if (stage === 1) {
            props.setScanSystem(undefined);
        }
    }
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <SensorsAppBar power={props.power} health={props.health} />
            <CrumbWrapper>
                <SensorBreadcrumbs depth={stage} setDepth={setStage} />
                {content}
            </CrumbWrapper>
        </Root>
    );
};
