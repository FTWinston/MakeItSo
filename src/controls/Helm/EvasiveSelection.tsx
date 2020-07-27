import React, { useState } from 'react';
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, useTheme } from '@material-ui/core';
import AlphaIcon from '@material-ui/icons/SwapHoriz';
import BetaIcon from '@material-ui/icons/RotateRight';
import { SpaceMap } from '../common/SpaceMap';
import { ShipSystem } from '../common/ShipSystem';
import { ActionButtons } from './ActionButtons';

interface Props {
    open: boolean;
    close: () => void;
}

const useStyles = makeStyles(theme => ({
    header: {
        margin: '0 0.5em',
    }
}));

export const EvasiveSelection: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <Drawer
            anchor="right"
            open={props.open}
            onClose={props.close}
        >
            <Typography
                variant="h5"
                className={classes.header}
            >
                Evasive Maneuvers
            </Typography>

            <List>
                <ListSubheader>Select a pattern to perform:</ListSubheader>
                <ListItem button onClick={props.close}> {/* TODO: actually select pattern */}
                    <ListItemIcon>
                        <AlphaIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alpha" secondary="Strafe unpredictably" />
                </ListItem>
                
                <ListItem button onClick={props.close}> {/* TODO: actually select pattern */}
                    <ListItemIcon>
                        <BetaIcon />
                    </ListItemIcon>
                    <ListItemText primary="Beta" secondary="Loop the loop" />
                </ListItem>
            </List>
        </Drawer>
    )
}
