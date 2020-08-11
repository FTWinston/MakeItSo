import React from 'react';
import { Avatar, makeStyles, TableRow, TableCell } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { System, getSystemName } from '../../data/System';
import { SystemIcon } from '../common/SystemIcon';
import { PowerIcon } from '../common/PowerIcon';
import { PowerLevel } from '../../data/PowerLevel';
import { PowerEffectInfo } from '../../data/PowerEffect';
import { SystemHealth } from './SystemHealth';

interface Props {
    system: System;
    health: number;
    power: PowerLevel;
    effects: PowerEffectInfo[];
    validDropTarget?: boolean;
}

const useStyles = makeStyles(theme => ({
    item: {
        transition: 'background-color 0.5s ease-in-out, opacity 0.5s ease-in-out',
        backgroundColor: theme.palette.background.paper,
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
    avatar: {
        padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
    },
    text: {
        fontSize: '1rem',
        paddingLeft: theme.spacing(1),
    },
    effectsCell: {
        width: 72,
    },
    iconCell: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        '&:last-child': {
            paddingRight: 0,
        }
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
        <TableRow className={itemClass}>
            <TableCell className={classes.avatar} data-system={props.system}>
                <Avatar>
                    <SystemIcon color="action" system={props.system} />
                </Avatar>
            </TableCell>

            <TableCell component="th" scope="row" className={classes.text} data-system={props.system}>
                {getSystemName(props.system)}
            </TableCell>

            <TableCell className={classes.effectsCell} align="right" data-system={props.system}>
                
            </TableCell>

            <TableCell className={classes.iconCell} align="right" data-system={props.system}>
                <SystemHealth value={props.health} />
            </TableCell>

            <TableCell className={classes.iconCell} align="center" data-system={props.system}>
                <PowerIcon level={props.power} color={props.power === PowerLevel.Off ? 'error' : undefined} />
            </TableCell>
        </TableRow>
    )
}