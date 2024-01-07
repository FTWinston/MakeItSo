import { useState } from 'react';
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

    scanItem?: ScanItemId;
    setScanItem: (id: ScanItemId | undefined) => void;

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
    const [viewStage, setViewStage] = useState(0);

    const backtrackToStage = (stage: number) => {
        setViewStage(stage);

        if (stage === 0) {
            props.setScanTarget(undefined);
        }
        else if (stage === 1) {
            props.setScanItem(undefined);
        }
    }

    let content: JSX.Element;
    let actualViewStage: number;
    
    if (viewStage >= 2 && props.scanCellBoard) {
        actualViewStage = 2;
        content = (
            <InteractiveCells
                {...props.scanCellBoard}
                revealCell={props.revealCell}
                flagCell={props.flagCell}
            />
        )
    }
    else if (viewStage >= 1 && props.scanTarget && props.scanTargetTree)
    {
        actualViewStage = 1;
        content = (
            <ScanSelection
                target={props.scanTarget}
                scanTree={props.scanTargetTree}
                selectScan={scan => { props.setScanItem(scan); setViewStage(2); }}
                initialSelectedScanId={props.scanItem}
                powerLevel={props.power}
            />
        )
    }
    else {
        actualViewStage = 0;
        content = (
            <TargetSelection
                targets={props.targets}
                select={target => { props.setScanTarget(target); setViewStage(1); }}
                view={props.setViewTarget}
                viewTarget={props.viewTarget}
            />
        )
    }
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <SensorsAppBar power={props.power} health={props.health} />
            <CrumbWrapper>
                <SensorBreadcrumbs depth={actualViewStage} setDepth={backtrackToStage} />
                {content}
            </CrumbWrapper>
        </Root>
    );
};
