import { useTranslation } from 'react-i18next';
import { styled } from 'src/lib/mui';
import { AppBarHeight } from '../../appbar';
import { Page } from '../../../components/Page';
import { PowerLevel, ShipDestroyingSystem } from 'src/types/ShipSystem';
import { SensorsAppBar } from './SensorsAppBar';
import { SensorBreadcrumbs } from './SensorBreadcrumbs';
import { ScanItemId, ScanSelection, ScanTreeState } from '../features/scanselect';
import { TargetSelection } from '../features/targetselect';
import { ObjectId } from 'src/types/GameObjectInfo';
import { SensorTarget } from '../types/SensorTarget';
import { CellBoard, InteractiveCells } from '../features/hexcells';

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

    scanSystem?: ScanItemId;
    setScanSystem: (id: ScanItemId | undefined) => void;

    scanCellBoard?: CellBoard;
    flagCell: (index: number) => void;
    revealCell: (index: number) => void;
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
    else if (props.scanSystem === undefined || props.scanCellBoard === undefined) {
        stage = 1;
        content = (
            <ScanSelection
                target={props.scanTarget}
                scanTree={props.scanTargetTree}
                selectScan={props.setScanSystem}
                powerLevel={props.power}
            />
        )
    }
    else {
        stage = 2;
        content = (
            <InteractiveCells
                {...props.scanCellBoard}
                revealCell={props.revealCell}
                flagCell={props.flagCell}
            />
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
