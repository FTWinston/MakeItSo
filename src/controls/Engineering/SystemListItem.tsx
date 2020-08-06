import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles, ListItemSecondaryAction, Badge, ListItemIcon } from '@material-ui/core';
import { System, getSystemName } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';
import { PowerIcon } from '../common/PowerIcon';
import { PowerLevel } from '../../data/PowerLevel';
import { PowerEffectInfo } from '../../data/PowerEffect';

interface Props {
    system: System;
    power: PowerLevel;
    effects: PowerEffectInfo[];
}

const useStyles = makeStyles(theme => ({
    item: {
        paddingBottom: 0,
    },
    switchBase: {
        '&:not($checked)': {
            color: theme.palette.error.dark,
        },
        '&:not($checked) + $track': {
            backgroundColor: theme.palette.error.main,
        },
    },
    checked: {},
    track: {},
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

    return (
        <ListItem className={classes.item}>
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