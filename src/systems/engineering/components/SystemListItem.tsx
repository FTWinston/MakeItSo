import React from 'react';
import { Avatar, makeStyles, TableRow, TableCell } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { System, getSystemName } from '../../../common/data/System';
import { SystemIcon } from '../../../common/components/SystemIcon';
import { PowerIcon } from '../../../common/components/PowerIcon';
import { PowerLevel } from '../../../common/data/PowerLevel';
import { ClientSystemStatusEffectInstance } from '../../../common/data/SystemStatusEffect';
import { SystemHealth } from './SystemHealth';
import { EffectIndicators } from './EffectIndicators';

interface Props {
    system: System;
    health: number;
    power: PowerLevel;
    effects: ClientSystemStatusEffectInstance[];
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
        width: theme.spacing(7),
    },
    text: {
        fontSize: '1rem',
        padding: theme.spacing(1),
        width: 118,
    },
    effectsCell: {
        padding: 0,
    },
    iconCell: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: 64,
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

            <TableCell className={classes.effectsCell} data-system={props.system}>
                <EffectIndicators effects={props.effects} />
            </TableCell>

            <TableCell className={classes.iconCell} align="center" data-system={props.system}>
                <SystemHealth value={props.health} />
            </TableCell>

            <TableCell className={classes.iconCell} align="center" data-system={props.system}>
                <PowerIcon level={props.power} color={props.power === PowerLevel.Off ? 'error' : undefined} />
            </TableCell>
        </TableRow>
    )
}