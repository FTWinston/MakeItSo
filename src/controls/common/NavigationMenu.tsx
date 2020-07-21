import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, ListSubheader } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PauseIcon from '@material-ui/icons/Pause';
import ResumeIcon from '@material-ui/icons/PlayArrow';
import EndGameIcon from '@material-ui/icons/CancelPresentation';
import { System, allSystems } from '../../data/System';
import { getIcon, getName } from '../../data/SystemData';

interface Props {
    currentSystem: System;
    setCurrentSystem: (system: System) => void;

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
            <ListItem button onClick={() => { props.setPaused(false); props.close(); }} selected>
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

    const systems = allSystems.map(system => (
        <SystemItem
            key={system}
            system={system}
            selected={props.currentSystem === system}
            disabled={props.isPaused}
            select={() => { props.setCurrentSystem(system); props.close(); }}
        />
    ));

    return (
        <Drawer anchor="left" open={props.isOpen} onClose={() => props.close()}>
            {/* show your name, name of the ship */}

            <List className={classes.list}>
                <ListSubheader>Ship Systems</ListSubheader>

                {systems}
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


interface SystemProps {
    system: System;
    select: () => void;
    selected: boolean;
    disabled: boolean;
}

const SystemItem: React.FC<SystemProps> = props => {
    const Icon = getIcon(props.system);

    return (
        <ListItem button onClick={props.select} disabled={props.disabled} selected={props.selected}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={getName(props.system)} />
        </ListItem>
    );
}