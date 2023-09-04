import { useTranslation } from 'react-i18next';
import ViewIcon from '@mui/icons-material/Visibility';
import ViewOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from 'src/lib/mui';
import { SensorTarget } from '../../../types/SensorTarget'

interface Props extends SensorTarget {
    isCurrentViewTarget: boolean;
    view: () => void;
    select: () => void;
}

export const TargetSelectionItem: React.FC<Props> = (props) => {
    const { t } = useTranslation('sensors');
    const description = t(`target desc ${props.description}` as any);

    const viewButton = (
        <IconButton
            edge="end"
            aria-label="delete"
            onClick={props.view}
            color={props.isCurrentViewTarget ? 'primary' : 'secondary'}
        >
            {props.isCurrentViewTarget ? <ViewOffIcon /> : <ViewIcon />}
        </IconButton>
    );

    return (
        <ListItem onClick={props.select} secondaryAction={viewButton}>
            <ListItemAvatar>
                <Avatar>
                    Icon
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.id} secondary={description} />
        </ListItem>
    )
}