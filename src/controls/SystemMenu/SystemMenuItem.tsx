import React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { System } from '../../data/System';
import { PowerLevel } from '../../data/PowerLevel';
import { getIcon as getSystemIcon, getName as getSystemName } from '../../data/SystemData';
import { getIcon as getPowerIcon, getName as getPowerName } from '../../data/PowerData';

interface Props {
    system: System;
    select: () => void;
    selected: boolean;
    disabled: boolean;
    power: PowerLevel;
    occupant?: string;
}

export const SystemMenuItem: React.FC<Props> = props => {
    const SystemIcon = getSystemIcon(props.system);
    const PowerIcon = getPowerIcon(props.power);

    const secondaryTextProps = !props.disabled || props.occupant === undefined
        ? {
            color: "primary"
        } as const
        : undefined;

    return (
        <ListItem button onClick={props.select} disabled={props.disabled} selected={props.selected}>
            <ListItemIcon>
                <SystemIcon />
            </ListItemIcon>
            <ListItemText
                primary={getSystemName(props.system)}
                secondary={props.occupant ?? 'Available'}
                secondaryTypographyProps={secondaryTextProps}
            />

            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label={getPowerName(props.power)} disabled>
                    <PowerIcon color={props.power === PowerLevel.Off ? "error" : "primary"} />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}