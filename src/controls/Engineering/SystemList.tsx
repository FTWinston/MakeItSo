import React from 'react';
import { List } from '@material-ui/core';
import { SystemListItem } from './SystemListItem';
import { PowerLevel } from '../../data/PowerLevel';
import { System } from '../../data/System';
import { PowerEffectInfo } from '../../data/PowerEffect';

interface Props {
    systemOrder: System[];
    powerLevels: Record<System, PowerLevel>;
    effects: Record<System, PowerEffectInfo[]>;
}

export const SystemList: React.FC<Props> = props => {
    return (
        <List>
            {props.systemOrder.map(system => (
                <SystemListItem
                    system={system}
                    key={system}
                    power={props.powerLevels[system]}
                    effects={props.effects[system]}
                />
            ))}
        </List>
    )
}