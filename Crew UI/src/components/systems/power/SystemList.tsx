import * as React from 'react';
import { TextLocalisation } from '~/functionality';
import { PowerSystem as SystemDisplay } from './PowerSystem';
import { PowerSystem, PowerSystemType } from './store';
import './SystemList.scss';

interface SystemListProps {
    text: TextLocalisation;
    systems: PowerSystem[];
    systemSelected?: (system: PowerSystemType) => void;
    selecting: boolean;
    selectableSystem?: PowerSystemType;
}

export class SystemList extends React.PureComponent<SystemListProps, {}> {
    public render() {
        let classes = 'powerSystemList';

        const systems = this.props.systems.map((system, index) => {
            const selected = this.props.systemSelected === undefined
                    || (this.props.selectableSystem !== undefined && this.props.selectableSystem !== system.type)
                ? undefined
                : () => this.props.systemSelected!(system.type);

            return <SystemDisplay
                text={this.props.text}
                system={system.type}
                power={system.power}
                onSelected={selected}
                selecting={this.props.selecting}
                canSelect={this.props.selectableSystem === undefined || this.props.selectableSystem === system.type}
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