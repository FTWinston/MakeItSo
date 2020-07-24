import React, { useContext, useState } from 'react';
import { Screen } from '../common/Screen';
import { ActionBarPrimary } from '../common/ActionBarPrimary';
import { IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import EvasiveIcon from '@material-ui/icons/TrendingUp';
import AlphaIcon from '@material-ui/icons/SwapHoriz';
import BetaIcon from '@material-ui/icons/RotateRight';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

interface Props {
    
}

const useStyles = makeStyles({
    evasiveHeader: {
        margin: '0 0.5em',
    }
});

export const Helm: React.FC<Props> = props => {
    const classes = useStyles();
    
    const [evasiveShowing, showEvasive] = useState(false);
    const closeEvasive = () => showEvasive(false);

    return (
        <Screen>
            <Typography>
                Helm content stuff goes here.
            </Typography>

            <ActionBarPrimary
                primaryAction={() => showEvasive(true)}
                primaryLabel="Evasive Maneuvers"
                primaryIcon={() => <EvasiveIcon />}
            >
                <IconButton color="inherit">
                    <SearchIcon />
                </IconButton>
                <IconButton edge="end" color="inherit">
                    <MoreIcon />
                </IconButton>
            </ActionBarPrimary>

            <Drawer
                anchor="right"
                open={evasiveShowing}
                onClose={closeEvasive}
            >
                <Typography
                    variant="h5"
                    className={classes.evasiveHeader}
                >
                    Evasive Maneuvers
                </Typography>

                <List>
                    <ListSubheader>Select a pattern to perform:</ListSubheader>
                    <ListItem button onClick={closeEvasive}> {/* TODO: actually select pattern */}
                        <ListItemIcon>
                            <AlphaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alpha" secondary="Strafe unpredictably" />
                    </ListItem>
                    
                    <ListItem button onClick={closeEvasive}> {/* TODO: actually select pattern */}
                        <ListItemIcon>
                            <BetaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Beta" secondary="Loop the loop" />
                    </ListItem>
                </List>
            </Drawer>
        </Screen>
    )
}
