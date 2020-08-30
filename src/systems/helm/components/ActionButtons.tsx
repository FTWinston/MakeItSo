import React from 'react';
import { makeStyles, Fab, Zoom, useTheme } from '@material-ui/core';
import ManoeverIcon from '@material-ui/icons/OpenWith';
import TravelIcon from '@material-ui/icons/Navigation';
import EvasiveIcon from '@material-ui/icons/TrendingUp';

interface Props {
    maneuverMode: boolean;
    setManeuverMode: (mode: boolean) => void;
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
}));

export const ActionButtons: React.FC<Props> = props => {
    const classes = useStyles();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <React.Fragment>
            <Zoom
                in={props.maneuverMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${props.maneuverMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    color="primary"
                    className={classes.fabMode}
                    aria-label="Travel"
                    onClick={() => props.setManeuverMode(false)}
                >
                    <TravelIcon />
                </Fab>
            </Zoom>

            <Zoom
                in={!props.maneuverMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${!props.maneuverMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    color="secondary"
                    className={classes.fabMode}
                    aria-label="Maneuver"
                    onClick={() => props.setManeuverMode(true)}
                >
                    <ManoeverIcon />
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
