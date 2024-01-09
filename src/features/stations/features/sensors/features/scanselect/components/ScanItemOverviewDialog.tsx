import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Dialog, Typography } from 'src/lib/mui';
import { ScanItemIcon } from './ScanItemIcon';
import { ScanItemId } from '../types/ScanItemId';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    itemId: ScanItemId;
    onClose?: () => void;
    onConfirm?: () => void;
}

export const ScanItemOverviewDialog: React.FC<PropsWithChildren<Props>> = props => {
    const { t } = useTranslation('sensors');
    const title = props.itemId ? t(`scan name ${props.itemId}`) : '';
    const content = props.itemId ? t(`scan overview ${props.itemId}`) : '';

    return (
        <Dialog
            open={props.itemId !== undefined}
            onClose={props.onClose}
            title={title}
            actions={(
            <Button color="primary" variant="contained" onClick={props.onConfirm} disabled={props.onConfirm === undefined}>
                {t('scan')}
            </Button>)}
            >
            <Box
                display="flex"
                gap="0.75em"
            >
                <ScanItemIcon
                    id={props.itemId}
                    color="secondary"
                    fontSize="large"
                    sx={{ alignSelf: 'center', marginLeft: '-0.125em', opacity: 0.667 }}
                />
                <Typography whiteSpace="pre-wrap">
                    {content}
                </Typography>
            </Box>
        </Dialog>
    );
}