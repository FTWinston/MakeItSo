import React from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import { ActionBar } from './ActionBar';

interface Props {
    showNavigation: () => void;

    primaryAction: () => void;
    primaryLabel: string;
    primaryIcon: () => JSX.Element;
}

const useStyles = makeStyles({
    fab: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    grow: {
        flexGrow: 1,
    },
});

export const ActionBarPrimary: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <ActionBar showNavigation={props.showNavigation}>
            <Fab
                color="secondary"
                className={classes.fab}
                aria-label={props.primaryLabel}
                onClick={props.primaryAction}
            >
                {props.primaryIcon()}
            </Fab>

            {props.children}
        </ActionBar>
    )
}