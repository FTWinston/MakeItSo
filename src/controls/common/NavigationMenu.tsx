import React, { useState, useContext } from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, ListSubheader } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PauseIcon from '@material-ui/icons/Pause';
import ResumeIcon from '@material-ui/icons/PlayArrow';
import EndGameIcon from '@material-ui/icons/CancelPresentation';
import { System, allSystems } from '../../data/System';
import { getIcon, getName } from '../../data/SystemData';
import { ConfirmDialog } from './ConfirmDialog';
import { GameContext } from '../GameProvider';

interface Props {
    isOpen: boolean;
    close: () => void;
}

const useStyles = makeStyles({
    list: {
        minWidth: '14em',
    },
});

export const NavigationMenu: React.FC<Props> = props => {
    const gameState = useContext(GameContext);
    
    const classes = useStyles();
    const [quitConfirm, showQuitConfirm] = useState(false);

    const pauseOrResume = gameState.paused
        ? (
            <ListItem button onClick={() => { gameState.setPaused(false); props.close(); }} selected>
                <ListItemIcon>
                    <ResumeIcon />
                </ListItemIcon>
                <ListItemText primary="Resume game" />
            </ListItem>
        ) : (
            <ListItem button onClick={() => gameState.setPaused(true)}>
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
            selected={gameState.currentSystem === system}
            disabled={gameState.paused}
            select={() => { gameState.setCurrentSystem(system); props.close(); }}
        />
    ));

    return (
        <Drawer
            anchor="left"
            open={props.isOpen || gameState.paused}
            onClose={() => props.close()}
            disableBackdropClick={gameState.paused}
            disableEscapeKeyDown={gameState.paused}
        >
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
                
                <ListItem button onClick={() => showQuitConfirm(true)}>
                    <ListItemIcon>
                        <EndGameIcon />
                    </ListItemIcon>
                    <ListItemText primary="End game" />
                </ListItem>
            </List>

            <ConfirmDialog
                title="End the game?"
                prompt="This will affect your whole crew, not just yourself."
                isOpen={quitConfirm}
                close={() => showQuitConfirm(false)}
                confirm={gameState.endGame}
            />
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