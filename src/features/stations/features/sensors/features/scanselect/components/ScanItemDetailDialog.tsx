import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'src/lib/mui';
import { ScanItemDetail } from '../types/ScanItemDetail';
import { ScanItemId } from '../types/ScanItemId';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    itemId?: ScanItemId;
    detail?: ScanItemDetail;
    onClose?: () => void;
}

export const ScanItemDetailDialog: React.FC<PropsWithChildren<Props>> = props => {
    const { t } = useTranslation('sensors');
    const title = props.itemId ? t(`scan ${props.itemId}`) : '';

    return (
        <Dialog
            open={props.itemId !== undefined}
            onClose={props.onClose}
            title={title}
        >
            item detail here
        </Dialog>
    );
}