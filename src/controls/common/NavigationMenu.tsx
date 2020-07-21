import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PauseIcon from '@material-ui/icons/Pause';
import ResumeIcon from '@material-ui/icons/PlayArrow';
import EndGameIcon from '@material-ui/icons/CancelPresentation';

interface Props {
    isOpen: boolean;
    close: () => void;

    isPaused: boolean;
    setPaused: (paused: boolean) => void;

    endGame: () => void;
}

const useStyles = makeStyles({
    list: {
        minWidth: '14em',
    },
});

export const NavigationMenu: React.FC<Props> = props => {
    const classes = useStyles();

    const pauseOrResume = props.isPaused
        ? (
            <ListItem button onClick={() => { props.setPaused(false); props.close(); }}>
                <ListItemIcon>
                    <ResumeIcon />
                </ListItemIcon>
                <ListItemText primary="Resume game" />
            </ListItem>
        ) : (
            <ListItem button onClick={() => props.setPaused(true)}>
                <ListItemIcon>
                    <PauseIcon />
                </ListItemIcon>
                <ListItemText primary="Pause game" />
            </ListItem>
        );

    return (
        <Drawer anchor="left" open={props.isOpen} onClose={() => props.close()}>
            {/* show your name, name of the ship */}

            <List className={classes.list}>
                {/* list available systems ... highlight current */}
            </List>

            <Divider />

            <List className={classes.list}>
                <ListItem button onClick={() => { /* ... */ props.close(); }}> {/* click opens modal settings page ... lets you e.g. set the actions to be top/bottom/auto */}
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>

                {pauseOrResume}
                
                <ListItem button onClick={props.endGame}> {/* TODO: a confirmation popup? */}
                    <ListItemIcon>
                        <EndGameIcon />
                    </ListItemIcon>
                    <ListItemText primary="End game" />
                </ListItem>
            </List>
        </Drawer>
    )
}