import React, { useState } from 'react';
import { makeStyles, Fab, Zoom, useTheme, Snackbar } from '@material-ui/core';
import ReplaceMoveIcon from '@material-ui/icons/LocationOn';
import AddMoveIcon from '@material-ui/icons/AddLocation';
import EvasiveIcon from '@material-ui/icons/TrendingUp';

interface Props {
    replaceMode: boolean;
    setReplaceMode: (mode: boolean) => void;
    showEvasive: () => void;
}

const useStyles = makeStyles(theme => ({
    fabMode: {
        position: 'absolute',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
    },
    fabEvade: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: theme.palette.warning.contrastText,
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    snack: {
        maxWidth: '60vw',
        opacity: 0.75,
    },
}));

export const ActionButtons: React.FC<Props> = props => {
    const classes = useStyles();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const [showSnack, setShowSnack] = useState(false);

    return (
        <React.Fragment>    
            <Snackbar
                key={props.replaceMode ? 'replace' : 'add'}
                className={classes.snack}
                open={showSnack}
                onClose={() => setShowSnack(false)}
                autoHideDuration={3000}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                message={props.replaceMode ? 'Replace existing movement' : 'Add to existing movement'}
            />

            <Zoom
                in={props.replaceMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${props.replaceMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    color="primary"
                    className={classes.fabMode}
                    aria-label="Travel"
                    onClick={() => { props.setReplaceMode(false); setShowSnack(true); }}
                >
                    <AddMoveIcon />
                </Fab>
            </Zoom>

            <Zoom
                in={!props.replaceMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${!props.replaceMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    color="secondary"
                    className={classes.fabMode}
                    aria-label="Maneuver"
                    onClick={() => { props.setReplaceMode(true); setShowSnack(true); }}
                >
                    <ReplaceMoveIcon />
                </Fab>
            </Zoom>

            <Fab
                className={classes.fabEvade}
                aria-label="Evasive Maneuvers"
                onClick={() => props.showEvasive()}
            >
                <EvasiveIcon />
            </Fab>
        </React.Fragment>
    );
}
