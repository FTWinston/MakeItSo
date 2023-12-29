import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'src/lib/mui';
import { ScanItemDetail } from '../types/ScanItemDetail';
import { ScanItemId } from '../types/ScanItemId';
import { Typography } from '@mui/material';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    itemId: ScanItemId;
    detail?: ScanItemDetail;
    onClose?: () => void;
}

export const ScanItemDetailDialog: React.FC<PropsWithChildren<Props>> = props => {
    const { t } = useTranslation('sensors');
    const title = props.itemId ? t(`scan name ${props.itemId}`) : '';
    const detail = props.itemId ? t(`scan detail ${props.itemId}`, props.detail?.values) : '';

    // TODO: show icon somewhere? In primary color, to correspond to selected scan tree items.

    // TODO: If active items have the icon as a big clickable icon button ... does that mean having the icon twice?
    
    // ... or, we have different dialog components for action and info scan item details.

    return (
        <Dialog
            open={props.itemId !== undefined}
            onClose={props.onClose}
            title={title}
        >
            <Typography whiteSpace="pre-wrap">
                {detail}
            </Typography>
        </Dialog>
    );
}