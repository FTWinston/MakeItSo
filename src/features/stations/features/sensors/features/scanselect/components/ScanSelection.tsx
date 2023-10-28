import { useTranslation } from 'react-i18next';
import { ObjectId } from 'src/types/GameObjectInfo';
import { ScanTreeState } from '../types/ScanTreeState';
import { ScanTree } from './ScanTree';

interface Props {
    target: ObjectId;
    selectScan: (scan: string | undefined) => void;
    scanTree: ScanTreeState;
}

export const ScanSelection: React.FC<Props> = props => {
    const { t } = useTranslation('sensors');
    
    return (
        <ScanTree
            {...props.scanTree}
            selectItem={props.selectScan}
        />
    );
}