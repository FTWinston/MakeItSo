import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles, ListItemSecondaryAction, Switch, Badge } from '@material-ui/core';
import { System, getSystemName } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';

interface Props {
    system: System;
    enabled: boolean;
    toggle: (enabled: boolean) => void;
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
                secondary="Power level, effect cooldown?"
            />
            
            <ListItemSecondaryAction>
                <Switch
                    edge="end"
                    color="default"
                    onChange={e => props.toggle(e.currentTarget.checked)}
                    checked={props.enabled}
                    classes={{
                      switchBase: classes.switchBase,
                      track: classes.track,
                      checked: classes.checked,
                    }}
                    /*inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}*/
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}