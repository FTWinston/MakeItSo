import { useState } from 'react';
import { ObjectId } from 'src/types/GameObjectInfo';
import { PowerLevel } from 'src/types/ShipSystem';
import { ScanItemId } from '../types/ScanItemId';
import { ScanTreeState } from '../types/ScanTreeState';
import { ScanTree } from './ScanTree';
import { ScanItemOverviewDialog } from './ScanItemOverviewDialog';
import { ScanItemDetailDialog } from './ScanItemDetailDialog';

interface Props {
    target: ObjectId;
    initialSelectedScanId?: ScanItemId;
    selectScan: (scan: ScanItemId | undefined) => void;
    scanTree: ScanTreeState;
    powerLevel: PowerLevel;
}

export const ScanSelection: React.FC<Props> = props => {
    const [selectedScanId, selectScan] = useState<ScanItemId | undefined>(props.initialSelectedScanId);
    
    // If there's a selected item, see if it's an "active" item or not. Show a different dialog, depending.
    const selectedScanInfo = selectedScanId === undefined
        ? undefined
        : props.scanTree.selectedItemIds.includes(selectedScanId)
            ? (
                <ScanItemDetailDialog
                    itemId={selectedScanId}
                    onClose={() => selectScan(undefined)}
                    detail={props.scanTree.itemInfo[selectedScanId]}
                />
            )
            : (
                <ScanItemOverviewDialog
                    itemId={selectedScanId}
                    onClose={() => selectScan(undefined)}
                    onConfirm={() => props.selectScan(selectedScanId)}
                />
            );

    return (
        <>
            <ScanTree
                {...props.scanTree}
                selectItem={selectScan}
                maxScanDepth={props.powerLevel + 1}
            />
            {selectedScanInfo}
        </>
    );
}