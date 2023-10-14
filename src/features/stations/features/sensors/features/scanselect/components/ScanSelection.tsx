import { useTranslation } from 'react-i18next';
import { Box } from 'src/lib/mui';
import { ObjectId } from 'src/types/GameObjectInfo';
import { ScanTreeState } from '../types/ScanTreeState';

interface Props {
    target: ObjectId;
    selectScan: (scan: string | undefined) => void;
    scanTree: ScanTreeState;
}

export const ScanSelection: React.FC<Props> = props => {
    const { t } = useTranslation('sensors');
    
    return (
        <Box sx={{margin: 1}}>
            <p>this is scan selection</p>
            
        </Box>
    );
}