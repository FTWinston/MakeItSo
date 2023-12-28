import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog } from 'src/lib/mui';
import { ScanItemId } from '../types/ScanItemId';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    itemId?: ScanItemId;
    onClose?: () => void;
    onConfirm?: () => void;
}

export const ScanItemDialog: React.FC<PropsWithChildren<Props>> = props => {
    const { t } = useTranslation('sensors');
    const title = props.itemId ? t(`scan ${props.itemId}`) : '';

    return (
        <Dialog
            open={props.itemId !== undefined}
            onClose={props.onClose}
            title={title}
            actions={<Button color="primary" onClick={props.onConfirm}>
                Confirm
            </Button>}
        >
            
        </Dialog>
    );
}