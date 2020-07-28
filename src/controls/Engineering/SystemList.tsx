import React from 'react';
import { List } from '@material-ui/core';
import { SystemListItem } from './SystemListItem';
import { PowerLevel } from '../../data/PowerLevel';
import { System } from '../../data/System';

interface Props {
    systemOrder: System[];
    powerLevels: Map<System, PowerLevel>;
    positiveEffects: Map<System, number>;
    negativeEffects: Map<System, number>;
}

export const SystemList: React.FC<Props> = props => {
    return (
        <List>
            {props.systemOrder.map(system => (
                <SystemListItem
                    system={system}
                    key={system}
                    enabled={props.powerLevels.get(system) !== PowerLevel.Off}
                    toggle={enabled => {}} /* do something */
                    positiveEffects={props.positiveEffects.get(system) ?? 0}
                    negativeEffects={props.negativeEffects.get(system) ?? 0}
                />
            ))}
        </List>
    )
}