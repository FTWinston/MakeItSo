import MuiDialog from '@mui/material/Dialog';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

export const Dialog = styled(MuiDialog)({  
    
}) as typeof MuiDialog;

export const DialogTitle = styled(MuiDialogTitle)({
    padding: '0.5em 1em',
}) as typeof MuiDialogTitle;

export const DialogContent = styled(MuiDialogContent)({
    padding: '1.25em 1.5em',
}) as typeof MuiDialogContent;
