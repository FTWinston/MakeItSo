import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from './IconButton';

const DialogTitle = styled(MuiDialogTitle)({
    padding: '0.5em 3em 0.5em 1em',
});

const DialogContent = styled(MuiDialogContent)({
    padding: '0.5em 1.25em',
});

const DialogActions = styled(MuiDialogActions)({
    padding: '0.5em',
});

const titleId = 'dialog-title'

type Props = DialogProps & {
    actions?: JSX.Element;
}

export const Dialog: React.FC<Props> = props => {
    const onClose = props.onClose;

    const closeButton = onClose
        ? (
            <IconButton
                aria-label="close"
                onClick={onClose as () => {}}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
            </IconButton>
        ) : undefined;

    const title = props.title
        ? (
            <DialogTitle id={titleId}>
                {props.title}
            </DialogTitle>
        )
        : undefined;

    const content = props.children
        ? (
            <DialogContent>
                {props.children}
            </DialogContent>
        )
        : undefined;

    const actions = props.actions
        ? (
            <DialogActions>
                {props.actions}
            </DialogActions>
        )
        : undefined;

    return (
        <MuiDialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby={title ? titleId : undefined}
        >
            {title}
            {closeButton}
            {content}
            {actions}
        </MuiDialog>
    );
}