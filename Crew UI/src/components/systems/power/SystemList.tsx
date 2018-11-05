import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { PowerSystem as SystemDisplay } from './PowerSystem';
import { PowerSystem, PowerSystemType } from './store';
import './SystemList.scss';

interface SystemListProps {
    text: TextLocalisation;
    systems: PowerSystem[];
    systemSelected?: (system: PowerSystemType) => void;
}

export class SystemList extends React.PureComponent<SystemListProps, {}> {
    public render() {
        let classes = 'powerSystemList';
        if (this.props.systemSelected !== undefined) {
            classes += ' powerSystemList--selectable';
        }

        const systems = this.props.systems.map((system, index) => {
            const selected = this.props.systemSelected === undefined
                ? undefined
                : () => this.props.systemSelected!(system.type);

            return <SystemDisplay
                text={this.props.text}
                system={system.type}
                power={system.power}
                selected={selected}
                key={index}
            />
        });

        return (
        <div className={classes}>
            {systems}
        </div>
        );
    }
}