import { useTranslation } from 'react-i18next';
import { ObjectId } from 'src/types/GameObjectInfo';
import { ScanTreeState } from '../types/ScanTreeState';
import { ScanTree } from './ScanTree';
import { PowerLevel } from 'src/types/ShipSystem';

interface Props {
    target: ObjectId;
    selectScan: (scan: string | undefined) => void;
    scanTree: ScanTreeState;
    powerLevel: PowerLevel;
}

export const ScanSelection: React.FC<Props> = props => {
    const { t } = useTranslation('sensors');
    
    return (
        <ScanTree
            {...props.scanTree}
            selectItem={props.selectScan}
            maxScanDepth={props.powerLevel + 1}
        />
    );
}