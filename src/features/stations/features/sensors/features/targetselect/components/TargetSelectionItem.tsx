import { useTranslation } from 'react-i18next';
import TargetIcon from '@mui/icons-material/NearMe';
import ViewCurrentIcon from '@mui/icons-material/Visibility';
import ViewNotCurrentIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled, useTheme } from 'src/lib/mui';
import { SensorTarget } from '../../../types/SensorTarget'
import { getObjectColors } from 'src/features/stations/features/spacemap';

interface Props extends SensorTarget {
    isCurrentViewTarget: boolean;
    view: () => void;
    select: () => void;
}

const ItemRoot = styled(ListItem)({
    padding: 0,
})

export const TargetSelectionItem: React.FC<Props> = (props) => {
    const theme = useTheme();
    const { t } = useTranslation('sensors');
    const description = t(`target desc ${props.description}` as any);

    const { mainColor, highlight } = getObjectColors(props.rel, theme);

    const viewButton = (
        <IconButton
            edge="end"
            aria-label="delete"
            onClick={props.view}
            color={props.isCurrentViewTarget ? 'secondary' : undefined}
            sx={props.isCurrentViewTarget ? undefined : { opacity: 0.6 }}
            title={t('onScreen')}
        >
            {props.isCurrentViewTarget ? <ViewCurrentIcon /> : <ViewNotCurrentIcon />}
        </IconButton>
    );

    return (
        <ItemRoot secondaryAction={viewButton}>
            <ListItemButton role={undefined} onClick={props.select}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: mainColor }} variant='rounded'>
                        <TargetIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.id} primaryTypographyProps={{color: highlight, fontWeight: 'bold' }} secondary={description} />
            </ListItemButton>
        </ItemRoot>
    )
}