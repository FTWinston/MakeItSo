import React, { useState, useContext } from 'react';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, ListSubheader } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PauseIcon from '@material-ui/icons/Pause';
import ResumeIcon from '@material-ui/icons/PlayArrow';
import EndGameIcon from '@material-ui/icons/CancelPresentation';
import { allSystems } from '../../data/System';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { GameContext } from '../GameProvider';
import { SystemMenuItem } from './SystemMenuItem';
import { PowerLevel } from '../../data/PowerLevel';

interface Props {
    isOpen: boolean;
    close: () => void;
}

const useStyles = makeStyles({
    list: {
        backgroundColor: 'inherit',
    },
});

export const SystemMenu: React.FC<Props> = props => {
    const gameState = useContext(GameContext);
    
    const classes = useStyles();
    
    const [quitConfirm, showQuitConfirm] = useState(false);

    const pauseOrResume = gameState.paused
        ? (
            <ListItem button onClick={() => { gameState.update({ type: 'resume'}); props.close(); }} selected>
                <ListItemIcon>
                    <ResumeIcon />
                </ListItemIcon>
                <ListItemText primary="Resume game" />
            </ListItem>
        ) : (
            <ListItem button onClick={() => gameState.update({ type: 'pause'})}>
                <ListItemIcon>
                    <PauseIcon />
                </ListItemIcon>
                <ListItemText primary="Pause game" />
            </ListItem>
        );

    const systems = allSystems.map(system => (
        <SystemMenuItem
            key={system}
            system={system}
            selected={gameState.currentSystem === system}
            disabled={gameState.paused || (gameState.currentSystem !== system && gameState.systemOccupancy.get(system) !== undefined)}
            occupant={gameState.systemOccupancy.get(system)}
            select={() => { gameState.update({ type: 'select system', system }); props.close(); }}
            power={gameState.powerLevels.get(system) ?? PowerLevel.Off}
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
                confirm={() => gameState.update({ type: 'end game'})}
            />
        </Drawer>
    )
}
