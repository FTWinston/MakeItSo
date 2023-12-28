import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ObjectId } from 'src/types/GameObjectInfo';
import { PowerLevel } from 'src/types/ShipSystem';
import { ScanItemId } from '../types/ScanItemId';
import { ScanTreeState } from '../types/ScanTreeState';
import { ScanTree } from './ScanTree';
import { ScanItemDialog } from './ScanItemDialog';

interface Props {
    target: ObjectId;
    selectScan: (scan: ScanItemId | undefined) => void;
    scanTree: ScanTreeState;
    powerLevel: PowerLevel;
}

export const ScanSelection: React.FC<Props> = props => {
    const { t } = useTranslation('sensors');

    const [selectedScanId, selectScan] = useState<ScanItemId>();
    
    return (
        <>
            <ScanTree
                {...props.scanTree}
                selectItem={selectScan}
                maxScanDepth={props.powerLevel + 1}
            />
            <ScanItemDialog
                itemId={selectedScanId}
                onClose={() => selectScan(undefined)}
                onConfirm={() => props.selectScan(selectedScanId)}
            />
        </>
    );
}