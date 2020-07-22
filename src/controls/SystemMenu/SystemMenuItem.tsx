import React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { System, getSystemName } from '../../data/System';
import { PowerLevel, getPowerName } from '../../data/PowerLevel';
import { PowerIcon } from '../common/PowerIcon';
import { SystemIcon } from '../common/SystemIcon';

interface Props {
    system: System;
    select: () => void;
    selected: boolean;
    disabled: boolean;
    power: PowerLevel;
    occupant?: string;
}

export const SystemMenuItem: React.FC<Props> = props => {
    const secondaryTextProps = !props.disabled || props.occupant === undefined
        ? {
            color: "primary"
        } as const
        : undefined;

    return (
        <ListItem button onClick={props.select} disabled={props.disabled} selected={props.selected}>
            <ListItemIcon>
                <SystemIcon system={props.system} />
            </ListItemIcon>
            <ListItemText
                primary={getSystemName(props.system)}
                secondary={props.occupant ?? 'Available'}
                secondaryTypographyProps={secondaryTextProps}
            />

            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label={getPowerName(props.power)} disabled>
                    <PowerIcon level={props.power} color={props.power === PowerLevel.Off ? 'error' : 'primary'} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}