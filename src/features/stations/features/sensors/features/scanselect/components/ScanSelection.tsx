import { useTranslation } from 'react-i18next';
import { Box, FormControlLabel, Switch } from 'src/lib/mui';
import { ObjectId } from 'src/types/GameObjectInfo';

interface Props {
    target: ObjectId;
    selectScan: (scan: string | undefined) => void;
    isViewTarget: boolean;
    view: (target: ObjectId | undefined) => void;
}

export const ScanSelection: React.FC<Props> = props => {
    const { t } = useTranslation('sensors');
    
    return (
        <Box sx={{margin: 1}}>
            <p>this is scan selection</p>
            
            <FormControlLabel control={
                    <Switch
                        checked={props.isViewTarget}
                        onChange={e => props.view(e.target.checked ? props.target : undefined)}
                    />
                }
                label={t('onScreen')}
            />
        </Box>
    );
}