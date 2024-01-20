import { CSSProperties, forwardRef, useState } from 'react';
import { Box } from 'src/lib/mui';
import { ObjectId } from 'src/types/GameObjectInfo';
import { ScanItemId } from '../types/ScanItemId';
import { ScanTreeState } from '../types/ScanTreeState';
import { ScanItemOverviewDialog } from './ScanItemOverviewDialog';
import { ScanItemDetailDialog } from './ScanItemDetailDialog';
import { ScanTree } from './ScanTree';
import { getItemDepth } from '../utils/getItemDepth';

interface Props {
    target: ObjectId;
    initialSelectedScanId?: ScanItemId;
    selectScan: (scan: ScanItemId | undefined) => void;
    scanTree: ScanTreeState;
    style?: CSSProperties;
}

export const ScanSelection = forwardRef<typeof Box, Props>((props, ref) => {
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
                    onConfirm={getItemDepth(selectedScanId, props.scanTree.items) <= props.scanTree.maxScanDepth ? (() => props.selectScan(selectedScanId)) : undefined}
                />
            );

    return (
        <>
            <ScanTree
                {...props.scanTree}
                selectItem={selectScan}
                ref={ref}
                style={props.style}
            />
            {selectedScanInfo}
        </>
    );
})