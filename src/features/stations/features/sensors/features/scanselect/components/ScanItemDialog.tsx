import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogTitle, IconButton, styled } from 'src/lib/mui';
import { ScanItemId } from '../types/ScanItemId';
import { DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type ItemStatus = 'active' | 'inactive' | 'available' | 'unavailable';

interface Props {
    itemId?: ScanItemId;
    onClose?: () => void;
    onConfirm?: () => void;
}

const Root = styled(Dialog)({
    
});

const Title = styled(DialogTitle)(({ theme }) => ({
    paddingRight: '3em',
}))


export const ScanItemDialog: React.FC<PropsWithChildren<Props>> = props => {
    const { t } = useTranslation('sensors');
    const title = props.itemId ? t(`scan ${props.itemId}`) : '';

    return (
        <Root
            open={props.itemId !== undefined}
            onClose={props.onClose}
            aria-labelledby="scan-item-dialog-title"
        >
            <Title id="scan-item-dialog-title">
                {title}
            </Title>

            <IconButton
                aria-label="close"
                onClick={props.onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
            </IconButton>
            
            <DialogContent>
                <Button color="primary" onClick={props.onConfirm}>
                    Confirm
                </Button>
            </DialogContent>
        </Root>
    );
}