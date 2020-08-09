import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { System, getSystemName } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';
import { PowerIcon } from '../common/PowerIcon';
import { PowerLevel } from '../../data/PowerLevel';
import { PowerEffectInfo } from '../../data/PowerEffect';

interface Props {
    system: System;
    power: PowerLevel;
    effects: PowerEffectInfo[];
    validDropTarget?: boolean;
}

const useStyles = makeStyles(theme => ({
    item: {
        paddingBottom: 0,
    },
    itemValidDrop: {
        paddingBottom: 0,
        backgroundColor: fade(theme.palette.success.dark, 0.5),
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    itemInvalidDrop: {
        paddingBottom: 0,
        opacity: 0.5,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
    text: {
        flexGrow: 0,
    },
    effectsContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: `0 ${theme.spacing(2)}px`,
    }
}));

export const SystemListItem: React.FC<Props> = props => {
    const classes = useStyles();

    const itemClass = props.validDropTarget === undefined
        ? classes.item
        : props.validDropTarget
            ? classes.itemValidDrop
            : classes.itemInvalidDrop;

    return (
        <ListItem className={itemClass} data-system={props.system}>
            <ListItemAvatar>
                <Avatar>
                    <SystemIcon color="action" system={props.system} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={getSystemName(props.system)}
                secondary="No effects"
                className={classes.text}
            />

            <div className={classes.effectsContainer}>
                {/*
                <ListItemIcon>
                    <PowerIcon level={props.power} />
                </ListItemIcon>

                <ListItemIcon>
                    <PowerIcon level={props.power} />
                </ListItemIcon>
                */}
            </div>

            <ListItemSecondaryAction>
                <PowerIcon level={props.power} color={props.power === PowerLevel.Off ? 'error' : undefined} />
            </ListItemSecondaryAction>
        </ListItem>
    )
}