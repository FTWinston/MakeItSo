import React from 'react';
import { List } from '@material-ui/core';
import { SystemListItem } from './SystemListItem';
import { PowerLevel } from '../../data/PowerLevel';
import { System, anyEngineeringSystem } from '../../data/System';
import { PowerEffectInfo } from '../../data/PowerEffect';
import { PowerCardInfo } from '../../data/PowerCard';

interface Props {
    systemOrder: System[];
    powerLevels: Record<System, PowerLevel>;
    effects: Record<System, PowerEffectInfo[]>;
    draggingCard?: PowerCardInfo;
}

export const SystemList: React.FC<Props> = props => {
    const allowedDropSystems = props.draggingCard
        ? props.draggingCard.allowedSystems === undefined
            ? anyEngineeringSystem
            : props.draggingCard.allowedSystems
        : undefined;

    return (
        <List>
            {props.systemOrder.map(system => (
                <SystemListItem
                    system={system}
                    key={system}
                    power={props.powerLevels[system]}
                    effects={props.effects[system]}
                    validDropTarget={allowedDropSystems === undefined ? undefined : (allowedDropSystems & system) !== 0}
                />
            ))}
        </List>
    )
}