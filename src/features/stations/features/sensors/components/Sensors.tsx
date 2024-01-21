import { useEffect, useState } from 'react';
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
import { CellBoard } from '../features/hexcells';
import { QuickTransition } from 'src/components/QuickTransition';
import { Scanning } from './Scanning';

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
});

export const Sensors: React.FC<Props> = (props) => {
    const [viewStage, setViewStage] = useState(0);

    const backtrackToStage = (stage: number) => {
        setViewStage(stage);

        if (stage === 0) {
            props.setScanTarget(undefined);
        }
    }

    let actualViewStage: number;
    
    // Once a scan is finished, leave it.
    const scanResult = props.scanCellBoard?.result;
    useEffect(() => {
        if (viewStage !== 2) {
            return;
        }

        if (scanResult === 'success') {
            setTimeout(() => setViewStage(1), 1500);
        }
        else if (scanResult === 'failure') {
            setTimeout(() => setViewStage(1), 3000);
        }
    }, [viewStage, scanResult]);

    if (viewStage >= 2 && props.scanCellBoard) {
        actualViewStage = 2;
    }
    else if (viewStage >= 1 && props.scanTarget && props.scanTargetTree)
    {
        actualViewStage = 1;
    }
    else {
        actualViewStage = 0;
    }
    
    return (
        <Root shipDestroyed={props.shipDestroyed}>
            <SensorsAppBar power={props.power} health={props.health} />
            <CrumbWrapper>
                <SensorBreadcrumbs depth={actualViewStage} setDepth={backtrackToStage} />
                
                <QuickTransition show={actualViewStage === 0} appear={false}>
                    <TargetSelection
                        targets={props.targets}
                        select={target => { props.setScanTarget(target); setViewStage(1); }}
                        view={props.setViewTarget}
                        viewTarget={props.viewTarget}
                    />
                </QuickTransition>
                {props.scanTarget && props.scanTargetTree &&
                <QuickTransition show={actualViewStage === 1} appear={true}>
                    <ScanSelection
                        target={props.scanTarget}
                        scanTree={props.scanTargetTree}
                        selectScan={scan => { props.setScanItem(scan); setViewStage(2); }}
                        initialSelectedScanId={props.scanCellBoard?.result ? props.scanItem : undefined}
                    />
                </QuickTransition>}
                {props.scanCellBoard &&
                <QuickTransition show={actualViewStage === 2} appear={true}>
                    <Scanning
                        scanCellBoard={props.scanCellBoard}
                        revealCell={props.revealCell}
                        flagCell={props.flagCell}
                    />
                </QuickTransition>}
            </CrumbWrapper>
        </Root>
    );
};
