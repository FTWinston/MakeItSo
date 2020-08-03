import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles, ListItemSecondaryAction, Switch, Badge, IconButton } from '@material-ui/core';
import { System, getSystemName } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';
import { PowerIcon } from '../common/PowerIcon';
import { PowerLevel } from '../../data/PowerLevel';

interface Props {
    system: System;
    power: PowerLevel;
    positiveEffects: number;
    negativeEffects: number;
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
    positiveBadge: {
        color: theme.palette.error.contrastText,
        backgroundColor: theme.palette.success.main,
    },
    powerLevel: {
        pointerEvents: 'none',
    }
}));

export const SystemListItem: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <ListItem className={classes.item}>
            <ListItemAvatar>
                <Badge
                    color="error"
                    badgeContent={props.negativeEffects}
                    overlap="circle"                  
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Badge
                        classes={{
                            badge: classes.positiveBadge
                        }}
                        color="primary"
                        badgeContent={props.positiveEffects}
                        overlap="circle"                  
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Avatar>
                            <SystemIcon color="action" system={props.system} />
                        </Avatar>
                    </Badge>
                </Badge>
            </ListItemAvatar>
            <ListItemText
                primary={getSystemName(props.system)}
                secondary="Effect cooldowns?"
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="power level"
                    tabIndex={-1}
                    className={classes.powerLevel}
                >
                    <PowerIcon level={props.power} color={props.power === PowerLevel.Off ? 'error' : undefined} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}