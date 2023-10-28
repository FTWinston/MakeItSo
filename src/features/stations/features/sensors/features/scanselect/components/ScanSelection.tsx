import { useTranslation } from 'react-i18next';
import { ObjectId } from 'src/types/GameObjectInfo';
import { ScanTreeState } from '../types/ScanTreeState';
import { ScanTree } from './ScanTree';
import { PowerLevel } from 'src/types/ShipSystem';
import { Box, styled } from 'src/lib/mui';

interface Props {
    target: ObjectId;
    selectScan: (scan: string | undefined) => void;
    scanTree: ScanTreeState;
    powerLevel: PowerLevel;
}

const Root = styled(Box)({
    overflowX: 'auto',
    flexGrow: 1,
})

export const ScanSelection: React.FC<Props> = props => {
    const { t } = useTranslation('sensors');
    
    return (
        <Root>
            <ScanTree
                {...props.scanTree}
                selectItem={props.selectScan}
                maxScanDepth={props.powerLevel}
            />
        </Root>
    );
}