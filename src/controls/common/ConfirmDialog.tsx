import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@material-ui/core';

interface Props {
    title: string;
    prompt: string;

    confirm: () => void;

    isOpen: boolean;
    close: () => void;
}

export const ConfirmDialog: React.FC<Props> = props => {
    return (
        <Dialog
            maxWidth="sm"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            open={props.isOpen}
            onClose={props.close}
        >
            <DialogTitle id="confirm-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {props.prompt}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>
                    Cancel
                </Button>
                <Button onClick={() => { props.confirm(); props.close() }}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}